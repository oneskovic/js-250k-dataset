goog.provide('shaka.util.EWMA');

goog.require('shaka.asserts');



/**
 * Computes an exponentionally-weighted moving average.
 *
 * @param {number} halfLife About half of the estimated value will be from the
 *     last |halfLife| samples by weight.
 * @struct
 * @constructor
 */
shaka.util.EWMA = function(halfLife) {
  shaka.asserts.assert(halfLife > 0);

  /**
   * Larger values of alpha expire historical data more slowly.
   * @private {number}
   */
  this.alpha_ = Math.exp(Math.log(0.5) / halfLife);

  /** @private {number} */
  this.estimate_ = 0;

  /** @private {number} */
  this.totalWeight_ = 0;
};


/**
 * Takes a sample.
 *
 * @param {number} weight
 * @param {number} value
 */
shaka.util.EWMA.prototype.sample = function(weight, value) {
  var adjAlpha = Math.pow(this.alpha_, weight);
  this.estimate_ = value * (1 - adjAlpha) + adjAlpha * this.estimate_;
  this.totalWeight_ += weight;
};


/**
 * @return {number}
 */
shaka.util.EWMA.prototype.getTotalWeight = function() {
  return this.totalWeight_;
};


/**
 * @return {number}
 */
shaka.util.EWMA.prototype.getEstimate = function() {
  var zeroFactor = 1 - Math.pow(this.alpha_, this.totalWeight_);
  return this.estimate_ / zeroFactor;
};

