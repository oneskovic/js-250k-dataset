WebInspector.IncompleteSessionSegment = function(identifier)
{
    WebInspector.Object.call(this);

    this.identifier = identifier;
    this._timestamp = Date.now();
}

WebInspector.IncompleteSessionSegment.prototype = {
    constructor: WebInspector.IncompleteSessionSegment,
    __proto__: WebInspector.Object.prototype,

    get isComplete()
    {
        return false;
    }
};

WebInspector.ReplaySessionSegment = function(identifier, payload)
{
    WebInspector.Object.call(this);

    console.assert(identifier === payload.id);

    this.identifier = identifier;
    this._timestamp = payload.timestamp;

    this._queues = payload.queues;

    // XXX: make objects for the queues and inputs?
};

WebInspector.ReplaySessionSegment.prototype = {
    constructor: WebInspector.ReplaySessionSegment,
    __proto__: WebInspector.Object.prototype,

    get isComplete()
    {
        return true;
    }
};
