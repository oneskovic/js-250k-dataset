goog.provide('goog.dom.AbstractMultiRange');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.AbstractRange');


/**
 * Creates a new multi range with no properties.  Do not use this
 * constructor: use one of the goog.dom.Range.createFrom* methods instead.
 * @constructor
 * @extends {goog.dom.AbstractRange}
 */
goog.dom.AbstractMultiRange = function() {
};
goog.inherits(goog.dom.AbstractMultiRange, goog.dom.AbstractRange);


/** @inheritDoc */
goog.dom.AbstractMultiRange.prototype.containsRange = function(
    otherRange, opt_allowPartial) {
  // TODO(user): This will incorrectly return false if two (or more) adjacent
  // elements are both in the control range, and are also in the text range
  // being compared to.
  var ranges = this.getTextRanges();
  var otherRanges = otherRange.getTextRanges();

  var fn = opt_allowPartial ? goog.array.some : goog.array.every;
  return fn(otherRanges, function(otherRange) {
    return goog.array.some(ranges, function(range) {
      return range.containsRange(otherRange, opt_allowPartial);
    });
  });
};


/** @inheritDoc */
goog.dom.AbstractMultiRange.prototype.insertNode = function(node, before) {
  if (before) {
    goog.dom.insertSiblingBefore(node, this.getStartNode());
  } else {
    goog.dom.insertSiblingAfter(node, this.getEndNode());
  }
  return node;
};


/** @inheritDoc */
goog.dom.AbstractMultiRange.prototype.surroundWithNodes = function(startNode,
    endNode) {
  this.insertNode(startNode, true);
  this.insertNode(endNode, false);
};
