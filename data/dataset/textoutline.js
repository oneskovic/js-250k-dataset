goog.provide('thin.core.TextOutline');

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
thin.core.TextOutline = function(element, layout, stroke, fill) {
  thin.core.Rect.call(this, element, layout, stroke, fill);
};
goog.inherits(thin.core.TextOutline, thin.core.Rect);
goog.mixin(thin.core.TextOutline.prototype, thin.core.ModuleOutline.prototype);


/**
 * @this {goog.graphics.Element}
 * @param {goog.math.Coordinate} scale
 * @param {goog.math.Coordinate} transLate
 * @param {boolean} isVertex
 */
thin.core.TextOutline.prototype.setBoundsByScale = function(scale, transLate, isVertex) {
  var scaleX = scale.x;
  var scaleY = scale.y;
  var deltaX = this.getLeft() - transLate.x;
  var deltaY = this.getTop() - transLate.y;
  var shape = this.getTargetShape();
  
  this.setBounds(new goog.math.Rect(
    thin.numberWithPrecision(this.getLeft() + ((deltaX * scaleX) - deltaX)),
    thin.numberWithPrecision(this.getTop() + ((deltaY * scaleY) - deltaY)),
    thin.numberWithPrecision(shape.getAllowWidth(this.getWidth() * scaleX)),
    thin.numberWithPrecision(shape.getAllowHeight(this.getHeight() * scaleY))));
};


/**
 * @return {thin.core.TextShape}
 */
thin.core.TextOutline.prototype.toShape = function() {
  return this.getLayout().createTextShape();
};


/**
 * @return {Object}
 */
thin.core.TextOutline.prototype.getInitShapeProperties = function() {
  var workspace = this.getLayout().getWorkspace();
  
  return {
    BOUNDS: this.getBounds(),
    BOLD: workspace.getUiStatusForBold(),
    ITALIC: workspace.getUiStatusForItalic(),
    UNDERLINE: workspace.getUiStatusForUnderlIne(),
    LINETHROUGH: workspace.getUiStatusForLineThrough(),
    FAMILY: workspace.getUiStatusForFontFamily(),
    ANCHOR: workspace.getUiStatusForHorizonAlignType(),
    SIZE: workspace.getUiStatusForFontSize()
  };
};


/** @inheritDoc */
thin.core.TextOutline.prototype.disposeInternal = function() {
  thin.core.TextOutline.superClass_.disposeInternal.call(this);
  this.disposeInternalForOutline();
};