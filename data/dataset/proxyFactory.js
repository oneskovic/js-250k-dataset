var RequireUtil = require('../../util/requireUtil');
var DynamicAopProxy = require('./dynamicAopProxy');
var AdvisedSupport = require('./advisedSupport');
var Utils = require('../../util/utils');
var Util = RequireUtil.requireUtil();

/**
 * ProxyFactory constructor function.
 *
 * @param  {Object} target target object
 * @param  {Array}  interfaces proxy interfaces
 * @api public
 */
var ProxyFactory = function(target, interfaces) {
	this.beanFactory = null;
	AdvisedSupport.call(this);

	if (target) {
		this.setTarget(target);
	}

	if (Utils.checkArray(interfaces)) {
		this.setInterfaces(interfaces);
	}
}

Util.inherits(ProxyFactory, AdvisedSupport);

/**
 * ProxyFactory get dynamic proxy.
 *
 * @return  {Object} dynamic proxy object
 * @api public
 */
ProxyFactory.prototype.getProxy = function() {
	var beanFactory = this.getBeanFactory();
	var proxyObject = new DynamicAopProxy(this);
	return proxyObject;
}

module.exports = ProxyFactory;