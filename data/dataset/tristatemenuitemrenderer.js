/**
 * @fileoverview Renderer for {@link goog.ui.TriStateMenuItem}s.
 *
 * @author eae@google.com (Emil A Eklund)
 */

goog.provide('goog.ui.TriStateMenuItemRenderer');

goog.require('goog.dom.classlist');
goog.require('goog.ui.MenuItemRenderer');



/**
 * Default renderer for {@link goog.ui.TriStateMenuItemRenderer}s. Each item has
 * the following structure:
 *    <div class="goog-tristatemenuitem">
 *        <div class="goog-tristatemenuitem-checkbox"></div>
 *        <div>...(content)...</div>
 *    </div>
 * @constructor
 * @extends {goog.ui.MenuItemRenderer}
 * @final
 */
goog.ui.TriStateMenuItemRenderer = function() {
  goog.ui.MenuItemRenderer.call(this);
};
goog.inherits(goog.ui.TriStateMenuItemRenderer, goog.ui.MenuItemRenderer);
goog.addSingletonGetter(goog.ui.TriStateMenuItemRenderer);


/**
 * CSS class name the renderer applies to menu item elements.
 * @type {string}
 */
goog.ui.TriStateMenuItemRenderer.CSS_CLASS =
    goog.getCssName('goog-tristatemenuitem');


/**
 * Overrides {@link goog.ui.ControlRenderer#decorate} by initializing the
 * menu item to checkable based on whether the element to be decorated has
 * extra styling indicating that it should be.
 * @param {goog.ui.Control} item goog.ui.MenuItem to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 * @override
 */
goog.ui.TriStateMenuItemRenderer.prototype.decorate = function(item, element) {
  element = goog.ui.TriStateMenuItemRenderer.superClass_.decorate.call(this,
      item, element);
  this.setSelectable(item, element, true);

  if (goog.dom.classlist.contains(element,
      goog.getCssName(this.getCssClass(), 'fully-checked'))) {
    item.setCheckedState(goog.ui.TriStateMenuItem.State.FULLY_CHECKED);
  } else if (goog.dom.classlist.contains(element,
      goog.getCssName(this.getCssClass(), 'partially-checked'))) {
    item.setCheckedState(goog.ui.TriStateMenuItem.State.PARTIALLY_CHECKED);
  } else {
    item.setCheckedState(goog.ui.TriStateMenuItem.State.NOT_CHECKED);
  }

  return element;
};


/** @override */
goog.ui.TriStateMenuItemRenderer.prototype.getCssClass = function() {
  return goog.ui.TriStateMenuItemRenderer.CSS_CLASS;
};
