goog.provide('thin.ui.MenuSeparatorRenderer');

goog.require('goog.ui.MenuSeparatorRenderer');


/**
 * @constructor
 * @extends {goog.ui.MenuSeparatorRenderer}
 */
thin.ui.MenuSeparatorRenderer = function() {
  goog.ui.MenuSeparatorRenderer.call(this);
};
goog.inherits(thin.ui.MenuSeparatorRenderer, goog.ui.MenuSeparatorRenderer);
goog.addSingletonGetter(thin.ui.MenuSeparatorRenderer);


/**
 * @type {string}
 */
thin.ui.MenuSeparatorRenderer.CSS_CLASS = thin.ui.getCssName('thin-menuseparator');


/**
 * @return {string}
 */
thin.ui.MenuSeparatorRenderer.prototype.getCssClass = function() {
  return thin.ui.MenuSeparatorRenderer.CSS_CLASS;
};


/**
 * @param {goog.ui.Control} separator
 * @return {Element}
 */
thin.ui.MenuSeparatorRenderer.prototype.createDom = function(separator) {
  var cssClass = this.getCssClass();
  var domHelper = separator.getDomHelper();
  return domHelper.createDom('div', this.getClassNames(separator).join(' '), 
      domHelper.createDom('div', thin.ui.getCssName(cssClass, 'content'), 
          domHelper.createDom('hr', thin.ui.getCssName(cssClass, 'line'))));
};
