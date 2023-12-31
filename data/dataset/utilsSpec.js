define(function(require, exports, module) {
  "use strict";
  var Utils;
  Utils = require("core/utils");
  return describe("Utils", function() {
    it("isType", function() {
      expect(Utils.isType(new Object(), "object")).toBe(true);
      return expect(Utils.isType(new String("abc"), "object")).toBe(false);
    });
    it("isObject", function() {
      expect(Utils.isObject(new Object())).toBe(true);
      expect(Utils.isObject({})).toBe(true);
      expect(Utils.isObject(new String("abc"))).toBe(false);
      expect(Utils.isObject("abc")).toBe(false);
      expect(Utils.isObject(new Number(123))).toBe(false);
      expect(Utils.isObject(123)).toBe(false);
      expect(Utils.isObject(new Array())).toBe(false);
      expect(Utils.isObject([])).toBe(false);
      expect(Utils.isObject(function() {})).toBe(false);
      expect(Utils.isObject(new RegExp("abc"))).toBe(false);
      return expect(Utils.isObject(/abc/)).toBe(false);
    });
    it("isString", function() {
      expect(Utils.isString(new Object())).toBe(false);
      expect(Utils.isString({})).toBe(false);
      expect(Utils.isString(new String("abc"))).toBe(true);
      expect(Utils.isString("abc")).toBe(true);
      expect(Utils.isString(new Number(123))).toBe(false);
      expect(Utils.isString(123)).toBe(false);
      expect(Utils.isString(new Array())).toBe(false);
      expect(Utils.isString([])).toBe(false);
      expect(Utils.isString(function() {})).toBe(false);
      expect(Utils.isString(new RegExp("abc"))).toBe(false);
      return expect(Utils.isString(/abc/)).toBe(false);
    });
    it("isNumber", function() {
      expect(Utils.isNumber(new Object())).toBe(false);
      expect(Utils.isNumber({})).toBe(false);
      expect(Utils.isNumber(new String("abc"))).toBe(false);
      expect(Utils.isNumber("abc")).toBe(false);
      expect(Utils.isNumber(new Number(123))).toBe(true);
      expect(Utils.isNumber(123)).toBe(true);
      expect(Utils.isNumber(new Array())).toBe(false);
      expect(Utils.isNumber([])).toBe(false);
      expect(Utils.isNumber(function() {})).toBe(false);
      expect(Utils.isNumber(new RegExp("abc"))).toBe(false);
      return expect(Utils.isNumber(/abc/)).toBe(false);
    });
    it("isArray", function() {
      expect(Utils.isArray(new Object())).toBe(false);
      expect(Utils.isArray({})).toBe(false);
      expect(Utils.isArray(new String("abc"))).toBe(false);
      expect(Utils.isArray("abc")).toBe(false);
      expect(Utils.isArray(new Number(123))).toBe(false);
      expect(Utils.isArray(123)).toBe(false);
      expect(Utils.isArray(new Array())).toBe(true);
      expect(Utils.isArray([])).toBe(true);
      expect(Utils.isArray(function() {})).toBe(false);
      expect(Utils.isArray(new RegExp("abc"))).toBe(false);
      return expect(Utils.isArray(/abc/)).toBe(false);
    });
    it("isFunction", function() {
      expect(Utils.isFunction(new Object())).toBe(false);
      expect(Utils.isFunction({})).toBe(false);
      expect(Utils.isFunction(new String("abc"))).toBe(false);
      expect(Utils.isFunction("abc")).toBe(false);
      expect(Utils.isFunction(new Number(123))).toBe(false);
      expect(Utils.isFunction(123)).toBe(false);
      expect(Utils.isFunction(new Array())).toBe(false);
      expect(Utils.isFunction([])).toBe(false);
      expect(Utils.isFunction(function() {})).toBe(true);
      expect(Utils.isFunction(new RegExp("abc"))).toBe(false);
      return expect(Utils.isFunction(/abc/)).toBe(false);
    });
    it("isRegex", function() {
      expect(Utils.isRegex(new Object())).toBe(false);
      expect(Utils.isRegex({})).toBe(false);
      expect(Utils.isRegex(new String("abc"))).toBe(false);
      expect(Utils.isRegex("abc")).toBe(false);
      expect(Utils.isRegex(new Number(123))).toBe(false);
      expect(Utils.isRegex(123)).toBe(false);
      expect(Utils.isRegex(new Array())).toBe(false);
      expect(Utils.isRegex([])).toBe(false);
      expect(Utils.isRegex(function() {})).toBe(false);
      expect(Utils.isRegex(new RegExp("abc"))).toBe(true);
      return expect(Utils.isRegex(/abc/)).toBe(true);
    });
    it("parse", function() {
      expect(Utils.parse()).toEqual([]);
      expect(Utils.parse("[{\"a\":1}]")).toEqual([
        {
          a: 1
        }
      ]);
      return expect(Utils.parse("[1,2,3]")).toEqual([1, 2, 3]);
    });
    it("stringify", function() {
      expect(Utils.stringify()).toEqual("[]");
      expect(Utils.stringify([
        {
          a: 1
        }
      ])).toEqual("[{\"a\":1}]");
      return expect(Utils.stringify([1, 2, 3])).toEqual("[1,2,3]");
    });
    it("isEqual", function() {
      expect(Utils.isEqual("aaa", "bbb")).toBe(false);
      expect(Utils.isEqual("aaa", "aaa")).toBe(true);
      expect(Utils.isEqual(1, 2)).toBe(false);
      expect(Utils.isEqual(1, 1)).toBe(true);
      expect(Utils.isEqual(0, 1)).toBe(false);
      expect(Utils.isEqual(new Date(2014, 9, 26), new Date(2014, 9, 26))).toBe(true);
      expect(Utils.isEqual(new Date(2014, 9, 27), new Date(2014, 9, 26))).toBe(false);
      expect(Utils.isEqual(true, true)).toBe(true);
      expect(Utils.isEqual(true, false)).toBe(false);
      expect(Utils.isEqual(null, void 0)).toBe(false);
      expect(Utils.isEqual(void 0, null)).toBe(false);
      return expect(Utils.isEqual(NaN, 1)).toBe(false);
    });
    it("keys", function() {
      return expect(Utils.keys([])).toEqual([]);
    });
    it("toUnicode&fromUnicode", function() {
      var fromUnicode, string, toUnicode;
      string = " 京东买奶茶——=+~！@#￥%……&*（）";
      toUnicode = Utils.toUnicode(string);
      fromUnicode = Utils.fromUnicode(toUnicode);
      return expect(fromUnicode).toEqual(string);
    });
    return it("Domain", function() {
      var url;
      url = "http://www.taobao.com:8080/test.html";
      expect(Utils.getDomain(url)).toEqual("www.taobao.com");
      return expect(Utils.getOrigin(url)).toEqual("http://www.taobao.com:8080");
    });
  });
});
