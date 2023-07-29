MediaPlayer.dependencies.VideoModelExtensions = function () {
    "use strict";

    return {
        getPlaybackQuality: function (videoElement) {
            var hasWebKit = ("webkitDroppedFrameCount" in videoElement),
                hasQuality = ("getVideoPlaybackQuality" in videoElement),
                result = null;

            if (hasQuality) {
                result = videoElement.getVideoPlaybackQuality();
            }
            else if (hasWebKit) {
                result = {droppedVideoFrames: videoElement.webkitDroppedFrameCount, creationTime: new Date()};
            }

            return result;
        }
    };
};

MediaPlayer.dependencies.VideoModelExtensions.prototype = {
    constructor: MediaPlayer.dependencies.VideoModelExtensions
};