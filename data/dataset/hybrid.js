/**
 * @fileoverview Utility to attempt native JSON processing, falling back to
 *     goog.json if not available.
 *
 *     This is intended as a drop-in for current users of goog.json who want
 *     to take advantage of native JSON if present.
 *
 * @author nnaze@google.com (Nathan Naze)
 */

goog.provide('goog.json.hybrid');

goog.require('goog.asserts');
goog.require('goog.json');


/**
 * Attempts to serialize the JSON string natively, falling back to
 * {@code goog.json.serialize} if unsuccessful.
 * @param {!Object} obj JavaScript object to serialize to JSON.
 * @return {string} Resulting JSON string.
 */
goog.json.hybrid.stringify = function(obj) {
  if (goog.global.JSON) {
    try {
      return goog.global.JSON.stringify(obj);
    } catch (e) {
      // Native serialization failed.  Fall through to retry with
      // goog.json.serialize.
    }
  }

  return goog.json.serialize(obj);
};


/**
 * Attempts to parse the JSON string natively, falling back to
 * the supplied {@code fallbackParser} if unsuccessful.
 * @param {string} jsonString JSON string to parse.
 * @param {function(string):Object} fallbackParser Fallback JSON parser used
 *     if native
 * @return {!Object} Resulting JSON object.
 * @private
 */
goog.json.hybrid.parse_ = function(jsonString, fallbackParser) {
  if (goog.global.JSON) {
    try {
      var obj = goog.global.JSON.parse(jsonString);
      goog.asserts.assertObject(obj);
      return obj;
    } catch (e) {
      // Native parse failed.  Fall through to retry with goog.json.unsafeParse.
    }
  }

  var obj = fallbackParser(jsonString);
  goog.asserts.assert(obj);
  return obj;
};


/**
 * Attempts to parse the JSON string natively, falling back to
 * {@code goog.json.parse} if unsuccessful.
 * @param {string} jsonString JSON string to parse.
 * @return {!Object} Resulting JSON object.
 */
goog.json.hybrid.parse = function(jsonString) {
  return goog.json.hybrid.parse_(jsonString, goog.json.parse);
};


/**
 * Attempts to parse the JSON string natively, falling back to
 * {@code goog.json.unsafeParse} if unsuccessful.
 * @param {string} jsonString JSON string to parse.
 * @return {!Object} Resulting JSON object.
 */
goog.json.hybrid.unsafeParse = function(jsonString) {
  return goog.json.hybrid.parse_(jsonString, goog.json.unsafeParse);
};
