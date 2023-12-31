/** `Object#toString` result shortcuts */
var argsClass = '[object Arguments]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
 * @example
 *
 * (function() { return _.isArguments(arguments); })(1, 2, 3);
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return value && typeof value == 'object' && typeof value.length == 'number' &&
    toString.call(value) == argsClass || false;
}
// fallback for browsers that can't detect `arguments` objects by [[Class]]
if (!isArguments(arguments)) {
  isArguments = function(value) {
    return value && typeof value == 'object' && typeof value.length == 'number' &&
      hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee') || false;
  };
}

module.exports = isArguments;
