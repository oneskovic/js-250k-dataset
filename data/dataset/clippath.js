goog.provide('thin.core.ClipPath');

goog.require('goog.graphics.Element');
goog.require('thin.core.ModuleElement');


/**
 * @param {Element} element
 * @param {goog.graphics.Element} model
 * @param {goog.graphics.Element} target
 * @param {thin.core.Layout} layout
 * @constructor
 * @extends {goog.graphics.Element}
 */
thin.core.ClipPath = function(element, model, target, layout) {
  element.appendChild(model.getElement());
  goog.graphics.Element.call(this, element, layout);
  
  /**
   * @type {goog.graphics.Element}
   * @private
   */
  this.model_ = model;
  
  /**
   * @type {goog.graphics.Element}
   * @private
   */
  this.target_ = target;

  layout.setElementAttributes(target.getElement(), {
    'clip-path': 'url(#' + layout.getElementAttribute(element, 'id') + ')'
  });
};
goog.inherits(thin.core.ClipPath, goog.graphics.Element);


/** @inheritDoc */
thin.core.ClipPath.prototype.disposeInternal = function() {
  this.target_.getElement().removeAttribute('clip-path');
  this.model_.dispose();

  delete this.target_;
  delete this.model_;

  thin.core.ClipPath.superClass_.disposeInternal.call(this);
};