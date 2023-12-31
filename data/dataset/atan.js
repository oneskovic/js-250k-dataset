'use strict';

module.exports = function (math) {
  var util = require('../../util/index'),

      BigNumber = math.type.BigNumber,
      Complex = require('../../type/Complex'),
      collection = math.collection,

      isNumber = util.number.isNumber,
      isBoolean = util['boolean'].isBoolean,
      isComplex = Complex.isComplex,
      isCollection = collection.isCollection,

      bigArcTan = util.bignumber.arctan_arccot;

  
  math.atan = function atan(x) {
    if (arguments.length != 1) {
      throw new math.error.ArgumentsError('atan', arguments.length, 1);
    }

    if (isNumber(x)) {
      return Math.atan(x);
    }

    if (isComplex(x)) {
      if (x.re == 0) {
        if (x.im == 1) {
          return new Complex(0, Infinity);
        }
        if (x.im == -1) {
          return new Complex(0, -Infinity);
        }
      }

      // atan(z) = 1/2 * i * (ln(1-iz) - ln(1+iz))
      var re = x.re;
      var im = x.im;
      var den = re * re + (1.0 - im) * (1.0 - im);

      var temp1 = new Complex(
          (1.0 - im * im - re * re) / den,
          (-2.0 * re) / den
      );
      var temp2 = math.log(temp1);

      return new Complex(
          -0.5 * temp2.im,
          0.5 * temp2.re
      );
    }

    if (isCollection(x)) {
      // deep map collection, skip zeros since atan(0) = 0
      return collection.deepMap(x, atan, true);
    }

    if (isBoolean(x) || x === null) {
      return Math.atan(x);
    }

    if (x instanceof BigNumber) {
      return bigArcTan(x, BigNumber, false);
    }

    throw new math.error.UnsupportedTypeError('atan', math['typeof'](x));
  };
};
