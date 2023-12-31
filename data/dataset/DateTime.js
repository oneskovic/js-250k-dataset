(function (window, global) {
  
var __isAMD = !!(typeof define === 'function' && define.amd),
    __isNode = (typeof exports === 'object'),
    __isWeb = !__isNode;

"use strict";
(function (factory) {
  if (typeof exports === 'object') {
    var nr = new (require('urequire').NodeRequirer) ('mindspace/utils/DateTime', module, __dirname, '.');
    module.exports = factory(nr.require, exports, module);
} else if (typeof define === 'function' && define.amd) { define(factory) } else throw new Error('uRequire: Loading UMD module as <script>, without `build.noLoaderUMD`');
}).call(this, function (require, exports, module) {
  

var buildTimeString = function (date, format) {
    format = format || "%h:%m:%s:%z";
    function pad(value, isMilliSeconds) {
      if (typeof isMilliSeconds === "undefined") {
        isMilliSeconds = false;
      }
      if (isMilliSeconds) {
        if (value < 10) {
          value = "00" + value;
        } else if (value < 100) {
          value = "0" + value;
        }
      }
      return value.toString().length < 2 ? "0" + value : value;
    }
    return format.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
      switch (fmtCode) {
      case "Y":
        return date.getFullYear();
      case "M":
        return pad(date.getMonth() + 1);
      case "d":
        return pad(date.getDate());
      case "h":
        return pad(date.getHours());
      case "m":
        return pad(date.getMinutes());
      case "s":
        return pad(date.getSeconds());
      case "z":
        return pad(date.getMilliseconds(), true);
      default:
        throw new Error("Unsupported format code: " + fmtCode);
      }
    });
  };
  return {
    formattedNow: function () {
      return buildTimeString(new Date());
    }
  };


})
}).call(this, (typeof exports === 'object' ? global : window), (typeof exports === 'object' ? global : window))