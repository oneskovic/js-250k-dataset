MediaPlayer.dependencies.TextController = function () {

     var initialized = false,
         mediaSource,
         buffer,
         type,

         onDataUpdateCompleted = function(/*e*/) {
             if (!initialized) {
                 if (buffer.hasOwnProperty('initialize')) {
                     buffer.initialize(type, this);
                 }
                 initialized = true;
             }
             this.notify(MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED, {CCIndex: 0});
         },

         onInitFragmentLoaded = function (e) {
             var self = this;

             if (e.data.fragmentModel !== self.streamProcessor.getFragmentModel()) return;

             if (e.data.bytes !== null) {
                 //self.log("Push text track bytes: " + data.byteLength);
                 self.sourceBufferExt.append(buffer, e.data.bytes, self.videoModel);
             }
         };

    return {
        sourceBufferExt: undefined,
        log: undefined,
        system: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,

        setup: function() {
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
            this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED] = onInitFragmentLoaded;
        },

        initialize: function (typeValue, buffer, source, streamProcessor) {
            var self = this;

            type = typeValue;
            self.setBuffer(buffer);
            self.setMediaSource(source);
            self.videoModel = streamProcessor.videoModel;
            self.trackController = streamProcessor.trackController;
            self.streamProcessor = streamProcessor;
        },

        getBuffer: function () {
            return buffer;
        },

        setBuffer: function (value) {
            buffer = value;
        },

        setMediaSource: function(value) {
            mediaSource = value;
        },

        reset: function (errored) {
            if (!errored) {
                this.sourceBufferExt.abort(mediaSource, buffer);
                this.sourceBufferExt.removeSourceBuffer(mediaSource, buffer);
            }
        }
    };
};

MediaPlayer.dependencies.TextController.prototype = {
    constructor: MediaPlayer.dependencies.TextController
};

MediaPlayer.dependencies.TextController.eventList = {
    ENAME_CLOSED_CAPTIONING_REQUESTED: "closedCaptioningRequested"
};