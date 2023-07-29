WebInspector.TextMarker = function(codeMirrorTextMarker, type)
{
    WebInspector.Object.call(this);

    this._codeMirrorTextMarker = codeMirrorTextMarker;
    codeMirrorTextMarker.__webInspectorTextMarker = this;

    this._type = type || WebInspector.TextMarker.Type.Plain;
}

WebInspector.TextMarker.Type = {
    Color: "text-marker-type-color",
    Gradient: "text-marker-type-gradient",
    Plain: "text-marker-type-plain"
};

WebInspector.TextMarker.textMarkerForCodeMirrorTextMarker = function(codeMirrorTextMarker)
{
    return codeMirrorTextMarker.__webInspectorTextMarker || new WebInspector.TextMarker(codeMirrorTextMarker);
};

WebInspector.TextMarker.prototype = {
    constructor: WebInspector.TextMarker,
    __proto__: WebInspector.Object.prototype,
    
    // Public

    get codeMirrorTextMarker()
    {
        return this._codeMirrorTextMarker;
    },

    get type()
    {
        return this._type;
    },

    get range()
    {
        var range = this._codeMirrorTextMarker.find();
        if (!range)
            return null;
        return new WebInspector.TextRange(range.from.line, range.from.ch, range.to.line, range.to.ch);
    },

    get rects()
    {
        var range = this._codeMirrorTextMarker.find();
        if (!range)
            return WebInspector.Rect.ZERO_RECT;
        return this._codeMirrorTextMarker.doc.cm.rectsForRange({
            start: range.from,
            end: range.to
        });
    },
    
    clear: function()
    {
        this._codeMirrorTextMarker.clear();
    }
};
