WebInspector.NetworkTimeline = function()
{
    WebInspector.Timeline.call(this);
};

WebInspector.NetworkTimeline.prototype = {
    constructor: WebInspector.NetworkTimeline,
    __proto__: WebInspector.Timeline.prototype,

    // Public

    recordForResource: function(resource)
    {
        console.assert(resource instanceof WebInspector.Resource);

        return this._resourceRecordMap.get(resource) || null;
    },

    reset: function(suppressEvents)
    {
        this._resourceRecordMap = new Map;

        WebInspector.Timeline.prototype.reset.call(this, suppressEvents);
    },

    addRecord: function(record)
    {
        console.assert(record instanceof WebInspector.ResourceTimelineRecord);

        // Don't allow duplicate records for a resource.
        if (this._resourceRecordMap.has(record.resource))
            return;

        this._resourceRecordMap.set(record.resource, record);

        WebInspector.Timeline.prototype.addRecord.call(this, record);
    }
};
