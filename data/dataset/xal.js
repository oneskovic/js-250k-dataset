/* global chrome, µMatrix */

/******************************************************************************/

µMatrix.XAL = (function(){

/******************************************************************************/

var exports = {};
var noopFunc = function(){};

/******************************************************************************/

// Must read: https://code.google.com/p/chromium/issues/detail?id=410868#c8

// https://github.com/gorhill/uBlock/issues/19
// https://github.com/gorhill/uBlock/issues/207
// Since we may be called asynchronously, the tab id may not exist
// anymore, so this ensures it does still exist.

exports.setIcon = function(id, imgDict, overlayStr) {
    var onIconReady = function() {
        if ( chrome.runtime.lastError ) {
            return;
        }
        chrome.browserAction.setBadgeText({ tabId: id, text: overlayStr });
        if ( overlayStr !== '' ) {
            chrome.browserAction.setBadgeBackgroundColor({ tabId: id, color: '#666' });
        }
    };
    chrome.browserAction.setIcon({ tabId: id, path: imgDict }, onIconReady);
};

/******************************************************************************/

exports.injectScript = function(id, details) {
    chrome.tabs.executeScript(id, details);
};

/******************************************************************************/

exports.keyvalSetOne = function(key, val, callback) {
    var bin = {};
    bin[key] = val;
    chrome.storage.local.set(bin, callback || noopFunc);
};

/******************************************************************************/

exports.keyvalGetOne = function(key, callback) {
    chrome.storage.local.get(key, callback);
};

/******************************************************************************/

exports.keyvalSetMany = function(dict, callback) {
    chrome.storage.local.set(dict, callback || noopFunc);
};

/******************************************************************************/

exports.keyvalRemoveOne = function(key, callback) {
    chrome.storage.local.remove(key, callback || noopFunc);
};

/******************************************************************************/

exports.keyvalRemoveAll = function(callback) {
    chrome.storage.local.clear(callback || noopFunc);
};

/******************************************************************************/

exports.restart = function() {
    // https://github.com/gorhill/uMatrix/issues/40
    // I don't know if that helps workaround whatever Chromium bug causes
    // the browser to crash.
    chrome.runtime.sendMessage({ what: 'restart' }, function() {
        chrome.runtime.reload();
    });
};

/******************************************************************************/

return exports;

/******************************************************************************/

})();
