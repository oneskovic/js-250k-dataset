WebInspector.ProfileNodeDataGridNode = function(profileNode, baseStartTime, rangeStartTime, rangeEndTime)
{
    var hasChildren = !!profileNode.childNodes.length;

    WebInspector.TimelineDataGridNode.call(this, false, null, hasChildren);

    this._profileNode = profileNode;
    this._baseStartTime = baseStartTime || 0;
    this._rangeStartTime = rangeStartTime || 0;
    this._rangeEndTime = typeof rangeEndTime === "number" ? rangeEndTime : Infinity;

    this._data = this._profileNode.computeCallInfoForTimeRange(this._rangeStartTime, this._rangeEndTime);
    this._data.location = this._profileNode.sourceCodeLocation;
};

WebInspector.Object.addConstructorFunctions(WebInspector.ProfileNodeDataGridNode);

WebInspector.ProfileNodeDataGridNode.IconStyleClassName = "icon";

WebInspector.ProfileNodeDataGridNode.prototype = {
    constructor: WebInspector.ProfileNodeDataGridNode,
    __proto__: WebInspector.TimelineDataGridNode.prototype,

    // Public

    get profileNode()
    {
        return this._profileNode;
    },

    get records()
    {
        return null;
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
        return this._data;
    },

    refresh: function()
    {
        this._data = this._profileNode.computeCallInfoForTimeRange(this._rangeStartTime, this._rangeEndTime);
        this._data.location = this._profileNode.sourceCodeLocation;

        WebInspector.TimelineDataGridNode.prototype.refresh.call(this);
    },

    createCellContent: function(columnIdentifier, cell)
    {
        const emptyValuePlaceholderString = "\u2014";
        var value = this.data[columnIdentifier];

        switch (columnIdentifier) {
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
