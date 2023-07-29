/**
 * @constructor
 * @extends {WebInspector.CountersGraph}
 * @implements {WebInspector.TimelineModeView}
 * @param {!WebInspector.TimelineModeViewDelegate} delegate
 * @param {!WebInspector.TimelineModel} model
 */
WebInspector.MemoryCountersGraph = function(delegate, model)
{
    WebInspector.CountersGraph.call(this, WebInspector.UIString("MEMORY"), delegate, model);
    this._countersByName = {};
    this._countersByName["jsHeapSizeUsed"] = this.createCounter(WebInspector.UIString("Used JS Heap"), WebInspector.UIString("JS Heap Size: %d"), "hsl(220, 90%, 43%)");
    this._countersByName["documents"] = this.createCounter(WebInspector.UIString("Documents"), WebInspector.UIString("Documents: %d"), "hsl(0, 90%, 43%)");
    this._countersByName["nodes"] = this.createCounter(WebInspector.UIString("Nodes"), WebInspector.UIString("Nodes: %d"), "hsl(120, 90%, 43%)");
    this._countersByName["jsEventListeners"] = this.createCounter(WebInspector.UIString("Listeners"), WebInspector.UIString("Listeners: %d"), "hsl(38, 90%, 43%)");
    if (Runtime.experiments.isEnabled("gpuTimeline")) {
        this._gpuMemoryCounter = this.createCounter(WebInspector.UIString("GPU Memory"), WebInspector.UIString("GPU Memory [KB]: %d"), "hsl(300, 90%, 43%)");
        this._countersByName["gpuMemoryUsedKB"] = this._gpuMemoryCounter;
    }
}

WebInspector.MemoryCountersGraph.prototype = {
    /**
     * @override
     * @param {?RegExp} textFilter
     */
    refreshRecords: function(textFilter)
    {
        this.reset();
        var events = this._model.mainThreadEvents();
        for (var i = 0; i < events.length; ++i) {
            var event = events[i];
            if (event.name !== WebInspector.TimelineModel.RecordType.UpdateCounters)
                continue;

            var counters = event.args.data;
            if (!counters)
                return;
            for (var name in counters) {
                var counter = this._countersByName[name];
                if (counter)
                    counter.appendSample(event.startTime, counters[name]);
            }

            var gpuMemoryLimitCounterName = "gpuMemoryLimitKB";
            if (this._gpuMemoryCounter && (gpuMemoryLimitCounterName in counters))
                this._gpuMemoryCounter.setLimit(counters[gpuMemoryLimitCounterName]);
        }
        this.scheduleRefresh();
    },

    __proto__: WebInspector.CountersGraph.prototype
}
