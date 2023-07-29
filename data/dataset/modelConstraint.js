/**
 * ModelConstraint constructor function.
 *
 * @api public
 */
var ModelConstraint = function() {
	this.id = null;
	this.cid = null;
	this.constraint = null;
}

/**
 * ModelConstraint set bean id.
 *
 * @param   {String} bean id
 * @api public
 */
ModelConstraint.prototype.setId = function(id) {
	this.id = id;
}

/**
 * ModelConstraint get bean id.
 *
 * @return   {String} bean id
 * @api public
 */
ModelConstraint.prototype.getId = function() {
	return this.id;
}

/**
 * ModelConstraint set constraint id.
 *
 * @param   {String} constraint id
 * @api public
 */
ModelConstraint.prototype.setCid = function(cid) {
	this.cid = cid;
}

/**
 * ModelConstraint get bean id.
 *
 * @return   {String} constraint id
 * @api public
 */
ModelConstraint.prototype.getCid = function() {
	return this.cid;
}

/**
 * ModelConstraint set constraint expression.
 *
 * @param   {String} constraint expression
 * @api public
 */
ModelConstraint.prototype.setConstraint = function(constraint) {
	this.constraint = constraint;
}

/**
 * ModelConstraint get constraint expression.
 *
 * @return   {String} constraint expression
 * @api public
 */
ModelConstraint.prototype.getConstraint = function() {
	return this.constraint;
}

module.exports = ModelConstraint;