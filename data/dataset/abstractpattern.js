goog.provide('goog.dom.pattern.AbstractPattern');

goog.require('goog.dom.pattern.MatchType');


/**
 * Base pattern class for DOM matching.
 *
 * @constructor
 */
goog.dom.pattern.AbstractPattern = function() {
};


/**
 * The first node matched by this pattern.
 * @type {Node}
 */
goog.dom.pattern.AbstractPattern.prototype.matchedNode = null;


/**
 * Reset any internal state this pattern keeps.
 */
goog.dom.pattern.AbstractPattern.prototype.reset = function() {
  // The base implementation does nothing.
};


/**
 * Test whether this pattern matches the given token.
 *
 * @param {Node} token Token to match against.
 * @param {goog.dom.TagWalkType} type The type of token.
 * @return {goog.dom.pattern.MatchType} {@code MATCH} if the pattern matches.
 */
goog.dom.pattern.AbstractPattern.prototype.matchToken = function(token, type) {
  return goog.dom.pattern.MatchType.NO_MATCH;
};
