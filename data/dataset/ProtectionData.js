/**
 * Data used to customize KeySystems and override default or CDM-provided
 * values
 *
 * @param {string} laURL a license acquisition URL to use with this key system
 * @param {Object} httpRequestHeaders headers to add to the http request
 * @param {Object} bearerToken
 * @param {Object} clearkeys defines a set of clear keys that are available to
 * the key system.  Object properties are base64-encoded keyIDs (with no padding).
 * Corresponding property values are keys, base64-encoded (no padding).
 * @constructor
 */
MediaPlayer.vo.protection.ProtectionData = function(laURL, httpRequestHeaders, bearerToken, clearkeys) {
    this.laURL = laURL;
    this.httpRequestHeaders = httpRequestHeaders;
    this.bearerToken = bearerToken;
    this.clearkeys = clearkeys;
};

MediaPlayer.vo.protection.ProtectionData.prototype = {
    constructor: MediaPlayer.vo.protection.ProtectionData
};