/**
 * @fileoverview Definition of the Gecko specific range wrapper.  Inherits most
 * functionality from W3CRange, but adds exceptions as necessary.
 *
 * DO NOT USE THIS FILE DIRECTLY.  Use goog.dom.Range instead.
 *
 * @author robbyw@google.com (Robby Walker)
 */


goog.provide('goog.dom.browserrange.GeckoRange');

goog.require('goog.dom.browserrange.W3cRange');


/**
 * The constructor for Gecko specific browser ranges.
 * @param {Range} range The range object.
 * @constructor
 * @extends {goog.dom.browserrange.W3cRange}
 */
goog.dom.browserrange.GeckoRange = function(range) {
  goog.dom.browserrange.W3cRange.call(this, range);
};
goog.inherits(goog.dom.browserrange.GeckoRange, goog.dom.browserrange.W3cRange);


/**
 * Creates a range object that selects the given node's text.
 * @param {Node} node The node to select.
 * @return {goog.dom.browserrange.GeckoRange} A Gecko range wrapper object.
 */
goog.dom.browserrange.GeckoRange.createFromNodeContents = function(node) {
  return new goog.dom.browserrange.GeckoRange(
      goog.dom.browserrange.W3cRange.getBrowserRangeForNode(node));
};


/**
 * Creates a range object that selects between the given nodes.
 * @param {Node} startNode The node to start with.
 * @param {number} startOffset The offset within the node to start.
 * @param {Node} endNode The node to end with.
 * @param {number} endOffset The offset within the node to end.
 * @return {goog.dom.browserrange.GeckoRange} A wrapper object.
 */
goog.dom.browserrange.GeckoRange.createFromNodes = function(startNode,
    startOffset, endNode, endOffset) {
  return new goog.dom.browserrange.GeckoRange(
      goog.dom.browserrange.W3cRange.getBrowserRangeForNodes(startNode,
          startOffset, endNode, endOffset));
};


/** @inheritDoc */
goog.dom.browserrange.GeckoRange.prototype.selectInternal = function(
    selection, reversed) {
  var anchorNode = reversed ? this.getEndNode() : this.getStartNode();
  var anchorOffset = reversed ? this.getEndOffset() : this.getStartOffset();
  var focusNode = reversed ? this.getStartNode() : this.getEndNode();
  var focusOffset = reversed ? this.getStartOffset() : this.getEndOffset();

  selection.collapse(anchorNode, anchorOffset);
  if (anchorNode != focusNode || anchorOffset != focusOffset) {
    selection.extend(focusNode, focusOffset);
  }
};
