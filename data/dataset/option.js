goog.provide('thin.ui.Option');

goog.require('goog.style');
goog.require('goog.ui.Option');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.ControlRenderer');
goog.require('goog.ui.MenuItemRenderer');
goog.require('goog.ui.Component.EventType');


/**
 * @param {goog.ui.ControlContent} content
 * @param {*=} opt_value
 * @param {goog.ui.MenuItemRenderer=} opt_renderer
 * @constructor
 * @extends {goog.ui.Option}
 */
thin.ui.Option = function(content, opt_value, opt_renderer) {
  goog.ui.MenuItem.call(this, content, opt_value, null, opt_renderer ||
    /** @type {goog.ui.MenuItemRenderer} */ (
      goog.ui.ControlRenderer.getCustomRenderer(
          goog.ui.MenuItemRenderer, thin.ui.getCssName('thin-option'))));
};
goog.inherits(thin.ui.Option, goog.ui.Option);


/** @inheritDoc */
thin.ui.Option.prototype.performActionInternal = function(e) {
  return this.dispatchEvent(goog.ui.Component.EventType.ACTION);
};


/** @inheritDoc */
thin.ui.Option.prototype.enterDocument = function() {
  thin.ui.Option.superClass_.enterDocument.call(this);
  
  this.getElement().setAttribute('title', 
      /** @type {string} */ (this.getContent()));
};