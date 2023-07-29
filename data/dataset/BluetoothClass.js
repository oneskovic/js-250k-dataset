var errorcode = require('ripple/platform/tizen/2.0/errorcode'),
    t = require('ripple/platform/tizen/2.0/typecast'),
    WebAPIException = require('ripple/platform/tizen/2.0/WebAPIException'),
    BluetoothClass,
    _security;

BluetoothClass = function (prop, metaData) {
    var bluetoothClass = {};

    _security = metaData;

    bluetoothClass.major    = prop.major || 0;
    bluetoothClass.minor    = prop.minor || 0;
    bluetoothClass.services = prop.services || [];

    this.__defineGetter__("major", function () {
        return bluetoothClass.major;
    });

    this.__defineGetter__("minor", function () {
        return bluetoothClass.minor;
    });

    this.__defineGetter__("services", function () {
        return bluetoothClass.services;
    });

    bluetoothClass.services.forEach(function (service, i) {
        bluetoothClass.services.__defineGetter__(i, function () {
            return service;
        });
    });

    this.hasService = function (service) {
        if (!_security.hasService) {
            throw new WebAPIException(errorcode.SECURITY_ERR);
        }

        t.BluetoothClass("hasService", arguments);

        return (bluetoothClass.services.join(",").indexOf(service) !== -1);
    };
};

module.exports = BluetoothClass;
