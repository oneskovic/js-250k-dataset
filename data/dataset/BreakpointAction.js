WebInspector.BreakpointAction = function(breakpoint, typeOrInfo, data)
{
    WebInspector.Object.call(this);

    console.assert(breakpoint);
    console.assert(typeOrInfo);

    this._breakpoint = breakpoint;

    if (typeof typeOrInfo === "string") {
        this._type = typeOrInfo;
        this._data = data || null;
    } else if (typeof typeOrInfo === "object") {
        this._type = typeOrInfo.type;
        this._data = typeOrInfo.data || null;
    } else
        console.error("Unexpected type passed to WebInspector.BreakpointAction");

    console.assert(typeof this._type === "string");
    this._id = WebInspector.debuggerManager.nextBreakpointActionIdentifier;
};

WebInspector.BreakpointAction.Type = {
    Log: "log",
    Evaluate: "evaluate",
    Sound: "sound",
    Probe: "probe"
}

WebInspector.BreakpointAction.prototype = {
    constructor: WebInspector.BreakpointAction,
    __proto__: WebInspector.Object.prototype,

    // Public

    get breakpoint()
    {
        return this._breakpoint;
    },

    get id()
    {
        return this._id;
    },

    get type()
    {
        return this._type;
    },

    get data()
    {
        return this._data;
    },

    set data(data)
    {
        if (this._data === data)
            return;

        this._data = data;

        this._breakpoint.breakpointActionDidChange(this);
    },

    get info()
    {
        var obj = {type: this._type, id: this._id};
        if (this._data)
            obj.data = this._data;
        return obj;
    }
};
