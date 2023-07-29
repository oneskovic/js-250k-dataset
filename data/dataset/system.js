var deviceSettings = require('ripple/deviceSettings'),
    devices = require('ripple/devices'),
    app = require('ripple/app'),
    utils = require('ripple/utils'),
    _self;

function _is(feature) {
    return {
        allowedFor: function (location) {
            return feature && feature.URIs.some(function (uri) {
                return uri.value === location ||
                      (location.indexOf(uri.value) >= 0 && uri.subdomains);
            });
        }
    };
}

_self = {
    hasCapability: function (capability) {
        var capabilities = devices.getCurrentDevice().capabilities;
        return capabilities ? capabilities.some(function (type) {
                return type === capability;
            }) : false;
    },
    hasPermission: function (desiredModule) {
        var info = app.getInfo(),
            feature = info.features ? info.features[desiredModule] : null;

        return feature === null || _is(feature).allowedFor(utils.location().href) ? _self.ALLOW : _self.DENY;
    }
};

_self.__defineGetter__("ALLOW", function () {
    return 0;
});

_self.__defineGetter__("DENY", function () {
    return 1;
});

_self.__defineGetter__("softwareVersion", function () {
    return devices.getCurrentDevice().osVersion;
});

_self.__defineGetter__("hardwareId", function () {
    return devices.getCurrentDevice().hardwareId;
});

_self.__defineGetter__("language", function () {
    return deviceSettings.retrieve("system.language");
});

_self.__defineGetter__("region", function () {
    return deviceSettings.retrieve("system.region");
});

module.exports = _self;
