/**
 * @constructor
 * @extends {WebInspector.RequestContentView}
 * @param {WebInspector.NetworkRequest} request
 */
WebInspector.RequestPreviewView = function(request, responseView)
{
    WebInspector.RequestContentView.call(this, request);
    this._responseView = responseView;
}

WebInspector.RequestPreviewView.prototype = {
    contentLoaded: function()
    {
        if (!this.request.content) {
            if (!this._emptyView) {
                this._emptyView = this._createEmptyView();
                this._emptyView.show(this.element);
                this.innerView = this._emptyView;
            }
        } else {
            if (this._emptyView) {
                this._emptyView.detach();
                delete this._emptyView;
            }

            if (!this._previewView)
                this._previewView = this._createPreviewView();
            this._previewView.show(this.element);
            this.innerView = this._previewView;
        }
    },

    _createEmptyView: function()
    {
        return new WebInspector.EmptyView(WebInspector.UIString("This request has no preview available."));
    },

    _createPreviewView: function()
    {
        if (this.request.hasErrorStatusCode() && this.request.content)
            return new WebInspector.RequestHTMLView(this.request);

        if (this.request.type === WebInspector.resourceTypes.XHR && this.request.content) {
            var parsedJSON = WebInspector.RequestJSONView.parseJSON(this.request.content);
            if (parsedJSON)
                return new WebInspector.RequestJSONView(this.request, parsedJSON);
        }

        if (this.request.content && this.request.type === WebInspector.resourceTypes.Script && this.request.mimeType === "application/json") {
            var parsedJSONP = WebInspector.RequestJSONView.parseJSONP(this.request.content);
            if (parsedJSONP)
                return new WebInspector.RequestJSONView(this.request, parsedJSONP);
        }

        if (this._responseView.sourceView)
            return this._responseView.sourceView;

        if (this.request.type === WebInspector.resourceTypes.Other)
            return this._createEmptyView();

        return WebInspector.RequestView.nonSourceViewForRequest(this.request);
    }
}

WebInspector.RequestPreviewView.prototype.__proto__ = WebInspector.RequestContentView.prototype;
