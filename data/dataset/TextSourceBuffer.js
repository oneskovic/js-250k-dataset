MediaPlayer.dependencies.TextSourceBuffer = function () {

    var mediaInfo,
        mimeType;

    return {
        system:undefined,
        eventBus:undefined,
        errHandler: undefined,

        initialize: function (type, bufferController) {
            mimeType = type;
            this.videoModel = bufferController.videoModel;
            mediaInfo = bufferController.streamProcessor.getCurrentTrack().mediaInfo;
            this.buffered =  this.system.getObject("customTimeRanges");
            this.initializationSegmentReceived= false;
            this.timescale= 90000;
        },
        append: function (bytes,appendedBytesInfo) {
            var self = this,
                result,
                label,
                lang,
                samplesInfo,
                i,
                ccContent;

            if(mimeType=="fragmentedText"){
                var fragmentExt;
                if(!this.initializationSegmentReceived){
                    this.initializationSegmentReceived=true;
                    label = mediaInfo.id;
                    lang = mediaInfo.lang;
                    this.textTrackExtensions=self.getTextTrackExtensions();
                    this.textTrackExtensions.addTextTrack(self.videoModel.getElement(), result, label, lang, true);
                    self.eventBus.dispatchEvent({type:MediaPlayer.events.TEXT_TRACK_ADDED});
                    fragmentExt = self.system.getObject("fragmentExt");
                    this.timescale= fragmentExt.getMediaTimescaleFromMoov(bytes.buffer);
                }else{
                    fragmentExt = self.system.getObject("fragmentExt");

                    samplesInfo=fragmentExt.getSamplesInfo(bytes.buffer);
                    for(i= 0 ; i<samplesInfo.length ;i++) {
                        if(!this.firstSubtitleStart){
                            this.firstSubtitleStart=samplesInfo[0].cts-appendedBytesInfo.startTime*this.timescale;
                        }
                        samplesInfo[i].cts-=this.firstSubtitleStart;
                        this.buffered.add(samplesInfo[i].cts/this.timescale,(samplesInfo[i].cts+samplesInfo[i].duration)/this.timescale);

                        ccContent=window.UTF8.decode(new Uint8Array(bytes.buffer.slice(samplesInfo[i].offset,samplesInfo[i].offset+samplesInfo[i].size)));
                        var parser = this.system.getObject("ttmlParser");
                        try{
                            result = parser.parse(ccContent);
                            this.textTrackExtensions.addCaptions(this.firstSubtitleStart/this.timescale,result);
                        } catch(e) {
                            //empty cue ?
                        }
                    }
                }
            }else{
                ccContent=window.UTF8.decode(bytes);
                try {
                    result = self.getParser().parse(ccContent);
                    label = mediaInfo.id;
                    lang = mediaInfo.lang;
                    self.getTextTrackExtensions().addTextTrack(self.videoModel.getElement(), result, label, lang, true);
                    self.eventBus.dispatchEvent({type:MediaPlayer.events.TEXT_TRACK_ADDED});
                } catch(e) {
                    self.errHandler.closedCaptionsError(e, "parse", ccContent);
                }
            }
        },

        abort:function() {
            this.getTextTrackExtensions().deleteCues(this.videoModel.getElement());
        },

        getParser:function() {
            var parser;

            if (mimeType === "text/vtt") {
                parser = this.system.getObject("vttParser");
            } else if (mimeType === "application/ttml+xml") {
                parser = this.system.getObject("ttmlParser");
            }

            return parser;
        },

        getTextTrackExtensions:function() {
            return this.system.getObject("textTrackExtensions");
        },

        addEventListener: function (type, listener, useCapture) {
            this.eventBus.addEventListener(type, listener, useCapture);
        },

        removeEventListener: function (type, listener, useCapture) {
            this.eventBus.removeEventListener(type, listener, useCapture);
        }
    };
};

MediaPlayer.dependencies.TextSourceBuffer.prototype = {
    constructor: MediaPlayer.dependencies.TextSourceBuffer
};
