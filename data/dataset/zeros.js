'use strict';

module.exports = function (math, config) {
  var util = require('../../util/index'),

      BigNumber = math.type.BigNumber,
      Matrix = math.type.Matrix,
      collection = math.collection,

      array = util.array,
      isNumber = util.number.isNumber,
      isInteger = util.number.isInteger,
      isString = util.string.isString,
      isArray = Array.isArray;

  
  math.zeros = function zeros (size) {
    // process arguments
    var args = collection.argsToArray(arguments);    
    // matrix storage format
    var f;
    // check format was provided
    if (args.length > 0 && isString(args[args.length - 1])) {
      // set format
      f = args[args.length - 1];
      // re-process arguments, ignore last one
      args = collection.argsToArray(args.slice(0, args.length - 1));
    }
    else if (size instanceof Matrix) {
      // use matrix format
      f = size.storage();
    }
    else if (!isArray(size) && config.matrix === 'matrix') {
      // use default matrix format
      f = 'default';
    }

    // convert arguments from bignumber to numbers if needed
    var asBigNumber = false;
    // map arguments & validate
    args = args.map(function (value) {
      // check it is a big number
      if (value instanceof BigNumber) {
        // set flag
        asBigNumber = true;
        // convert it
        value = value.toNumber();
      }
      // validate arguments
      if (!isNumber(value) || !isInteger(value) || value < 0) {
        throw new Error('Parameters in function eye must be positive integers');
      } 
      return value;
    });
        
    // default value
    var defaultValue = asBigNumber ? new BigNumber(0) : 0;
    
    // check we need to return a matrix
    if (f) {
      // create empty matrix
      var m = math.matrix(f);
      // check we need to resize matrix
      if (args.length > 0) {
        // resize it to correct size
        return m.resize(args, defaultValue);
      }
      return m;
    }
    // empty array
    var res = [];
    // check we need to resize array
    if (args.length > 0) {
      // resize array
      return array.resize(res, args, defaultValue);
    }
    return res;
  };
};
