var createCallback = require('../functions/createCallback');

/**
 * This method is like `_.find` except that it returns the index of the first
 * element that passes the callback check, instead of the element itself.
 *
 * If a property name is provided for `callback` the created "_.pluck" style
 * callback will return the property value of the given element.
 *
 * If an object is provided for `callback` the created "_.where" style callback
 * will return `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Arrays
 * @param {Array} array The array to search.
 * @param {Function|Object|string} [callback=identity] The function called
 *  per iteration. If a property name or object is provided it will be used
 *  to create a "_.pluck" or "_.where" style callback, respectively.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney',  'age': 36, 'blocked': false },
 *   { 'name': 'fred',    'age': 40, 'blocked': true },
 *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
 * ];
 *
 * _.findIndex(characters, function(chr) {
 *   return chr.age < 20;
 * });
 * // => 2
 *
 * // using "_.where" callback shorthand
 * _.findIndex(characters, { 'age': 36 });
 * // => 0
 *
 * // using "_.pluck" callback shorthand
 * _.findIndex(characters, 'blocked');
 * // => 1
 */
function findIndex(array, callback, thisArg) {
  var index = -1,
      length = array ? array.length : 0;

  callback = createCallback(callback, thisArg, 3);
  while (++index < length) {
    if (callback(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = findIndex;
