/**
 * @fileoverview Menu item observing the filter text in a
 * {@link goog.ui.FilteredMenu}. The observer method is called when the filter
 * text changes and allows the menu item to update its content and state based
 * on the filter.
 *
*
 */

goog.provide('goog.ui.FilterObservingMenuItemRenderer');

goog.require('goog.ui.MenuItemRenderer');


/**
 * Default renderer for {@link goog.ui.FilterObservingMenuItem}s. Each item has
 * the following structure:
 *    <div class="goog-filterobsmenuitem"><div>...(content)...</div></div>
 *
 * @constructor
 * @extends {goog.ui.MenuItemRenderer}
 */
goog.ui.FilterObservingMenuItemRenderer = function() {
  goog.ui.MenuItemRenderer.call(this);
};
goog.inherits(goog.ui.FilterObservingMenuItemRenderer,
              goog.ui.MenuItemRenderer);
goog.addSingletonGetter(goog.ui.FilterObservingMenuItemRenderer);


/**
 * CSS class name the renderer applies to menu item elements.
 * @type {string}
 */
goog.ui.FilterObservingMenuItemRenderer.CSS_CLASS =
    goog.getCssName('goog-filterobsmenuitem');


/**
 * Returns the CSS class to be applied to menu items rendered using this
 * renderer.
 * @return {string} Renderer-specific CSS class.
 */
goog.ui.FilterObservingMenuItemRenderer.prototype.getCssClass = function() {
  return goog.ui.FilterObservingMenuItemRenderer.CSS_CLASS;
};
