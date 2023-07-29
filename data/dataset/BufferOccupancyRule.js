
MediaPlayer.rules.BufferOccupancyRule = function () {
    "use strict";

    var lastSwitchTime = 0;

    return {
        log: undefined,
        metricsModel: undefined,

        execute: function (context, callback) {
            var self = this,
                now = new Date().getTime()/1000,
                mediaInfo = context.getMediaInfo(),
                trackInfo = context.getTrackInfo(),
                mediaType = mediaInfo.type,
                waitToSwitchTime = !isNaN(trackInfo.fragmentDuration) ? trackInfo.fragmentDuration / 2 : 2,
                current = context.getCurrentValue(),
                metrics = this.metricsModel.getReadOnlyMetricsFor(mediaType),
                lastBufferLevelVO = (metrics.BufferLevel.length > 0) ? metrics.BufferLevel[metrics.BufferLevel.length - 1] : null,
                lastBufferStateVO = (metrics.BufferState.length > 0) ? metrics.BufferState[metrics.BufferState.length - 1] : null,
                isBufferRich = false,
                maxIndex = mediaInfo.trackCount - 1,
                switchRequest = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);

            if (now - lastSwitchTime < waitToSwitchTime) {
                callback(switchRequest);
                return;
            }

            if (lastBufferLevelVO !== null && lastBufferStateVO !== null) {
                // This will happen when another rule tries to switch from top to any other.
                // If there is enough buffer why not try to stay at high level.
                if (lastBufferLevelVO.level > lastBufferStateVO.target) {
                    isBufferRich = (lastBufferLevelVO.level - lastBufferStateVO.target) > MediaPlayer.dependencies.BufferController.RICH_BUFFER_THRESHOLD;
                    if (isBufferRich && mediaInfo.trackCount > 1) {
                        switchRequest = new MediaPlayer.rules.SwitchRequest(maxIndex, MediaPlayer.rules.SwitchRequest.prototype.STRONG);
                    }
                }
            }

            if (switchRequest.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && switchRequest.value !== current) {
                self.log("BufferOccupancyRule requesting switch to index: ", switchRequest.value, "type: ",mediaType, " Priority: ",
                    switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "Default" :
                        switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "Strong" : "Weak");
            }

            callback(switchRequest);
        },

        reset: function() {
            lastSwitchTime = 0;
        }
    };
};

MediaPlayer.rules.BufferOccupancyRule.prototype = {
    constructor: MediaPlayer.rules.BufferOccupancyRule
};