'use strict';

var common = require('../common');
var ParameterMode = common.ParameterMode;

exports.read = read;
exports.getArgumentCount = getArgumentCount;

function read(part) {
  var params = new Array(part.argumentCount);
  _read.call(params, part.buffer, 0);
  return params;
}

function _read(buffer, offset) {
  /* jshint validthis:true */

  offset = offset || 0;
  var params = this;
  var textOffset = offset + params.length * 16;
  for (var i = 0; i < params.length; i++) {
    params[i] = new Parameter(buffer, offset, textOffset);
    offset += 16;
  }
  return offset;
}

function getArgumentCount(params) {
  /* jshint unused:false */
  return params.length;
}

function Parameter(buffer, offset, textOffset) {
  this.mode = buffer[offset];
  this.dataType = buffer[offset + 1];
  this.ioType = buffer[offset + 2];
  var nameOffset = buffer.readInt32LE(offset + 4);
  if (nameOffset < 0) {
    this.name = undefined;
  } else {
    var start = textOffset + nameOffset;
    var length = buffer[start];
    start += 1;
    this.name = buffer.toString('utf-8', start, start + length);
  }
  this.length = buffer.readInt16LE(offset + 8);
  this.fraction = buffer.readInt16LE(offset + 10);
}

Parameter.prototype.isReadOnly = function isReadOnly() {
  /* jshint bitwise:false */
  return !!(this.mode & ParameterMode.READONLY);
};

Parameter.prototype.isMandatory = function isMandatory() {
  /* jshint bitwise:false */
  return !!(this.mode & ParameterMode.MANDATORY);
};

Parameter.prototype.isAutoIncrement = function isAutoIncrement() {
  /* jshint bitwise:false */
  return !!(this.mode & ParameterMode.AUTO_INCREMENT);
};