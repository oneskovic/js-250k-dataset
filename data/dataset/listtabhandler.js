/**
 * @fileoverview Editor plugin to handle tab keys in lists to indent and
 * outdent.
 *
 * @author robbyw@google.com (Robby Walker)
*
 */

goog.provide('goog.editor.plugins.ListTabHandler');

goog.require('goog.dom.TagName');
goog.require('goog.editor.Command');
goog.require('goog.editor.plugins.AbstractTabHandler');


/**
 * Plugin to handle tab keys in lists to indent and outdent.
 * @constructor
 * @extends {goog.editor.plugins.AbstractTabHandler}
 */
goog.editor.plugins.ListTabHandler = function() {
  goog.editor.plugins.AbstractTabHandler.call(this);
};
goog.inherits(goog.editor.plugins.ListTabHandler,
    goog.editor.plugins.AbstractTabHandler);


/** @inheritDoc */
goog.editor.plugins.ListTabHandler.prototype.getTrogClassId = function() {
  return 'ListTabHandler';
};


/** @inheritDoc */
goog.editor.plugins.ListTabHandler.prototype.handleTabKey = function(e) {
  var range = this.fieldObject.getRange();
  if (goog.dom.getAncestorByTagNameAndClass(range.getContainerElement(),
                                            goog.dom.TagName.LI) ||
      goog.iter.some(range, function(node) {
        return node.tagName == goog.dom.TagName.LI;
      })) {
    this.fieldObject.execCommand(e.shiftKey ?
        goog.editor.Command.OUTDENT :
        goog.editor.Command.INDENT);
    e.preventDefault();
    return true;
  }

  return false;
};

