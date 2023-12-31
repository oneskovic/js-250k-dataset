/**
 * @fileoverview A toolbar button control.
 *
 * @author attila@google.com (Attila Bodis)
 * @author ssaviano@google.com (Steven Saviano)
 */

goog.provide('goog.ui.ToolbarButton');

goog.require('goog.ui.Button');
goog.require('goog.ui.ToolbarButtonRenderer');
goog.require('goog.ui.registry');



/**
 * A button control for a toolbar.
 *
 * @param {goog.ui.ControlContent} content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Optional renderer used to
 *     render or decorate the button; defaults to
 *     {@link goog.ui.ToolbarButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM hepler, used for
 *     document interaction.
 * @constructor
 * @extends {goog.ui.Button}
 */
goog.ui.ToolbarButton = function(content, opt_renderer, opt_domHelper) {
  goog.ui.Button.call(this, content, opt_renderer ||
      goog.ui.ToolbarButtonRenderer.getInstance(), opt_domHelper);
};
goog.inherits(goog.ui.ToolbarButton, goog.ui.Button);


// Registers a decorator factory function for toolbar buttons.
goog.ui.registry.setDecoratorByClassName(
    goog.ui.ToolbarButtonRenderer.CSS_CLASS,
    function() {
      return new goog.ui.ToolbarButton(null);
    });
