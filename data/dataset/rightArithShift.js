'use strict';

module.exports = function (math, config) {
  var util = require('../../util/index'),

      BigNumber = math.type.BigNumber,
      Matrix = math.type.Matrix,
      Unit = require('../../type/Unit'),
      collection = math.collection,

      isBoolean = util['boolean'].isBoolean,
      isInteger = util.number.isInteger,
      isNumber = util.number.isNumber,
      isCollection = collection.isCollection,

      bigRightShift = util.bignumber.rightShift;

  
  math.rightArithShift = function rightArithShift(x, y) {
    if (arguments.length != 2) {
      throw new math.error.ArgumentsError('rightArithShift', arguments.length, 2);
    }

    if (isNumber(x)) {
      if (isNumber(y)) {
        if (!isInteger(x) || !isInteger(y)) {
          throw new Error('Parameters in function rightArithShift must be integer numbers');
        }

        return x >> y;
      }

      if (y instanceof BigNumber) {
        return bigRightShift(BigNumber.convert(x), y);
      }
    }
    if (isNumber(y)) {
      if (isFinite(y) && !isInteger(y)) {
        throw new Error('Parameters in function rightArithShift must be integer numbers');
      }

      if (x instanceof BigNumber) {
        if (x.isFinite() && !x.isInteger()) {
          throw new Error('Parameters in function rightArithShift must be integer numbers');
        }

        if (x.isNaN() || isNaN(y) || y < 0) {
          return new BigNumber(NaN);
        }
        if (y == Infinity) {
          if (x.isNegative()) {
            return new BigNumber(-1);
          }
          if (!x.isFinite()) {
            return new BigNumber(NaN);
          }
          return new BigNumber(0);
        }

        // Math.pow(2, y) is fully precise for y < 55, and fast
        if (y < 55) {
          return x.div(Math.pow(2, y) + '').floor();
        }

        y = BigNumber.convert(y);
        return bigRightShift(x, y);
      }
    }

    if (isCollection(x) && isNumber(y)) {
      return collection.deepMap2(x, y, rightArithShift);
    }

    if (isBoolean(x) || x === null) {
      return rightArithShift(+x, y);
    }
    if (isBoolean(y) || y === null) {
      return rightArithShift(x, +y);
    }

    if (x instanceof BigNumber) {
      if (y instanceof BigNumber) {
        return bigRightShift(x, y);
      }

      // downgrade to Number
      return rightArithShift(x.toNumber(), y);
    }
    if (y instanceof BigNumber) {
      // x is probably incompatible with BigNumber
      return rightArithShift(x, y.toNumber());
    }

    throw new math.error.UnsupportedTypeError('rightArithShift', math['typeof'](x), math['typeof'](y));
  };
};
