goog.provide('thin.core.formatstyles.PaddingFormat');
goog.provide('thin.core.formatstyles.PaddingFormat.DirectionType');
 
goog.require('thin.core.formatstyles.AbstractFormat');


/**
 * @param {string} direction
 * @param {string} chars
 * @param {number} len
 * @constructor
 * @extends {thin.core.formatstyles.AbstractFormat}
 */
thin.core.formatstyles.PaddingFormat = function(direction, chars, len) {
  thin.core.formatstyles.AbstractFormat.call(this);
  
  /**
   * @type {string}
   * @private
   */
  this.direction_ = direction;
  
  /**
   * @type {string}
   * @private
   */
  this.char_ = chars;
  
  /**
   * @type {number}
   * @private
   */
  this.len_ = len;
};
goog.inherits(thin.core.formatstyles.PaddingFormat, thin.core.formatstyles.AbstractFormat);


/**
 * @enum {string}
 */
thin.core.formatstyles.PaddingFormat.DirectionType = {
  L: 'L',
  R: 'R'
};


/**
 * @type {string}
 */
thin.core.formatstyles.PaddingFormat.DEFAULT_DIRECTION = thin.core.formatstyles.PaddingFormat.DirectionType.L;


/**
 * @type {string}
 */
thin.core.formatstyles.PaddingFormat.DEFAULT_CHAR = '0';


/**
 * @type {number}
 */
thin.core.formatstyles.PaddingFormat.DEFAULT_LENGTH = 0;


/**
 * @param {string} directionType
 * @return {string}
 */
thin.core.formatstyles.PaddingFormat.getDirectionName = function(directionType) {
  var type = thin.core.formatstyles.PaddingFormat.DirectionType;
  var name;

  switch(directionType) {
    case type.L:
      name = thin.t('label_fill_left');
      break;
    case type.R:
      name = thin.t('label_fill_right');
      break;
  }
  return /** @type {string} */(name);
};


/**
 * @return {string}
 */
thin.core.formatstyles.PaddingFormat.prototype.getDirection = function() {
  return this.direction_;
};


/**
 * @return {number}
 */
thin.core.formatstyles.PaddingFormat.prototype.getLength = function() {
  return this.len_;
};


/**
 * @return {string}
 */
thin.core.formatstyles.PaddingFormat.prototype.getChar = function() {
  return this.char_;
};


/**
 * @return {string}
 */
thin.core.formatstyles.PaddingFormat.prototype.inspect = function() {
  return [
    thin.t('field_fill_length') + '=' + this.len_, 
    thin.t('field_fill_character') + '=[' + this.char_ + ']', 
    thin.t('field_fill_direction') + '=' + thin.core.formatstyles.PaddingFormat.getDirectionName(this.direction_)
  ].join('/');
};


/** @inheritDoc */
thin.core.formatstyles.PaddingFormat.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  
  delete this.direction_;
  delete this.len_;
  delete this.char_;
};
