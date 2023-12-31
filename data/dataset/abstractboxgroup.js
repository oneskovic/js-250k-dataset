goog.provide('thin.core.AbstractBoxGroup');

goog.require('thin.core.Component');



thin.core.AbstractBoxGroup = function(element, layout) {
  goog.base(this, layout, element);

  /**
   * @type {number}
   * @private
   */
  this.left_ = Number(layout.getElementAttribute(element, 'x-left'));

  /**
   * @type {number}
   * @private
   */
  this.top_ = Number(layout.getElementAttribute(element, 'x-top'));

  /**
   * @type {number}
   * @private
   */
  this.width_ = Number(layout.getElementAttribute(element, 'x-width'));

  /**
   * @type {number}
   * @private
   */
  this.height_ = Number(layout.getElementAttribute(element, 'x-height'));
};
goog.inherits(thin.core.AbstractBoxGroup, thin.core.Component);


/**
 * @type {thin.core.Box}
 * @private
 */
thin.core.AbstractBoxGroup.prototype.box_;


/**
 * @param {Element=} opt_element
 * @param {string=} opt_classId
 * @private
 */
thin.core.AbstractBoxGroup.prototype.createBox_ = function(
      opt_element, opt_classId) {

  var layout = this.getLayout();
  var element = opt_element || layout.createSvgElement('rect');

  if (goog.isString(opt_classId)) {
    layout.setElementAttributes(element, {
      'class': opt_classId
    });
  }

  return new thin.core.Box(element, layout, null, null);
};


/**
 * @param {number} left
 */
thin.core.AbstractBoxGroup.prototype.setLeft = function(left) {
  left = thin.numberWithPrecision(left - this.getParentTransLateX());
  this.left_ = left;
  this.getLayout().setElementAttributes(this.getElement(), {
    'x-left': left
  });
  this.box_.setLeft(left);
};


/**
 * @param {number} top
 */
thin.core.AbstractBoxGroup.prototype.setTop = function(top) {
  top = thin.numberWithPrecision(top - this.getParentTransLateY());
  this.top_ = top;
  this.getLayout().setElementAttributes(this.getElement(), {
    'x-top': top
  });
  this.box_.setTop(top);
};


/**
 * @param {number} width
 */
thin.core.AbstractBoxGroup.prototype.setWidth = function(width) {
  width = thin.numberWithPrecision(width);
  this.width_ = width;
  this.getLayout().setElementAttributes(this.getElement(), {
    'x-width': width
  });
  this.box_.setWidth(width);
};


/**
 * @param {number} height
 */
thin.core.AbstractBoxGroup.prototype.setHeight = function(height) {
  height = thin.numberWithPrecision(height);
  this.height_ = height;
  this.getLayout().setElementAttributes(this.getElement(), {
    'x-height': height
  });
  this.box_.setHeight(height);
};


/**
 * @return {number|string}
 */
thin.core.AbstractBoxGroup.prototype.getStrokeWidth = function() {
  return this.box_.getStrokeWidth();
};


/** @inheritDoc */
thin.core.AbstractBoxGroup.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.box_.dispose();
  delete this.box_;
};
