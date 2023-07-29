/**
 * @fileoverview Easing functions for animations.
 *
 */

goog.provide('goog.fx.easing');


/**
 * Ease in - Start slow and speed up.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 */
goog.fx.easing.easeIn = function(t) {
  return t * t * t;
};


/**
 * Ease out - Start fastest and slows to a stop.
 * @param {number} t Input between 0 and 1.
 * @param {number=} opt_exponent Ease exponent.  If undefined, defaults to 3.
 * @return {number} Output between 0 and 1.
 */
goog.fx.easing.easeOut = function(t, opt_exponent) {
  return 1 - Math.pow(1 - t, goog.isDef(opt_exponent) ? opt_exponent : 3);
};


/**
 * Ease out long - Start fastest and slows to a stop with a long ease.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 */
goog.fx.easing.easeOutLong = function(t) {
  return goog.fx.easing.easeOut(t, 4);
};


/**
 * Ease in and out - Start slow, speed up, then slow down.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 */
goog.fx.easing.inAndOut = function(t) {
  return 3 * t * t - 2 * t * t * t;
};
