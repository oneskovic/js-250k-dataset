/**
 * @fileoverview Callback object that counts matches.
 *
 * @author robbyw@google.com (Robby Walker)
 */

goog.provide('goog.dom.pattern.callback.Counter');



/**
 * Callback class for counting matches.
 * @constructor
 * @final
 */
goog.dom.pattern.callback.Counter = function() {
};


/**
 * The count of objects matched so far.
 *
 * @type {number}
 */
goog.dom.pattern.callback.Counter.prototype.count = 0;


/**
 * The callback function.  Suitable as a callback for
 * {@link goog.dom.pattern.Matcher}.
 * @type {Function}
 * @private
 */
goog.dom.pattern.callback.Counter.prototype.callback_ = null;


/**
 * Get a bound callback function that is suitable as a callback for
 * {@link goog.dom.pattern.Matcher}.
 *
 * @return {Function} A callback function.
 */
goog.dom.pattern.callback.Counter.prototype.getCallback = function() {
  if (!this.callback_) {
    this.callback_ = goog.bind(function() {
      this.count++;
      return false;
    }, this);
  }
  return this.callback_;
};


/**
 * Reset the counter.
 */
goog.dom.pattern.callback.Counter.prototype.reset = function() {
  this.count = 0;
};
