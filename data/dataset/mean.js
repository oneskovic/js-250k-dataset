'use strict';

module.exports = function (math) {
  var Matrix = math.type.Matrix,
      collection = math.collection,

      isCollection = collection.isCollection,

      size = require('../../util/array').size,
      isArray = Array.isArray;

  
  math.mean = function mean(args) {
    if (arguments.length == 0) {
      throw new SyntaxError('Function mean requires one or more parameters (0 provided)');
    }

    if (isCollection(args)) {
      if (arguments.length == 1) {
        // mean([a, b, c, d, ...])
        return _mean(args);
      }
      else if (arguments.length == 2) {
        // mean([a, b, c, d, ...], dim)
        return _nmean(arguments[0], arguments[1]);
      }
      else {
        throw new SyntaxError('Wrong number of parameters');
      }
    }
    else {
      // mean(a, b, c, d, ...)
      return _mean(arguments);
    }
  };

  /**
   * Calculate the mean value in an n-dimensional array, returning a
   * n-1 dimensional array
   * @param {Array} array
   * @param {Number} dim
   * @return {Number} mean
   * @private
   */
  function _nmean(array, dim){
	  var sum = collection.reduce(array, dim, math.add);
    var s = isArray(array) ? size(array) : array.size();
    return math.divide(sum, s[dim]);
  }

  /**
   * Recursively calculate the mean value in an n-dimensional array
   * @param {Array} array
   * @return {Number} mean
   * @private
   */
  function _mean(array) {
    var sum = 0;
    var num = 0;

    collection.deepForEach(array, function (value) {
      sum = math.add(sum, value);
      num++;
    });

    if (num === 0) {
      throw new Error('Cannot calculate mean of an empty array');
    }

    return math.divide(sum, num);
  }
};
