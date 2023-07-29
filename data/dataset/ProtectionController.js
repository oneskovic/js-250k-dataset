MediaPlayer.dependencies.ProtectionController = function () {
    "use strict";

    var element = null,
        keySystems = null,

        teardownKeySystem = function (kid) {
            var self = this;
            self.protectionModel.removeKeySystem(kid);
        },

        selectKeySystem = function (codec, contentProtection) {
            var self = this;

            for(var ks = 0; ks < keySystems.length; ++ks) {
                for(var cp = 0; cp < contentProtection.length; ++cp) {
                    if (keySystems[ks].isSupported(contentProtection[cp]) &&
                        self.protectionExt.supportsCodec(keySystems[ks].keysTypeString, codec)) {

                        var kid = self.manifestExt.getKID(contentProtection[cp]);
                        if (!kid) {
                            kid = "unknown";
                        }

                        self.protectionModel.addKeySystem(kid, contentProtection[cp], keySystems[ks]);

                        self.debug.log("DRM: Selected Key System: " + keySystems[ks].keysTypeString + " For KID: " + kid);

                        return kid;
                    }
                }
            }
            throw new Error("DRM: The protection system for this content is not supported.");
        },

        ensureKeySession = function (kid, codec, eventInitData) {
            var self = this,
                session = null,
                initData = null;

            if (!self.protectionModel.needToAddKeySession(kid)) {
                return;
            }

            initData = self.protectionModel.getInitData(kid);

            if (!initData && !!eventInitData) {
                initData = eventInitData;
                self.debug.log("DRM: Using initdata from needskey event. length: " + initData.length);
            }
            else if (!!initData){
                self.debug.log("DRM: Using initdata from prheader in mpd. length: " + initData.length);
            }

            if (!!initData) {
                session = self.protectionModel.addKeySession(kid, codec, initData);
                self.debug.log("DRM: Added Key Session [" + session.sessionId + "] for KID: " + kid + " type: " + codec + " initData length: " + initData.length);
            }
            else {
                self.debug.log("DRM: initdata is null.");
            }
        },

        updateFromMessage = function (kid, session, msg, laURL) {
            var self = this,
                result;
            result = self.protectionModel.updateFromMessage(kid, msg, laURL);
            result.then(
                function (data) {
                        session.update(data);
            });
            return result;
        };

    return {
        system : undefined,
        debug : undefined,
        manifestExt : undefined,
        capabilities : undefined,
        videoModel : undefined,
        protectionModel : undefined,
        protectionExt : undefined,

        setup : function () {
            keySystems = this.protectionExt.getKeySystems();
        },

        init: function (videoModel, protectionModel) {
            this.videoModel = videoModel;
            this.protectionModel = protectionModel;
            element = this.videoModel.getElement();
        },

        selectKeySystem : selectKeySystem,
        ensureKeySession : ensureKeySession,
        updateFromMessage : updateFromMessage,
        teardownKeySystem : teardownKeySystem
    };
};

MediaPlayer.dependencies.ProtectionController.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionController
};
