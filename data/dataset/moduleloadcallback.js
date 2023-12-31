/**
 * @fileoverview A simple callback mechanism for notification about module
 * loads. Should be considered package-private to goog.module.
 *
 */

goog.provide('goog.module.ModuleLoadCallback');

goog.require('goog.debug.entryPointRegistry');
goog.require('goog.debug.errorHandlerWeakDep');



/**
 * Class used to encapsulate the callbacks to be called when a module loads.
 * @param {Function} fn Callback function.
 * @param {Object=} opt_handler Optional handler under whose scope to execute
 *     the callback.
 * @constructor
 * @final
 */
goog.module.ModuleLoadCallback = function(fn, opt_handler) {
  /**
   * Callback function.
   * @type {Function}
   * @private
   */
  this.fn_ = fn;

  /**
   * Optional handler under whose scope to execute the callback.
   * @type {Object|undefined}
   * @private
   */
  this.handler_ = opt_handler;
};


/**
 * Completes the operation and calls the callback function if appropriate.
 * @param {*} context The module context.
 */
goog.module.ModuleLoadCallback.prototype.execute = function(context) {
  if (this.fn_) {
    this.fn_.call(this.handler_ || null, context);
    this.handler_ = null;
    this.fn_ = null;
  }
};


/**
 * Abort the callback, but not the actual module load.
 */
goog.module.ModuleLoadCallback.prototype.abort = function() {
  this.fn_ = null;
  this.handler_ = null;
};


// Register the browser event handler as an entry point, so that
// it can be monitored for exception handling, etc.
goog.debug.entryPointRegistry.register(
    /**
     * @param {function(!Function): !Function} transformer The transforming
     *     function.
     */
    function(transformer) {
      goog.module.ModuleLoadCallback.prototype.execute =
          transformer(goog.module.ModuleLoadCallback.prototype.execute);
    });
