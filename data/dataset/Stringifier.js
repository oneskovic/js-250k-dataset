'use strict';

var util = require('../util');
var Transform = util.stream.Transform;

module.exports = Stringifier;

util.inherits(Stringifier, Transform);

function Stringifier(options) {
  options = options || {};

  Transform.call(this, options);

  this._writableState.objectMode = true;
  this._header = options.header !== undefined ? options.header : '[';
  this._footer = options.footer !== undefined ? options.footer : ']';
  this._seperator = options.seperator !== undefined ? options.seperator : ',';
  this._stringify = options.stringify || JSON.stringify;
  this._map = undefined;
  if (util.isFunction(options.map)) {
    this._map = options.map;
  }
  this._first = true;
}

Stringifier.prototype._transform = function _transform(thing, encoding, done) {
  if (util.isArray(thing) && thing.length) {
    this.push(this.transformRows(thing));
  } else {
    this.push(this.transformRow(thing));
  }
  done();
};

Stringifier.prototype._flush = function _flush(done) {
  if (this._first) {
    this.push(this._header + this._footer);
  } else {
    this.push(this._footer);
  }
  done(null);
};

Stringifier.prototype.transformRows = function transformRows(rows) {
  if (this._map) {
    rows = rows.map(this._map);
  }
  var str = this._first ? this._header : this._seperator;
  this._first = false;
  for (var i = 0; i < rows.length; i++) {
    if (i > 0) {
      str += this._seperator;
    }
    str += this._stringify(rows[i]);
  }
  return str;
};

Stringifier.prototype.transformRow = function transformRow(row) {
  if (this._map) {
    row = this._map(row);
  }
  if (this._first) {
    this._first = false;
    return this._header + this._stringify(row);
  }
  return this._seperator + this._stringify(row);
};