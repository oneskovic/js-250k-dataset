goog.provide('goog.ui.equation.EditorPane');

goog.require('goog.style');
goog.require('goog.ui.Component');



/**
 * An abstract equation editor tab pane.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
goog.ui.equation.EditorPane = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
};
goog.inherits(goog.ui.equation.EditorPane, goog.ui.Component);


/**
 * A link to any available help documentation to be displayed in a "Learn more"
 * link.  If not set through the equationeditor plugin constructor, the link
 * will be omitted.
 * @type {string}
 * @private
 */
goog.ui.equation.EditorPane.prototype.helpUrl_ = '';


/**
 * Sets the visibility of this tab pane.
 * @param {boolean} visible Whether this tab should become visible.
 */
goog.ui.equation.EditorPane.prototype.setVisible =
    function(visible) {
  goog.style.setElementShown(this.getElement(), visible);
};


/**
 * Sets the equation to show in this tab pane.
 * @param {string} equation The equation.
 */
goog.ui.equation.EditorPane.prototype.setEquation = goog.abstractMethod;


/**
 * @return {string} The equation shown in this tab pane.
 */
goog.ui.equation.EditorPane.prototype.getEquation = goog.abstractMethod;


/**
 * Sets the help link URL to show in this tab pane.
 * @param {string} url The help link URL.
 * @protected
 */
goog.ui.equation.EditorPane.prototype.setHelpUrl = function(url) {
  this.helpUrl_ = url;
};


/**
 * @return {string} The help link URL.
 * @protected
 */
goog.ui.equation.EditorPane.prototype.getHelpUrl = function() {
  return this.helpUrl_;
};


/**
 * @return {boolean} Whether the equation was modified.
 * @protected
 */
goog.ui.equation.EditorPane.prototype.isModified = goog.abstractMethod;

