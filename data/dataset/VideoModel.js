MediaPlayer.models.VideoModel = function () {
    "use strict";

    var element,
        stalledStreams = [],
        //_currentTime = 0,

        isStalled = function () {
            return (stalledStreams.length > 0);
        },

        addStalledStream = function (type) {
            if (type === null) {
                return;
            }

            // Halt playback until nothing is stalled.
            element.playbackRate = 0;

            if (stalledStreams[type] === true) {
                return;
            }

            stalledStreams.push(type);
            stalledStreams[type] = true;
        },

        removeStalledStream = function (type) {
            if (type === null) {
                return;
            }

            stalledStreams[type] = false;
            var index = stalledStreams.indexOf(type);
            if (index !== -1) {
                stalledStreams.splice(index, 1);
            }

            // If nothing is stalled resume playback.
            if (isStalled() === false) {
                element.playbackRate = 1;
            }
        },

        stallStream = function (type, isStalled) {
            if (isStalled) {
                addStalledStream(type);
            } else {
                removeStalledStream(type);
            }
        }/*,
        handleSetCurrentTimeNotification = function () {
            if (element.currentTime !== _currentTime) {
                element.currentTime = _currentTime;
            }
        }*/;

    return {
        system : undefined,

        setup : function () {
            //this.system.mapHandler("setCurrentTime", undefined, handleSetCurrentTimeNotification.bind(this));
        },

        play: function () {
            element.play();
        },

        pause: function () {
            element.pause();
        },

        isPaused: function () {
            return element.paused;
        },

        getPlaybackRate:  function () {
            return element.playbackRate;
        },

        setPlaybackRate: function (value) {
            element.playbackRate = value;
        },

        getCurrentTime: function () {
            return element.currentTime;
        },

        setCurrentTime: function (currentTime) {
            //_currentTime = currentTime;

            // We don't set the same currentTime because it can cause firing unexpected Pause event in IE11
            // providing playbackRate property equals to zero.
            if (element.currentTime == currentTime) return;

            element.currentTime = currentTime;
        },

        listen: function (type, callback) {
            element.addEventListener(type, callback, false);
        },

        // ORANGE : register listener on video element parent
        listenOnParent: function (type, callback) {
            element.parentElement.addEventListener(type, callback, false);
        },

        unlisten: function (type, callback) {
            element.removeEventListener(type, callback, false);
        },

        getElement: function () {
            return element;
        },

        setElement: function (value) {
            element = value;
        },

        setSource: function (source) {
            element.src = source;
        },

        isStalled: function () {
            return element.playbackRate === 0;
        },

        stallStream: stallStream
    };
};

MediaPlayer.models.VideoModel.prototype = {
    constructor: MediaPlayer.models.VideoModel
};
