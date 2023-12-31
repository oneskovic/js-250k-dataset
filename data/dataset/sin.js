'use strict';

module.exports = function (math, config) {
  var util = require('../../util/index'),

      BigNumber = math.type.BigNumber,
      Complex = require('../../type/Complex'),
      Unit = require('../../type/Unit'),
      collection = math.collection,

      isNumber = util.number.isNumber,
      isBoolean = util['boolean'].isBoolean,
      isComplex = Complex.isComplex,
      isUnit = Unit.isUnit,
      isCollection = collection.isCollection,

      bigSin = util.bignumber.cos_sin_sec_csc;

  
  math.sin = function sin(x) {
    if (arguments.length != 1) {
      throw new math.error.ArgumentsError('sin', arguments.length, 1);
    }

    if (isNumber(x)) {
      return Math.sin(x);
    }

    if (isComplex(x)) {
      return new Complex(
          Math.sin(x.re) * math.cosh(-x.im),
          Math.cos(x.re) * math.sinh(x.im)
      );
    }

    if (isUnit(x)) {
      if (!x.hasBase(Unit.BASE_UNITS.ANGLE)) {
        throw new TypeError ('Unit in function sin is no angle');
      }
      return Math.sin(x.value);
    }

    if (isCollection(x)) {
      // deep map collection, skip zeros since sin(0) = 0
      return collection.deepMap(x, sin, true);
    }

    if (isBoolean(x) || x === null) {
      return Math.sin(x);
    }

    if (x instanceof BigNumber) {
      return bigSin(x, BigNumber, 1, false);
    }

    throw new math.error.UnsupportedTypeError('sin', math['typeof'](x));
  };
};
