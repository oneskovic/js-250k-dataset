/**
 * @fileoverview Defines types that can be safely serialized and deserialized
 *     to/from JSON.
 *
 * @author rcc@google.com (Ryan Chan)
 */

goog.provide('e2e.otr.Storable');



/**
 * An interface for serializing to Uint8Array.
 * @constructor
 */
e2e.otr.Storable = function() {
  assert(this.constructor != e2e.otr.Storable);
  assert(goog.isFunction(this.constructor.unpack));
};


/**
 * Provides a JSON.stringify-able representation of the class.
 * @return {*} The serialized data.
 */
e2e.otr.Storable.prototype.pack = goog.abstractMethod;


/**
 * Instantiates a class from a parsed JSON representation.
 * @param {*} json The parsed JSON representation.
 * @return {!e2e.otr.Storable} The class instance.
 */
e2e.otr.Storable.unpack = goog.abstractMethod;
