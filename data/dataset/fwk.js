/**
 * Top-Level fwk Library
 */

var base = require("./base.js");
var cache = require("./cache.js");
var b64 = require("./b64.js");
var lock = require("./lock.js");
var cfg = require("./cfg.js");
var factory = require("./factory.js");
var async = require('async');

exports.method = base.method;
exports.getter = base.getter;
exports.setter = base.setter;
exports.responds = base.responds;
exports.remove = base.remove;
exports.unique = base.unique;
exports.shallow = base.shallow;
exports.clone = base.clone;
exports.mkhash = base.mkhash;
exports.forEach = base.forEach;

exports.cache = cache.cache;

exports.lock = lock.lock;

exports.async = async;

exports.populateConfig = cfg.populateConfig;
exports.baseConfig = cfg.baseConfig;

exports.b64encode = b64.b64encode;
exports.b64decode = b64.b64decode;

exports.factory = factory.factory;
