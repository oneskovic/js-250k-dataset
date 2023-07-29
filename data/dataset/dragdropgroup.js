/**
 * @fileoverview Multiple Element Drag and Drop.
 *
 * Drag and drop implementation for sources/targets consisting of multiple
 * elements.
 *
*
 * @see ../demos/dragdrop.html
 */

goog.provide('goog.fx.DragDropGroup');

goog.require('goog.fx.AbstractDragDrop');
goog.require('goog.fx.DragDropItem');

/**
 * Drag/drop implementation for creating drag sources/drop targets consisting of
 * multiple HTML Elements (items). All items share the same drop target(s) but
 * can be dragged individually.
 *
 * @extends {goog.fx.AbstractDragDrop}
 * @constructor
 */
goog.fx.DragDropGroup = function() {
  goog.fx.AbstractDragDrop.call(this);
};
goog.inherits(goog.fx.DragDropGroup, goog.fx.AbstractDragDrop);


/**
 * Add item to drag object.
 *
 * @param {Element|string} element Dom Node, or string representation of node
 *     id, to be used as drag source/drop target.
 * @param {Object=} opt_data Data associated with the source/target.
 * @throws Error If no element argument is provided or if the type is
 *     invalid
 */
goog.fx.DragDropGroup.prototype.addItem = function(element, opt_data) {
  var item = new goog.fx.DragDropItem(element, opt_data);
  this.addDragDropItem(item);
};


/**
 * Add DragDropItem to drag object.
 *
 * @param {goog.fx.DragDropItem} item DragDropItem being added to the
 *     drag object.
 * @throws Error If no element argument is provided or if the type is
 *     invalid
 */
goog.fx.DragDropGroup.prototype.addDragDropItem = function(item) {
  item.setParent(this);
  this.items_.push(item);
  if (this.isInitialized()) {
    this.initItem(item);
  }
};


/**
 * Marks the supplied list of items as selected. A drag operation for any of the
 * selected items will affect all of them.
 *
 * @param {Array.<goog.fx.DragDropItem>} list List of items to select or null to
 *     clear selection.
 *
 * TODO(user): Not yet implemented.
 */
goog.fx.DragDropGroup.prototype.setSelection = function(list) {

};
