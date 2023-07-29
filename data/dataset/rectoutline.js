goog.provide('thin.core.RectOutline');

goog.require('thin.core.Rect');
goog.require('thin.core.ModuleOutline');


/**
 * @param {Element} element
 * @param {thin.core.Layout} layout
 * @param {goog.graphics.Stroke?} stroke
 * @param {goog.graphics.Fill?} fill
 * @constructor
 * @extends {thin.core.Rect}
 */
thin.core.RectOutline = function(element, layout, stroke, fill) {
  thin.core.Rect.call(this, element, layout, stroke, fill);
};
goog.inherits(thin.core.RectOutline, thin.core.Rect);
goog.mixin(thin.core.RectOutline.prototype, thin.core.ModuleOutline.prototype);


/**
 * @return {thin.core.RectShape}
 */
thin.core.RectOutline.prototype.toShape = function() {
  return this.getLayout().createRectShape();
};


/**
 * @return {Object}
 */
thin.core.RectOutline.prototype.getInitShapeProperties = function() {
  return {
    BOUNDS: this.getBounds()
  };
};


/** @inheritDoc */
thin.core.RectOutline.prototype.disposeInternal = function() {
  thin.core.RectOutline.superClass_.disposeInternal.call(this);
  this.disposeInternalForOutline();
};