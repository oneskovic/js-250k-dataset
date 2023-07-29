/**
 * @fileoverview Stubs out Chrome and DOM APIs that are common for all tests,
 * yet either are not provided or interfere with the tests.
 */

goog.provide('e2e.ext.testingstubs');


/**
 * Initializes the stubs.
 * @param {goog.testing.PropertyReplacer} replacer
 */
e2e.ext.testingstubs.initStubs = function(replacer) {
  replacer.setPath('window.open', goog.nullFunction);
  replacer.setPath('window.setTimeout', function(callback) {
    callback();
  });
  replacer.setPath('window.confirm', function(msg) { return true; });


  replacer.setPath('chrome.browserAction.setBadgeText', goog.nullFunction);
  replacer.setPath('chrome.browserAction.setTitle', goog.nullFunction);
  replacer.setPath('chrome.browserAction.setIcon', goog.nullFunction);
  replacer.setPath('chrome.extension.getURL', goog.nullFunction);
  replacer.setPath('chrome.i18n.getMessage', function() {
    return [].join.call(arguments);
  });
  replacer.setPath('chrome.notifications.clear', goog.nullFunction);
  replacer.setPath('chrome.notifications.create', goog.nullFunction);
  replacer.setPath('chrome.runtime.getBackgroundPage', goog.nullFunction);
  replacer.setPath('chrome.runtime.getURL', goog.nullFunction);
  replacer.setPath('chrome.runtime.onConnect.addListener', goog.nullFunction);
  replacer.setPath('chrome.runtime.onMessage.addListener', goog.nullFunction);
  replacer.setPath(
      'chrome.runtime.onConnect.removeListener', goog.nullFunction);
  replacer.setPath('chrome.tabs.get', goog.nullFunction);
  replacer.setPath('chrome.tabs.onUpdated.addListener', goog.nullFunction);
  replacer.setPath('chrome.tabs.onRemoved.addListener', goog.nullFunction);
  replacer.setPath('chrome.tabs.onActivated.addListener', goog.nullFunction);
  replacer.setPath('chrome.tabs.executeScript', goog.nullFunction);
  replacer.setPath('chrome.tabs.query', function(req, callback) {
    callback([{id: 1}]);
  });
  replacer.setPath('chrome.tabs.reload', goog.nullFunction);
  replacer.setPath('chrome.tabs.sendMessage', goog.nullFunction);
  replacer.setPath('chrome.webRequest.onHeadersReceived.addListener',
                   goog.nullFunction);
  replacer.setPath('chrome.webRequest.onHeadersReceived.removeListener',
                   goog.nullFunction);
};
