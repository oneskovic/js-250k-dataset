var t = require('ripple/platform/tizen/2.0/typecast'),
    SyncProfileInfo;

SyncProfileInfo = function (profileName, syncInfo, serviceInfo) {
    var syncProfileInfo = {};

    t.SyncProfileInfo(arguments, this);

    syncProfileInfo.profileName = profileName;
    syncProfileInfo.syncInfo    = syncInfo;
    syncProfileInfo.serviceInfo = serviceInfo;

    this.__defineGetter__("profileId", function () {
        return null;
    });

    this.__defineGetter__("profileName", function () {
        return syncProfileInfo.profileName;
    });
    this.__defineSetter__("profileName", function (profileName) {
        try {
            syncProfileInfo.profileName = t.DOMString(profileName);
        } catch (e) {
        }
    });

    this.__defineGetter__("syncInfo", function () {
        return syncProfileInfo.syncInfo;
    });
    this.__defineSetter__("syncInfo", function (syncInfo) {
        try {
            t.SyncInfo(syncInfo);
            syncProfileInfo.syncInfo = syncInfo;
        } catch (e) {
        }
    });

    this.__defineGetter__("serviceInfo", function () {
        return syncProfileInfo.serviceInfo;
    });
    this.__defineSetter__("serviceInfo", function (serviceInfo) {
        try {
            t.SyncServiceInfo(serviceInfo, "[]?");
            syncProfileInfo.serviceInfo = serviceInfo;
        } catch (e) {
        }
    });
};

module.exports = SyncProfileInfo;
