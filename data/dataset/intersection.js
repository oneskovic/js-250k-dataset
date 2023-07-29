var baseIndexOf = require('../internals/baseIndexOf'),
    cacheIndexOf = require('../internals/cacheIndexOf'),
    createCache = require('../internals/createCache'),
    getArray = require('../internals/getArray'),
    isArguments = require('../objects/isArguments'),
    isArray = require('../objects/isArray'),
    largeArraySize = require('../internals/largeArraySize'),
    releaseArray = require('../internals/releaseArray'),
    releaseObject = require('../internals/releaseObject');

/**
 * Creates an array of unique values present in all provided arrays using
 * strict equality for comparisons, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @category Arrays
 * @param {...Array} [array] The arrays to inspect.
 * @returns {Array} Returns an array of shared values.
 * @example
 *
 * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
 * // => [1, 2]
 */
function intersection() {
  var args = [],
      argsIndex = -1,
      argsLength = arguments.length,
      caches = getArray(),
      indexOf = baseIndexOf,
      trustIndexOf = indexOf === baseIndexOf,
      seen = getArray();

  while (++argsIndex < argsLength) {
    var value = arguments[argsIndex];
    if (isArray(value) || isArguments(value)) {
      args.push(value);
      caches.push(trustIndexOf && value.length >= largeArraySize &&
        createCache(argsIndex ? args[argsIndex] : seen));
    }
  }
  var array = args[0],
      index = -1,
      length = array ? array.length : 0,
      result = [];

  outer:
  while (++index < length) {
    var cache = caches[0];
    value = array[index];

    if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
      argsIndex = argsLength;
      (cache || seen).push(value);
      while (--argsIndex) {
        cache = caches[argsIndex];
        if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
          continue outer;
        }
      }
      result.push(value);
    }
  }
  while (argsLength--) {
    cache = caches[argsLength];
    if (cache) {
      releaseObject(cache);
    }
  }
  releaseArray(caches);
  releaseArray(seen);
  return result;
}

module.exports = intersection;
