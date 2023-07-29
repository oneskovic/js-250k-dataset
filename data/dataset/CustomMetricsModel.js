 Custom.models.CustomMetricsModel = function () {
    "use strict";
    var rslt = Custom.utils.copyMethods(MediaPlayer.models.MetricsModel);

    rslt.addRepresentationBoundaries = function (streamType, t, min, max) {
        var vo = new Custom.vo.metrics.RepresentationBoundaries();

        vo.t = t;
        vo.min = min;
        vo.max = max;

        this.parent.getMetricsFor(streamType).RepBoundariesList.push(vo);

        this.parent.metricAdded(streamType, "RepresentationBoundaries", vo);
        return vo;
    };

    rslt.addBandwidthBoundaries = function (streamType, t, min, max) {
        var vo = new Custom.vo.metrics.BandwidthBoundaries();

        vo.t = t;
        vo.min = min;
        vo.max = max;

        this.parent.getMetricsFor(streamType).BandwidthBoundariesList.push(vo);

        this.parent.metricAdded(streamType, "BandwidthBoundaries", vo);
        return vo;
    };

    rslt.addBufferLevel = function (streamType, t, level) {
        var vo = new MediaPlayer.vo.metrics.BufferLevel();

        vo.t = t;
        vo.level = level;

        // ORANGE unnecessary metrics, when builded, DEBUG is false, saving the whole list is useless
        if (DEBUG) {
            this.parent.getMetricsFor(streamType).BufferLevel.push(vo);
        } else {
            this.parent.getMetricsFor(streamType).BufferLevel = [vo];
        }

        this.parent.metricAdded(streamType, "BufferLevel", vo);
        return vo;
    };

    rslt.addError = function (streamType, code, message) {
        var vo = new Custom.vo.metrics.Error();

        vo.code = code;
        vo.message = message;
    
        this.parent.metricAdded(streamType, "Error", vo);
        return vo;
    };

    rslt.addState = function (streamType, currentState, position, reason) {
        var vo = new Custom.vo.metrics.State();

        vo.current = currentState;
        vo.position = position;
        vo.reason = reason;
        
        this.parent.metricAdded(streamType, "State", vo);
        return vo;
    };

    rslt.addSession = function (streamType,url,loop, endTime, playerType) {
        var vo = new Custom.vo.metrics.Session();

        vo.uri = url;
        if (loop) {
            vo.loopMode = 1;
        }else {
            vo.loopMode = 0;
        }
        vo.endTime = endTime;
        vo.playerType = playerType;

        this.parent.metricAdded(streamType, "Session", vo);
        return vo;
    };

    rslt.addCondition = function (streamType,isFullScreen,videoWidth, videoHeight, droppedFrames,fps) {
        var vo = new Custom.vo.metrics.Condition();

        vo.isFullScreen = isFullScreen;
        vo.windowSize = videoWidth+"x"+videoHeight;
        vo.fps = fps;
        vo.droppedFrames = droppedFrames;

        this.parent.metricAdded(streamType, "Condition", vo);
        return vo;
    };

    rslt.addMetaData = function () {
        this.parent.metricAdded(null, "ManifestReady", null);
    };

    rslt.clearAllCurrentMetrics = function () {
        var self = this,
            streamMetrics = this.parent.streamMetrics;

        for (var prop in streamMetrics) {
            if (streamMetrics.hasOwnProperty(prop)) {
                delete streamMetrics[prop];
            }
        }
        
        this.metricsChanged.call(self);
    };

    return rslt;
};

Custom.models.CustomMetricsModel.prototype = {
    constructor: Custom.models.CustomMetricsModel
};
