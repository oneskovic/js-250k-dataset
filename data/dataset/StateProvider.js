'use strict';

module.exports = StateProvider;

var routeHelper = require('./../helpers/routeHelper');

/**
 * Create new instance of the state provider.
 * @param {ServiceLocator} $serviceLocator Service locator
 * to resolve URI mappers.
 * @constructor
 */
function StateProvider($serviceLocator) {
	this._uriMappers = getUriMappers($serviceLocator);
}

/**
 * Current list of URI mappers.
 * @type {Array}
 * @private
 */
StateProvider.prototype._uriMappers = null;

/**
 * Gets state by specified location URI.
 * @param {URI} location URI location.
 * @returns {Object} State object.
 */
StateProvider.prototype.getStateByUri = function (location) {
	if (this._uriMappers.length === 0) {
		return {};
	}

	var shortLocation = routeHelper.removeEndSlash(location.path),
		state = null;
	if (location.query) {
		shortLocation += '?' + location.query.toString();
	}

	this._uriMappers.some(function (mapper) {
		if (mapper.expression.test(shortLocation)) {
			state = mapper.map(shortLocation) || {};
			return true;
		}
		return false;
	});

	if (!state) {
		return null;
	}

	// make state object immutable
	Object.keys(state)
		.forEach(function (storeName) {
			Object.freeze(state[storeName]);
		});
	Object.freeze(state);

	return state;
};

/**
 * Gets list of URI mappers.
 * @param {ServiceLocator} serviceLocator Service locator to get route
 * definitions.
 * @returns {Array} List of URI mappers.
 */
function getUriMappers(serviceLocator) {
	var uriMappers = [];

	serviceLocator
		.resolveAll('routeDefinition')
		.forEach(function (route) {
			// just colon-parametrized string
			if (typeof(route) === 'string') {
				uriMappers.push(routeHelper.getUriMapperByRoute(route));
				return;
			}

			// extended colon-parametrized mapper
			if (typeof(route) === 'object' &&
				(typeof(route.expression) === 'string') &&
				(route.map instanceof Function)) {
				var mapper = routeHelper.getUriMapperByRoute(route.expression);
				uriMappers.push({
					expression: mapper.expression,
					map: function (uriPath) {
						var state = mapper.map(uriPath);
						return route.map(state);
					}
				});
				return;
			}

			// regular expression mapper
			if (typeof(route) === 'object' &&
				(route.expression instanceof RegExp) &&
				(route.map instanceof Function)) {
				uriMappers.push(route);
			}
		});
	return uriMappers;
}