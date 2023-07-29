WebInspector.SourceCodeTimeline = function(sourceCode, sourceCodeLocation, recordType, recordEventType)
{
    WebInspector.Timeline.call(this);

    console.assert(sourceCode);
    console.assert(!sourceCodeLocation || sourceCodeLocation.sourceCode === sourceCode);
    console.assert(recordType);

    this._sourceCode = sourceCode;
    this._sourceCodeLocation = sourceCodeLocation || null;
    this._recordType = recordType;
    this._recordEventType = recordEventType || null;
};

WebInspector.SourceCodeTimeline.TypeIdentifier = "source-code-timeline";
WebInspector.SourceCodeTimeline.SourceCodeURLCookieKey = "source-code-timeline-source-code-url";
WebInspector.SourceCodeTimeline.SourceCodeLocationLineCookieKey = "source-code-timeline-source-code-location-line";
WebInspector.SourceCodeTimeline.SourceCodeLocationColumnCookieKey = "source-code-timeline-source-code-location-column";
WebInspector.SourceCodeTimeline.SourceCodeURLCookieKey = "source-code-timeline-source-code-url";
WebInspector.SourceCodeTimeline.RecordTypeCookieKey = "source-code-timeline-record-type";
WebInspector.SourceCodeTimeline.RecordEventTypeCookieKey = "source-code-timeline-record-event-type";

WebInspector.SourceCodeTimeline.prototype = {
    constructor: WebInspector.SourceCodeTimeline,
    __proto__: WebInspector.Timeline.prototype,

    // Public

    get sourceCode()
    {
        return this._sourceCode;
    },

    get sourceCodeLocation()
    {
        return this._sourceCodeLocation;
    },

    get recordType()
    {
        return this._recordType;
    },

    get recordEventType()
    {
        return this._recordEventType;
    },

    saveIdentityToCookie: function(cookie)
    {
        cookie[WebInspector.SourceCodeTimeline.SourceCodeURLCookieKey] = this._sourceCode.url ? this._sourceCode.url.hash : null;
        cookie[WebInspector.SourceCodeTimeline.SourceCodeLocationLineCookieKey] = this._sourceCodeLocation ? this._sourceCodeLocation.lineNumber : null;
        cookie[WebInspector.SourceCodeTimeline.SourceCodeLocationColumnCookieKey] = this._sourceCodeLocation ? this._sourceCodeLocation.columnNumber : null;
        cookie[WebInspector.SourceCodeTimeline.RecordTypeCookieKey] = this._recordType || null;
        cookie[WebInspector.SourceCodeTimeline.RecordEventTypeCookieKey] = this._recordEventType || null;
    }
};
