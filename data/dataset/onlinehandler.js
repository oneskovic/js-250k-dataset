/**
 * @fileoverview NetworkStatusMonitor test double.
 * @author dbk@google.com (David Barrett-Kahn)
 */

goog.provide('goog.testing.events.OnlineHandler');

goog.require('goog.events.EventTarget');
goog.require('goog.net.NetworkStatusMonitor');



/**
 * NetworkStatusMonitor test double.
 * @param {boolean} initialState The initial online state of the mock.
 * @constructor
 * @extends {goog.net.NetworkStatusMonitor}
 */
goog.testing.events.OnlineHandler = function(initialState) {
  goog.base(this);

  /**
   * Whether the mock is online.
   * @type {boolean}
   * @private
   */
  this.online_ = initialState;
};
goog.inherits(goog.testing.events.OnlineHandler, goog.net.NetworkStatusMonitor);


/** @override */
goog.testing.events.OnlineHandler.prototype.isOnline = function() {
  return this.online_;
};


/**
 * Sets the online state.
 * @param {boolean} newOnlineState The new online state.
 */
goog.testing.events.OnlineHandler.prototype.setOnline =
    function(newOnlineState) {
  if (newOnlineState != this.online_) {
    this.online_ = newOnlineState;
    this.dispatchEvent(newOnlineState ?
        goog.net.NetworkStatusMonitor.EventType.ONLINE :
        goog.net.NetworkStatusMonitor.EventType.OFFLINE);
  }
};
