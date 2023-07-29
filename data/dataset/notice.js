/**
 * @fileoverview Provides a notice object that is used to encapsulates
 * information about a particular change/notification on an observable
 * object.
 */

goog.provide('goog.labs.observe.Notice');



/**
 * A notice object encapsulates information about a notification fired
 * by an observable.
 * @param {!goog.labs.observe.Observable} observable The observable
 *     object that fires this notice.
 * @param {!goog.labs.observe.NoticeType} type The notice type.
 * @param {*=} opt_data The optional data associated with this notice.
 * @constructor
 */
goog.labs.observe.Notice = function(observable, type, opt_data) {
  /**
   * @type {!goog.labs.observe.Observable}
   * @private
   */
  this.observable_ = observable;

  /**
   * @type {goog.labs.observe.NoticeType}
   * @private
   */
  this.type_ = type;

  /**
   * @type {*}
   * @private
   */
  this.data_ = opt_data;
};


/**
 * @return {!goog.labs.observe.Observable} The observable object that
 *     fires this notice.
 */
goog.labs.observe.Notice.prototype.getObservable = function() {
  return this.observable_;
};


/**
 * @return {goog.labs.observe.NoticeType} The notice type.
 */
goog.labs.observe.Notice.prototype.getType = function() {
  return this.type_;
};


/**
 * @return {*} The optional data associated with this notice. May be
 *     null/undefined.
 */
goog.labs.observe.Notice.prototype.getData = function() {
  return this.data_;
};
