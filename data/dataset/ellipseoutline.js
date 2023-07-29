goog.provide('thin.core.EllipseOutline');

goog.require('thin.core.Ellipse');
goog.require('thin.core.ModuleOutline');


/**
 * @param {Element} element
 * @param {thin.core.Layout} layout
 * @param {goog.graphics.Stroke?} stroke
 * @param {goog.graphics.Fill?} fill
 * @constructor
 * @extends {thin.core.Ellipse}
 */
thin.core.EllipseOutline = function(element, layout, stroke, fill) {
  thin.core.Ellipse.call(this, element, layout, stroke, fill);
};
goog.inherits(thin.core.EllipseOutline, thin.core.Ellipse);
goog.mixin(thin.core.EllipseOutline.prototype, thin.core.ModuleOutline.prototype);


/**
 * @return {thin.core.EllipseShape}
 */
thin.core.EllipseOutline.prototype.toShape = function() {
  return this.getLayout().createEllipseShape();
};


/**
 * @return {Object}
 */
thin.core.EllipseOutline.prototype.getInitShapeProperties = function() {
  return {
    RADIUS: this.getRadius(),
    CENTER: this.getCenterCoordinate(),
    BOUNDS: this.getBounds()
  };
};


/** @inheritDoc */
thin.core.EllipseOutline.prototype.disposeInternal = function() {
  thin.core.EllipseOutline.superClass_.disposeInternal.call(this);
  this.disposeInternalForOutline();
};