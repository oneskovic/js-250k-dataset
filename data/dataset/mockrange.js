/**
 * @fileoverview LooseMock of goog.dom.AbstractRange.
 *
*
 */

goog.provide('goog.testing.MockRange');

goog.require('goog.dom.AbstractRange');
goog.require('goog.testing.LooseMock');



/**
 * LooseMock of goog.dom.AbstractRange. Useful because the mock framework cannot
 * simply create a mock out of an abstract class, and cannot create a mock out
 * of classes that implements __iterator__ because it relies on the default
 * behavior of iterating through all of an object's properties.
 * @constructor
 * @extends {goog.testing.LooseMock}
 */
goog.testing.MockRange = function() {
  goog.testing.LooseMock.call(this, goog.testing.MockRange.ConcreteRange_);
};
goog.inherits(goog.testing.MockRange, goog.testing.LooseMock);


// *** Private helper class ************************************************* //

/**
 * Concrete subclass of goog.dom.AbstractRange that simply sets the abstract
 * method __iterator__ to undefined so that javascript defaults to iterating
 * through all of the object's properties.
 * @constructor
 * @extends {goog.dom.AbstractRange}
 * @private
 */
goog.testing.MockRange.ConcreteRange_ = function() {
  goog.dom.AbstractRange.call(this);
};
goog.inherits(goog.testing.MockRange.ConcreteRange_, goog.dom.AbstractRange);


/**
 * Undefine the iterator so the mock framework can loop through this class'
 * properties.
 * @type {undefined}
 * @override
 */
goog.testing.MockRange.ConcreteRange_.prototype.__iterator__ = undefined;
