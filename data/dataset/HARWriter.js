/**
 * @constructor
 */
WebInspector.HARWriter = function()
{
}

WebInspector.HARWriter.prototype = {
    /**
     * @param {!WebInspector.OutputStream} stream
     * @param {!Array.<!WebInspector.NetworkRequest>} requests
     * @param {!WebInspector.Progress} progress
     */
    write: function(stream, requests, progress)
    {
        this._stream = stream;
        this._harLog = (new WebInspector.HARLog(requests)).build();
        this._pendingRequests = 1; // Guard against completing resource transfer before all requests are made.
        var entries = this._harLog.entries;
        for (var i = 0; i < entries.length; ++i) {
            var content = requests[i].content;
            if (typeof content === "undefined" && requests[i].finished) {
                ++this._pendingRequests;
                requests[i].requestContent(this._onContentAvailable.bind(this, entries[i], requests[i]));
            } else if (content !== null)
                this._setEntryContent(entries[i], requests[i]);
        }
        var compositeProgress = new WebInspector.CompositeProgress(progress);
        this._writeProgress = compositeProgress.createSubProgress();
        if (--this._pendingRequests) {
            this._requestsProgress = compositeProgress.createSubProgress();
            this._requestsProgress.setTitle(WebInspector.UIString("Collecting content…"));
            this._requestsProgress.setTotalWork(this._pendingRequests);
        } else
            this._beginWrite();
    },

    /**
     * @param {!Object} entry
     * @param {!WebInspector.NetworkRequest} request
     */
    _setEntryContent: function(entry, request)
    {
        if (request.content !== null)
            entry.response.content.text = request.content;
        if (request.contentEncoded)
            entry.response.content.encoding = "base64";
    },

    /**
     * @param {!Object} entry
     * @param {!WebInspector.NetworkRequest} request
     * @param {?string} content
     */
    _onContentAvailable: function(entry, request, content)
    {
        this._setEntryContent(entry, request);
        if (this._requestsProgress)
            this._requestsProgress.worked();
        if (!--this._pendingRequests) {
            this._requestsProgress.done();
            this._beginWrite();
        }
    },

    _beginWrite: function()
    {
        const jsonIndent = 2;
        this._text = JSON.stringify({log: this._harLog}, null, jsonIndent);
        this._writeProgress.setTitle(WebInspector.UIString("Writing file…"));
        this._writeProgress.setTotalWork(this._text.length);
        this._bytesWritten = 0;
        this._writeNextChunk(this._stream);
    },

    /**
     * @param {!WebInspector.OutputStream} stream
     * @param {string=} error
     */
    _writeNextChunk: function(stream, error)
    {
        if (this._bytesWritten >= this._text.length || error) {
            stream.close();
            this._writeProgress.done();
            return;
        }
        const chunkSize = 100000;
        var text = this._text.substring(this._bytesWritten, this._bytesWritten + chunkSize);
        this._bytesWritten += text.length;
        stream.write(text, this._writeNextChunk.bind(this));
        this._writeProgress.setWorked(this._bytesWritten);
    }
}
