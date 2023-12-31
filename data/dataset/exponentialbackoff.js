/**
 * @fileoverview Utility class to manage the mathematics behind computing an
 * exponential backoff model.  Given an initial backoff value and a maximum
 * backoff value, every call to backoff() will double the value until maximum
 * backoff value is reached.
 *
 */


goog.provide('goog.math.ExponentialBackoff');

goog.require('goog.asserts');



/**
 * @constructor
 *
 * @param {number} initialValue The initial backoff value.
 * @param {number} maxValue The maximum backoff value.
 */
goog.math.ExponentialBackoff = function(initialValue, maxValue) {
  goog.asserts.assert(initialValue > 0,
      'Initial value must be greater than zero.');
  goog.asserts.assert(maxValue >= initialValue,
      'Max value should be at least as large as initial value.');

  /**
   * @type {number}
   * @private
   */
  this.initialValue_ = initialValue;

  /**
   * @type {number}
   * @private
   */
  this.maxValue_ = maxValue;

  /**
   * The current backoff value.
   * @type {number}
   * @private
   */
  this.currValue_ = initialValue;
};


/**
 * The number of backoffs that have happened.
 * @type {number}
 * @private
 */
goog.math.ExponentialBackoff.prototype.currCount_ = 0;


/**
 * Resets the backoff value to its initial value.
 */
goog.math.ExponentialBackoff.prototype.reset = function() {
  this.currValue_ = this.initialValue_;
  this.currCount_ = 0;
};


/**
 * @return {number} The current backoff value.
 */
goog.math.ExponentialBackoff.prototype.getValue = function() {
  return this.currValue_;
};


/**
 * @return {number} The number of times this class has backed off.
 */
goog.math.ExponentialBackoff.prototype.getBackoffCount = function() {
  return this.currCount_;
};


/**
 * Initiates a backoff.
 */
goog.math.ExponentialBackoff.prototype.backoff = function() {
  this.currValue_ = Math.min(this.maxValue_, this.currValue_ * 2);
  this.currCount_++;
};
