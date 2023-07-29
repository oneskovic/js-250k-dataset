function printf() {
	
	var result = arguments[0];
	for (var i=1; i<arguments.length; i++)
		result = result.replace('%' + (i-1), arguments[i]);
	return result;
}

// wapam constants.
var WAPAMA_LOGLEVEL_TRACE = 5;
var WAPAMA_LOGLEVEL_DEBUG = 4;
var WAPAMA_LOGLEVEL_INFO = 3;
var WAPAMA_LOGLEVEL_WARN = 2;
var WAPAMA_LOGLEVEL_ERROR = 1;
var WAPAMA_LOGLEVEL_FATAL = 0;
if (!WAPAMA_LOGLEVEL) {
  var WAPAMA_LOGLEVEL = 1;
}
var WAPAMA_CONFIGURATION_DELAY = 100;
var WAPAMA_CONFIGURATION_WAIT_ATTEMPTS = 10;

if(!WAPAMA) var WAPAMA = {};

WAPAMA = Object.extend(WAPAMA, {

	PATH: WAPAMA.CONFIG.ROOT_PATH,

	alreadyLoaded: [],

	configrationRetries: 0,

	availablePlugins: [],

	/**
	 * The WAPAMA.Log logger.
	 */
	Log: {
	
		__appenders: [
			{ append: function(message) {
				if(typeof(console) !== 'undefined')
				console.log(message); }}
		],
	
		trace: function() {	if(WAPAMA_LOGLEVEL >= WAPAMA_LOGLEVEL_TRACE)
			WAPAMA.Log.__log('TRACE', arguments); },
		debug: function() { if(WAPAMA_LOGLEVEL >= WAPAMA_LOGLEVEL_DEBUG)
			WAPAMA.Log.__log('DEBUG', arguments); },
		info: function() { if(WAPAMA_LOGLEVEL >= WAPAMA_LOGLEVEL_INFO)
			WAPAMA.Log.__log('INFO', arguments); },
		warn: function() { if(WAPAMA_LOGLEVEL >= WAPAMA_LOGLEVEL_WARN)
			WAPAMA.Log.__log('WARN', arguments); },
		error: function() { if(WAPAMA_LOGLEVEL >= WAPAMA_LOGLEVEL_ERROR)
			WAPAMA.Log.__log('ERROR', arguments); },
		fatal: function() { if(WAPAMA_LOGLEVEL >= WAPAMA_LOGLEVEL_FATAL)
			WAPAMA.Log.__log('FATAL', arguments); },
		
		__log: function(prefix, messageParts) {
			
			messageParts[0] = (new Date()).getTime() + " "
				+ prefix + " " + messageParts[0];
			var message = printf.apply(null, messageParts);
			
			WAPAMA.Log.__appenders.each(function(appender) {
				appender.append(message);
			});
		},
		
		addAppender: function(appender) {
			WAPAMA.Log.__appenders.push(appender);
		}
	},

	/**
	 * First bootstrapping layer. The Wapama loading procedure begins. In this
	 * step, all preliminaries that are not in the responsibility of Wapama to be
	 * met have to be checked here, such as the existance of the prototpe
	 * library in the current execution environment. Failing to ensure that any
	 * preliminary condition is not met has to fail with an error.
	 */
	load: function() {
		
		// show loading window
		WAPAMA.UI.showLoadingWindow(WAPAMA.I18N.Wapama.pleaseWait);
				
		WAPAMA.Log.debug("Wapama begins loading procedure.");
		
		// check for prototype
		if( (typeof Prototype=='undefined') ||
			(typeof Element == 'undefined') ||
			(typeof Element.Methods=='undefined') ||
			parseFloat(Prototype.Version.split(".")[0] + "." +
				Prototype.Version.split(".")[1]) < 1.5)

			throw("Application requires the Prototype JavaScript framework >= 1.5.3");
		
		WAPAMA.Log.debug("Prototype > 1.5 found.");

		init();
	}

});

WAPAMA.Log.debug('Registering Wapama with Kickstart');
Kickstart.register(WAPAMA.load);

