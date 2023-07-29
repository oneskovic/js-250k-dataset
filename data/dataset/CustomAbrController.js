Custom.dependencies.CustomAbrController = function () {
    "use strict";
    var rslt = Custom.utils.copyMethods(MediaPlayer.dependencies.AbrController);

    rslt.manifestExt = undefined;
    rslt.debug = undefined;
    rslt.config = undefined;

    rslt.getRepresentationBandwidth = function (data, index) {
        var self = this,
            deferred = Q.defer();

        self.manifestExt.getRepresentationFor(index, data).then(
            function(rep) {
                self.manifestExt.getBandwidth(rep).then(
                    function (bandwidth) {
                        deferred.resolve(bandwidth);
                    }
                );
            }
        );

        return deferred.promise;
    };

    rslt.getQualityBoundaries = function (type, data) {
        var self = this,
            deferred = Q.defer(),
            qualityMin = self.config.getParamFor(type, "ABR.minQuality", "number", -1),
            qualityMax = self.config.getParamFor(type, "ABR.maxQuality", "number", -1),
            bandwidthMin = self.config.getParamFor(type, "ABR.minBandwidth", "number", -1),
            bandwidthMax = self.config.getParamFor(type, "ABR.maxBandwidth", "number", -1),
            i,
            funcs = [];

        self.debug.log("[AbrController]["+type+"] Quality   boundaries: [" + qualityMin + "," + qualityMax + "]");
        self.debug.log("[AbrController]["+type+"] Bandwidth boundaries: [" + bandwidthMin + "," + bandwidthMax + "]");

        // Get bandwidth boundaries and override quality boundaries
        if ((bandwidthMin !== -1) || (bandwidthMax !== -1)) {
            // Get min quality corresponding to min bandwidth
            self.manifestExt.getRepresentationCount(data).then(
                function (count) {
                    for (i = 0; i < count; i += 1) {
                        funcs.push(rslt.getRepresentationBandwidth.call(self, data, i));
                    }
                    Q.all(funcs).then(
                        function (bandwidths) {
                            if (bandwidthMin !== -1) {
                                for (i = 0; i < count; i += 1) {
                                    if (bandwidths[i] >= bandwidthMin) {
                                        qualityMin = (qualityMin === -1) ? i : Math.max(i, qualityMin);
                                        break;
                                    }
                                }
                            }
                            if (bandwidthMax !== -1) {
                                for (i = (count - 1); i >= 0; i -= 1) {
                                    if (bandwidths[i] <= bandwidthMax) {
                                        qualityMax = (qualityMax === -1) ? i : Math.min(i, qualityMax);
                                        break;
                                    }
                                }
                            }
                            deferred.resolve({min: qualityMin, max: qualityMax});
                        }
                    );
                }
            );
        } else {
            deferred.resolve({min: qualityMin, max: qualityMax});
        }

        return deferred.promise;
    };
   
    rslt.getPlaybackQuality = function (type, data) {
        var self = this,
            deferred = Q.defer(),
            previousQuality = self.getQualityFor(type),
            qualityMin = -1,
            qualityMax = -1,
            quality,
            switchIncremental = self.config.getParamFor(type, "ABR.switchIncremental", "boolean", false);

        // Call parent's getPlaybackQuality function
        self.parent.getPlaybackQuality.call(self, type, data).then(
            function (result) {
                quality = result.quality;

                // Check incremental switch
                if (switchIncremental && (quality > previousQuality)) {
                    self.debug.log("[AbrController]["+type+"] Incremental switch => quality: " + quality);
                    quality = previousQuality + 1;
                }

                // Check representation boundaries
                rslt.getQualityBoundaries.call(self, type, data).then(
                    function (qualityBoundaries) {
                        qualityMin = qualityBoundaries.min;
                        qualityMax = qualityBoundaries.max;

                        if ((qualityMin !== -1) && (quality < qualityMin)) {
                            quality = qualityMin;
                            self.debug.log("[AbrController]["+type+"] New quality < min => " + quality);
                        }

                        if ((qualityMax !== -1) && (quality > qualityMax)) {
                            quality = qualityMax;
                            self.debug.log("[AbrController]["+type+"] New quality > max => " + quality);
                        }

                        self.parent.setPlaybackQuality.call(self, type, quality);
                        deferred.resolve({quality: quality, confidence: result.confidence});
                    }
                );
            }
        );

        return deferred.promise;
    };

    return rslt;
};

Custom.dependencies.CustomAbrController.prototype = {
    constructor: Custom.dependencies.CustomAbrController
};
