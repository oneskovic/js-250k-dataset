/*global module*/

// Ensure "define" is defined in node.js in the absence of require.js
// See: https://github.com/jrburke/amdefine
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function () {
  var LifeCycle = function () {
    this.started = false;
  };

  LifeCycle.prototype.start = function (callback) {
    callback = callback || function () {};
    this.started = true;
    return callback();
  };

  LifeCycle.prototype.stop = function (callback) {
    callback = callback || function () {};
    this.started = false;
    return callback();
  };

  LifeCycle.prototype.isStarted = function () {
    return this.started;
  };

  return LifeCycle;
});