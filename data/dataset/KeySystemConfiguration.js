/**
 *
 * @param {MediaPlayer.vo.protection.MediaCapability[]} audioCapabilities
 * @param {MediaPlayer.vo.protection.MediaCapability[]} videoCapabilities
 * @param {string} [distinctiveIdentifier]
 * @param {string} [persistentState]
 * @constructor
 */
MediaPlayer.vo.protection.KeySystemConfiguration = function(audioCapabilities, videoCapabilities, distinctiveIdentifier, persistentState) {
    this.initDataTypes = [ "cenc" ];
    this.audioCapabilities = audioCapabilities;
    this.videoCapabilities = videoCapabilities;
    this.distinctiveIdentifier = distinctiveIdentifier;
    this.persistentState = persistentState;
};

MediaPlayer.vo.protection.KeySystemConfiguration.prototype = {
    constructor: MediaPlayer.vo.protection.KeySystemConfiguration
};