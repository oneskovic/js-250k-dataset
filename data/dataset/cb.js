'use strict';

var callable   = require('es5-ext/object/valid-callable')
  , nextTick   = require('next-tick')
  , deferred   = require('../../deferred');

deferred.extend('cb', function (cb) {
	if (cb == null) return this;
	callable(cb);
	nextTick(function () {
		if (this.resolved) {
			if (this.failed) cb(this.value);
			else cb(null, this.value);
		} else {
			if (!this.pending) this.pending = [];
			this.pending.push('cb', [cb]);
		}
	}.bind(this));
	return this;
}, function (cb) {
	if (this.failed) cb(this.value);
	else cb(null, this.value);
}, function (cb) {
	if (cb == null) return this;
	callable(cb);
	nextTick(function () {
		if (this.failed) cb(this.value);
		else cb(null, this.value);
	}.bind(this));
	return this;
});
