'use strict';

module.exports = UniversalMock;

var util = require('util'),
	Promise = require('promise/lib/core'),
	events = require('events');

util.inherits(UniversalMock, events.EventEmitter);

function UniversalMock(methodNames) {
	events.EventEmitter.call(this);
	this.setMaxListeners(0);
	var self = this;
	methodNames.forEach(function (name) {
		self[name] = function () {
			self.emit(name, arguments);
			return Promise.resolve();
		};
	});
}

UniversalMock.prototype.decorateMethod = function (name, method) {
	var old = this[name];
	if (typeof(old) !== 'function') {
		return;
	}
	this[name] = function () {
		old.apply(this, arguments);
		return method.apply(this, arguments);
	};
};