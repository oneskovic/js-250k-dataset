var idsMap = {};

module.exports = {
    getLocation: function(success, error, args) {
        var geo = cordova.require('cordova/modulemapper').getOriginalSymbol(window, 'navigator.geolocation'),
            successCallback = function (position) {
                success(position.coords);
            };
        geo.getCurrentPosition(successCallback, error, {
            enableHighAccuracy: args[0],
            maximumAge: args[1]
        });
    },

    addWatch: function(success, error, args) {
        var geo = cordova.require('cordova/modulemapper').getOriginalSymbol(window, 'navigator.geolocation'),
            id = args[0],
            nativeId = geo.watchPosition(success, error, {
                enableHighAccuracy: args[1]
            });

        idsMap[id] = nativeId;
    },

    clearWatch: function(success, error, args) {
        var geo = cordova.require('cordova/modulemapper').getOriginalSymbol(window, 'navigator.geolocation'),
            id = args[0];

        if(id in idsMap) {
            geo.clearWatch(idsMap[id]);
            delete idsMap[id];
        }

        if(success) {
            success();
        }
    }
};

require("cordova/exec/proxy").add("Geolocation", module.exports);
