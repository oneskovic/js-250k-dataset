'use strict';

var joola = require('../../joola');
var proto = {
  "key": {
    "name": "key",
    "description": "The key of the workspace",
    "type": "string",
    "required": true
  },
	"name": {
		"name": "name",
		"description": "The name of the workspace",
		"type": "string",
		"required": false
	},
  "description": {
    "name": "description",
    "description": "The description of the workspace",
    "type": "string",
    "required": false
  }
};

var workspace = module.exports = function (options) {
	this._proto = proto;
	this._super = {};
	for (var x in require('./base')) {
		this[x] = require('./base')[x];
		this._super[x] = require('./base')[x];
	}
	var validationErrors = this.validate(options);

	if (validationErrors.length > 0)
		throw new Error('Failed to verify new workspace, fields: [' + validationErrors.join(',') + ']');

	return options;
};

workspace.proto = proto;