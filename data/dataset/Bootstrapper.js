'use strict';

var util = require('util'),
	path = require('path'),
	BrowserBundleBuilder = require('./BrowserBundleBuilder'),
	FileWatcher = require('./FileWatcher'),
	StoreFinder = require('./finders/StoreFinder'),
	ComponentFinder = require('./finders/ComponentFinder'),
	InjectionFinder = require('./finders/InjectionFinder'),
	BootstrapperBase = require('./base/BootstrapperBase'),
	Catberry = require('./Catberry'),
	routeDefinitions,
	Log4js = require('log4js');

// try to load list of URI mappers
try {
	routeDefinitions = require(path.join(process.cwd(), 'routes'));
} catch (e) {
	// nothing to do here
}
routeDefinitions = routeDefinitions || [];

var INFO_STORE_FOUND = 'Store "%s" found at %s',
	INFO_COMPONENT_FOUND = 'Component "%s" found at %s',
	INFO_BUNDLE_BUILT = 'Browser bundle has been built at %s (%d ms)';

util.inherits(Bootstrapper, BootstrapperBase);

/**
 * Creates new instance of server Catberry's bootstrapper.
 * @constructor
 * @extends BootstrapperBase
 */
function Bootstrapper() {
	BootstrapperBase.call(this, Catberry);
}

/**
 * Configures Catberry's locator.
 * @param {Object} configObject Config object.
 * @param {ServiceLocator} locator Service locator to configure.
 */
Bootstrapper.prototype.configure = function (configObject, locator) {
	BootstrapperBase.prototype.configure.call(this, configObject, locator);
	// if V8 still does not have promises then add it.
	if (!('Promise' in global)) {
		global.Promise = locator.resolve('promise');
	}

	locator.register(
		'browserBundleBuilder', BrowserBundleBuilder, configObject, true
	);
	locator.register('fileWatcher', FileWatcher, configObject, true);
	locator.register('storeFinder', StoreFinder, configObject, true);
	locator.register('componentFinder', ComponentFinder, configObject, true);
	locator.register('injectionFinder', InjectionFinder, configObject, true);

	var logger = Log4js.getLogger('catberry');
	locator.registerInstance('logger', logger);
	process.on('uncaughtException', function (error) {
		logger.fatal(error);
	});

	var eventBus = locator.resolve('eventBus');
	this._wrapEventsWithLogger(eventBus, logger);

	routeDefinitions.forEach(function (routeDefinition) {
		locator.registerInstance('routeDefinition', routeDefinition);
	});
};

/**
 * Wraps event bus with log messages.
 * @param {EventEmitter} eventBus Event emitter that implements event bus.
 * @param {Logger} logger Logger to write messages.
 * @protected
 */
Bootstrapper.prototype._wrapEventsWithLogger = function (eventBus, logger) {
	BootstrapperBase.prototype._wrapEventsWithLogger
		.call(this, eventBus, logger);

	eventBus
		.on('storeFound', function (args) {
			logger.info(util.format(INFO_STORE_FOUND,
				args.name, args.path
			));
		})
		.on('componentFound', function (args) {
			logger.info(util.format(INFO_COMPONENT_FOUND,
				args.name, args.path
			));
		})
		.on('bundleBuilt', function (args) {
			logger.info(util.format(INFO_BUNDLE_BUILT, args.path, args.time));
		});
};

module.exports = new Bootstrapper();