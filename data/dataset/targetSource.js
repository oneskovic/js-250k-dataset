/**
 * TargetSource constructor function.
 *
 * @param  {String} beanName
 * @param  {Object} target target object
 * @api public
 */
var TargetSource = function(beanName, target) {
	this.beanName = beanName;
	this.target = target;
}

/**
 * TargetSource set beanName.
 *
 * @param  {String} beanName
 * @api public
 */
TargetSource.prototype.setBeanName = function(beanName) {
	this.beanName = beanName;
}

/**
 * TargetSource get beanName.
 *
 * @return  {String} beanName
 * @api public
 */
TargetSource.prototype.getBeanName = function() {
	return this.beanName;
}

/**
 * TargetSource set target.
 *
 * @param  {Object} target target object
 * @api public
 */
TargetSource.prototype.setTarget = function(target) {
	this.target = target;
}

/**
 * TargetSource get target.
 *
 * @return  {Object} target object
 * @api public
 */
TargetSource.prototype.getTarget = function() {
	return this.target;
}

TargetSource.prototype.releaseTarget = function() {

}

module.exports = TargetSource;