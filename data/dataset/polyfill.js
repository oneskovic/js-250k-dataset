/**
 * @fileoverview A polyfill for window.requestAnimationFrame and
 * window.cancelAnimationFrame.
 * Code based on https://gist.github.com/paulirish/1579671
 */

goog.provide('goog.dom.animationFrame.polyfill');


/**
 * @define {boolean} If true, will install the requestAnimationFrame polyfill.
 */
goog.define('goog.dom.animationFrame.polyfill.ENABLED', true);


/**
 * Installs the requestAnimationFrame (and cancelAnimationFrame) polyfill.
 */
goog.dom.animationFrame.polyfill.install =
    goog.dom.animationFrame.polyfill.ENABLED ? function() {
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] +
        'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] +
        'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      lastTime = currTime + timeToCall;
      return window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
    };

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  }
} : goog.nullFunction;
