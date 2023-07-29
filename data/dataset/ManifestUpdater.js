MediaPlayer.dependencies.ManifestUpdater = function () {
    "use strict";

    var refreshDelay = NaN,
        refreshTimer = null,
        isStopped = false,
        deferredUpdate,

        clear = function () {
            if (refreshTimer !== null) {
                clearInterval(refreshTimer);
                refreshTimer = null;
            }
        },

        start = function () {
            clear.call(this);

            if (!isNaN(refreshDelay)) {
                this.debug.log("Refresh manifest in " + refreshDelay + " seconds.");
                refreshTimer = setTimeout(onRefreshTimer.bind(this), Math.min(refreshDelay * 1000, Math.pow(2, 31) - 1), this);
            }
        },

        update = function () {
            var self = this,
                manifest = self.manifestModel.getValue(),
                timeSinceLastUpdate;

            if (manifest !== undefined && manifest !== null) {
                self.manifestExt.getRefreshDelay(manifest).then(
                    function (t) {
                        timeSinceLastUpdate = (new Date().getTime() - manifest.mpdLoadedTime.getTime()) / 1000;
                        refreshDelay = Math.max(t - timeSinceLastUpdate, 0);
                        start.call(self);
                    }
                );
            }
        },

        onRefreshTimer = function () {
            var self = this,
                manifest,
                url;

            // The manifest should not update until the previous update has completed. A promise postpones the update
            // until is is resolved. For the first time the promise does not exist yet, so pass 'true' instead.
            Q.when(deferredUpdate ? deferredUpdate.promise : true).then(
                function() {
                    deferredUpdate = Q.defer();
                    manifest = self.manifestModel.getValue();
                    url = manifest.mpdUrl;

                    if (manifest.hasOwnProperty("Location")) {
                        url = manifest.Location;
                    }

                    //self.debug.log("Refresh manifest @ " + url);

                    self.manifestLoader.load(url).then(
                        function (manifestResult) {
                            self.manifestModel.setValue(manifestResult);
                            self.debug.log("Manifest has been refreshed.");
                            //self.debug.log(manifestResult);
                            if (isStopped) return;

                            update.call(self);
                        }
                    );
                }
            );
        },

        onStreamsComposed = function() {
            // When streams are ready we can consider manifest update completed. Resolve the update promise.
            if (deferredUpdate) {
                deferredUpdate.resolve();
            }
        };

    return {
        debug: undefined,
        system: undefined,
        manifestModel: undefined,
        manifestExt: undefined,
        manifestLoader: undefined,

        setup: function () {
            update.call(this);
            // Listen to streamsComposed event to be aware that the streams have been composed
            this.system.mapHandler("streamsComposed", undefined, onStreamsComposed.bind(this));
        },

        start: function () {
            isStopped = false;
            update.call(this);
        },

        stop: function() {
            isStopped = true;
            clear.call(this);
        }
    };
};

MediaPlayer.dependencies.ManifestUpdater.prototype = {
    constructor: MediaPlayer.dependencies.ManifestUpdater
};