WebInspector.ScriptTimelineDataGridNode = function(scriptTimelineRecord, baseStartTime, rangeStartTime, rangeEndTime)
{
    WebInspector.TimelineDataGridNode.call(this, false, null);

    this._record = scriptTimelineRecord;
    this._baseStartTime = baseStartTime || 0;
    this._rangeStartTime = rangeStartTime || 0;
    this._rangeEndTime = typeof rangeEndTime === "number" ? rangeEndTime : Infinity;
};

WebInspector.Object.addConstructorFunctions(WebInspector.ScriptTimelineDataGridNode);

WebInspector.ScriptTimelineDataGridNode.IconStyleClassName = "icon";

WebInspector.ScriptTimelineDataGridNode.prototype = {
    constructor: WebInspector.ScriptTimelineDataGridNode,
    __proto__: WebInspector.TimelineDataGridNode.prototype,

    // Public

    get record()
    {
        return this._record;
    },

    get records()
    {
        return [this._record];
    },

    get baseStartTime()
    {
        return this._baseStartTime;
    },

    get rangeStartTime()
    {
        return this._rangeStartTime;
    },

    set rangeStartTime(x)
    {
        if (this._rangeStartTime === x)
            return;

        this._rangeStartTime = x;
        this.needsRefresh();
    },

    get rangeEndTime()
    {
        return this._rangeEndTime;
    },

    set rangeEndTime(x)
    {
        if (this._rangeEndTime === x)
            return;

        this._rangeEndTime = x;
        this.needsRefresh();
    },

    get data()
    {
        var startTime = Math.max(this._rangeStartTime, this._record.startTime);
        var duration = Math.min(this._record.startTime + this._record.duration, this._rangeEndTime) - startTime;
        var callFrameOrSourceCodeLocation = this._record.initiatorCallFrame || this._record.sourceCodeLocation;

        return {eventType: this._record.eventType, startTime: startTime, selfTime: duration, totalTime: duration,
            averageTime: duration, callCount: 1, location: callFrameOrSourceCodeLocation};
    },

    createCellContent: function(columnIdentifier, cell)
    {
        const emptyValuePlaceholderString = "\u2014";
        var value = this.data[columnIdentifier];

        switch (columnIdentifier) {
        case "eventType":
            return WebInspector.ScriptTimelineRecord.EventType.displayName(value, this._record.details);

        case "startTime":
            return isNaN(value) ? emptyValuePlaceholderString : Number.secondsToString(value - this._baseStartTime, true);

        case "selfTime":
        case "totalTime":
        case "averageTime":
            return isNaN(value) ? emptyValuePlaceholderString : Number.secondsToString(value, true);
        }

        return WebInspector.TimelineDataGridNode.prototype.createCellContent.call(this, columnIdentifier, cell);
    }
};
