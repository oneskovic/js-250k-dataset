'use strict';

module.exports = StoreLoader;

/**
 * Creates instance of the store loader.
 * @param {ServiceLocator} $serviceLocator Locator to resolve stores.
 * @constructor
 */
function StoreLoader($serviceLocator) {
	this._serviceLocator = $serviceLocator;
	this._eventBus = $serviceLocator.resolve('eventBus');
}

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
StoreLoader.prototype._eventBus = null;

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @private
 */
StoreLoader.prototype._serviceLocator = null;

/**
 * Current set of loaded stores.
 * @type {Object}
 * @private
 */
StoreLoader.prototype._loadedStores = null;

/**
 * Loads all stores when it is in a browser.
 * @returns {Promise} Promise for nothing.
 */
StoreLoader.prototype.load = function () {
	var self = this,
		stores = {};
	this._serviceLocator.resolveAll('store')
		.forEach(function (store) {
			stores[store.name] = store;
			self._eventBus.emit('storeLoaded', stores[store.name]);
		});
	this._loadedStores = stores;
	this._eventBus.emit('allStoresLoaded', stores);
	return Promise.resolve(stores);
};

/**
 * Gets stores map by names.
 * @returns {Object} Map of stores by names.
 */
StoreLoader.prototype.getStoresByNames = function () {
	return this._loadedStores || {};
};