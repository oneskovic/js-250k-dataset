var Utils = require('../../util/utils');
var Util = require('util');

/**
 * MaxConstraint constructor function.
 *
 * @api public
 */
var MaxConstraint = function() {
	this.$cid = "max";
	this.message = "[MaxConstraint] key: %s value %d is bigger than the max value: %d";
	this.max = null;
}

/**
 * MaxConstraint validate function.
 *
 * @param   {String} key
 * @param   {Number} value
 * @return  {Object} Error object
 * @api public
 */
MaxConstraint.prototype.validate = function(key, value) {
	var message = this.message;
	var max = this.max;

	if (!Utils.checkNumber(max)) {
		max = parseInt(max);
		this.max = max;
	}

	if (!Utils.checkNumber(value)) {
		return;
	}

	if (value > max) {
		return new Error(Util.format(message, key, value, max));
	}
}

module.exports = MaxConstraint;