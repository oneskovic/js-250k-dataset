var event = require('ripple/event'),
    errorcode = require('ripple/platform/tizen/2.0/errorcode'),
    t = require('ripple/platform/tizen/2.0/typecast'),
    WebAPIException = require('ripple/platform/tizen/2.0/WebAPIException'),
    BluetoothServiceHandler,
    _security;

BluetoothServiceHandler = function (prop) {
    var bluetoothServiceHandler = {};

    _security = prop.metaData;

    bluetoothServiceHandler.uuid        = prop.uuid || "";
    bluetoothServiceHandler.name        = prop.name || "";
    bluetoothServiceHandler.isConnected = prop.isConnected || false;
    bluetoothServiceHandler.onconnect   = null;

    this.__defineGetter__("uuid", function () {
        return bluetoothServiceHandler.uuid;
    });

    this.__defineGetter__("name", function () {
        return bluetoothServiceHandler.name;
    });

    this.__defineGetter__("isConnected", function () {
        return bluetoothServiceHandler.isConnected;
    });

    this.__defineGetter__("onconnect", function () {
        return bluetoothServiceHandler.onconnect;
    });
    this.__defineSetter__("onconnect", function (val) {
        try {
            bluetoothServiceHandler.onconnect =
                    t.BluetoothSocketSuccessCallback(val, "?");
        } catch (e) {
        }
    });

    this.unregister = function (successCallback, errorCallback) {
        if (!_security.unregister) {
            throw new WebAPIException(errorcode.SECURITY_ERR);
        }

        t.BluetoothServiceHandler("unregister", arguments);

        event.trigger("bt-unregister-service", [bluetoothServiceHandler.uuid,
                successCallback, errorCallback]);
    };
};

module.exports = BluetoothServiceHandler;
