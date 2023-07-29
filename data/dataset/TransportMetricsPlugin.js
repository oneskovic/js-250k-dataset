/*jslint sub: true */
/**
 * @description Transport metrics plugin
 * @constructor
 */
var TransportMetricsPlugin = function TransportMetricsPlugin(config) {
    this.config = config;
    this["enabled"] = true;
};

TransportMetricsPlugin.NAME = "transport";
TransportMetricsPlugin.prototype = {
    initialize: function (metricsCollector) {
        this.collector = metricsCollector;
        if (this["enabled"]) {
            this.bind(metricsCollector);
        }
    },
    enable: function () {
        if (!this["enabled"]) {
            this["enabled"] = true;
            this.bind(this.collector);
        }
    },
    disable: function () {
        if (this["enabled"]) {
            this["enabled"] = false;
            this.unbind(this.collector);
        }
    },
    bind: function (metricsCollector) {
        var method       = 'request',
            callbackHook = function (startMark, config) {
                var original = config["callback"],
                    auraNum  = config["params"]["aura.num"];
                startMark["context"] = {
                    "aura.num"      : auraNum,
                    "requestLength" : config["params"]["message"] && config["params"]["message"].length
                };

                config["callback"] = function (xhr) {
                    var endMark = metricsCollector["markEnd"](TransportMetricsPlugin.NAME, method);
                    endMark["context"] = {
                        "aura.num"       : auraNum,
                        "status"         : xhr.status,
                        "statusText"     : xhr.statusText,
                        "responseLength" : xhr.responseText.length
                    };
                    return original.apply(this, arguments);
                };
            };

        metricsCollector["instrument"](
            $A["util"]["transport"],
            'request', 
            TransportMetricsPlugin.NAME,
            true/*async*/,
            callbackHook /*beforeHook*/
        );
    },
    //#if {"excludeModes" : ["PRODUCTION"]}
    postProcess: function (transportMarks) {
        var procesedMarks = [];
        var queue = {};
        for (var i = 0; i < transportMarks.length; i++) {
            var id = transportMarks[i]["context"]["aura.num"];
            var phase = transportMarks[i]["phase"];
            if (phase === 'stamp') {
                procesedMarks.push(transportMarks[i]);
            } else if (phase === 'start') {
                queue[id] = transportMarks[i];
            } else if (phase === 'end' && queue[id]){
                var mark = queue[id];
                mark["context"]  = $A.util.apply(mark["context"], transportMarks[i]["context"]);
                mark["duration"] = transportMarks[i]["ts"] - mark["ts"];
                procesedMarks.push(mark);
                delete queue[id];
            }
        }
        return procesedMarks;
    },
    // #end
    unbind: function (metricsCollector) {
        metricsCollector["unInstrument"]($A["util"]["transport"], 'request');
    }
};

// Exposing symbols/methods for Google Closure
var p = TransportMetricsPlugin.prototype;

exp(p,
    "initialize",  p.initialize,
    "enable",      p.enable,
    "disable",     p.disable,
    "postProcess", p.postProcess
);

$A.metricsService.registerPlugin({
    "name"   : TransportMetricsPlugin.NAME,
    "plugin" : TransportMetricsPlugin
});