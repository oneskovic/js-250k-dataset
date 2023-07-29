goog.provide('thin.core.ActionLayer');

goog.require('thin.core.Layer');



thin.core.ActionLayer = function(layout, opt_cursor) {
  goog.base(this, layout, opt_cursor);
};
goog.inherits(thin.core.ActionLayer, thin.core.Layer);


/**
 * @type {thin.core.SvgDrawer}
 * @private
 */
thin.core.ActionLayer.prototype.drawer_;


/**
 * @param {thin.core.SvgDrawer} drawer
 */
thin.core.ActionLayer.prototype.setDrawer = function(drawer) {
  this.drawer_ = drawer;
};


/**
 * @return {thin.core.SvgDrawer}
 */
thin.core.ActionLayer.prototype.getDrawer = function() {
  return this.drawer_;
};


/** @inheritDoc */
thin.core.ActionLayer.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');

  if (this.drawer_) {
    this.drawer_.dispose();
    delete this.drawer_;
  }
};
