var isIterateeCall = require('../internal/isIterateeCall'),
    keys = require('./keys');


var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an object composed of the inverted keys and values of `object`.
 * If `object` contains duplicate values, subsequent values overwrite property
 * assignments of previous values unless `multiValue` is `true`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to invert.
 * @param {boolean} [multiValue] Allow multiple values per key.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * _.invert({ 'first': 'fred', 'second': 'barney' });
 * // => { 'fred': 'first', 'barney': 'second' }
 *
 * // without `multiValue`
 * _.invert({ 'first': 'fred', 'second': 'barney', 'third': 'fred' });
 * // => { 'fred': 'third', 'barney': 'second' }
 *
 * // with `multiValue`
 * _.invert({ 'first': 'fred', 'second': 'barney', 'third': 'fred' }, true);
 * // => { 'fred': ['first', 'third'], 'barney': ['second'] }
 */
function invert(object, multiValue, guard) {
  if (guard && isIterateeCall(object, multiValue, guard)) {
    multiValue = null;
  }
  var index = -1,
      props = keys(object),
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (multiValue) {
      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }
    else {
      result[value] = key;
    }
  }
  return result;
}

module.exports = invert;
