var t = require('ripple/platform/tizen/2.0/typecast'),
    DownloadRequest;

DownloadRequest = function (url, destination, fileName, networkType,
        httpHeader) {
    var downloadRequest = {};

    t.DownloadRequest(arguments, this);

    this.__defineGetter__("url", function () {
        return downloadRequest.url;
    });
    this.__defineSetter__("url", function (val) {
        try {
            downloadRequest.url = t.DOMString(val);
        } catch (e) {
        }
    });

    this.__defineGetter__("networkType", function () {
        return downloadRequest.networkType;
    });
    this.__defineSetter__("networkType", function (val) {
        try {
            downloadRequest.networkType = t.DownloadNetworkType(val, "?");
        } catch (e) {
        }
    });

    this.destination            = destination || "";
    this.fileName               = fileName || "";
    this.httpHeader             = httpHeader || {};

    downloadRequest.url         = url;
    downloadRequest.networkType = networkType || "ALL";
};

module.exports = DownloadRequest;
