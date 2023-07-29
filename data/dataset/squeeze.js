'use strict';

module.exports = function (math) {
  var util = require('../../util/index'),

      Matrix = math.type.Matrix,

      object = util.object,
      array = util.array,
      isArray = Array.isArray;

  
  math.squeeze = function squeeze (x) {
    if (arguments.length != 1) {
      throw new math.error.ArgumentsError('squeeze', arguments.length, 1);
    }

    if (isArray(x)) {
      return array.squeeze(object.clone(x));
    }
    else if (x instanceof Matrix) {
      var res = array.squeeze(x.toArray());
      return isArray(res) ? math.matrix(res) : res;
    }
    else {
      // scalar
      return object.clone(x);
    }
  };
};
