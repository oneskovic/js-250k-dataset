goog.provide('thin.core.formatstyles.DatetimeFormat');

goog.require('thin.core.formatstyles.AbstractFormat');


/**
 * @param {string} datetimeFormat
 * @constructor
 * @extends {thin.core.formatstyles.AbstractFormat}
 */
thin.core.formatstyles.DatetimeFormat = function(datetimeFormat) {
  thin.core.formatstyles.AbstractFormat.call(this);
  
  /**
   * @type {string}
   * @private
   */
  this.format_ = datetimeFormat;
};
goog.inherits(thin.core.formatstyles.DatetimeFormat, thin.core.formatstyles.AbstractFormat);


/**
 * @enum {string}
 */
thin.core.formatstyles.DatetimeFormat.DateFormatTemplate = {
  YMDHMS: '%Y/%m/%d %H:%M:%S'
};


thin.core.formatstyles.DatetimeFormat.DEFAULT_FORMAT = '';


/**
 * @return {string}
 */
thin.core.formatstyles.DatetimeFormat.prototype.getFormat = function() {
  return this.format_;
};


/**
 * @return {string}
 */
thin.core.formatstyles.DatetimeFormat.prototype.inspect = function() {
  return this.format_;
};


/** @inheritDoc */
thin.core.formatstyles.DatetimeFormat.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  
  delete this.format_;
};