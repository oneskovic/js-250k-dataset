var cordova = require('cordova');
var utils = require('cordova/utils');

module.exports = {

    getDeviceInfo:function(win,fail,args) {

        // deviceId aka uuid, stored in Windows.Storage.ApplicationData.current.localSettings.values.deviceId
        var deviceId;

        var localSettings = Windows.Storage.ApplicationData.current.localSettings;

        if (localSettings.values.deviceId) {
            deviceId = localSettings.values.deviceId;
        }
        else {
            deviceId = localSettings.values.deviceId = utils.createUUID();
        }

        setTimeout(function () {
            win({ platform: "windows8", version: "8", uuid: deviceId, cordova: '0.0.0', model: window.clientInformation.platform });
        }, 0);
    }

};

require("cordova/windows8/commandProxy").add("Device", module.exports);

