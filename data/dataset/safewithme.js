'use strict';

/**
 * SafeWith.me uses the model-view-presenter (MVP) pattern to seperate 'view'
 * (DOM manipulation) logic from 'presenter' (business) logic. Dependency
 * injection is used to keep presenters decoupled and testable. The
 * 'model' is implemented using a json filesystem called 'BucketFS', which is
 * encrypted before being persisted on the server. This way the server has
 * no knowledge of file meta-data such as filenames.
 */
var SAFEWITHME = (function (window, document, $) {
	var self = {};
	
	/**
	 * Single point of entry for the application
	 */
	self.init = function() {
		// set jqm to display loading texts
		$.mobile.loadingMessageTextVisible = true;
		
		//
		// init modules with dependency injection
		//
		
		// check if the browser supports all necessary HTML5 Apis
		var util = new Util(window, uuid);
		if (!util.checkRuntime()) { return; }
		
		// init presenters
		var cache = new Cache(window);	
		var server = new Server(util);
		var menu = new Menu(server, cache);
		var bucketCache = new BucketCache(cache, server);
		var crypto = new Crypto(window, openpgp, util, server);
		var fs = new FS(crypto, server, util, cache,  bucketCache);
		
		// init views
		var menuView = new MenuView(window, $, menu, server);
		var cryptoView = new CryptoView(window, $, crypto, cache);
		var fsView = new FSView(window, document, $, fs);
		
		//
		// start the application
		//

		// init menu
		menuView.init('/app/', function(loginInfo) {
			// init crypto
			cryptoView.init(loginInfo, function() {
				// init filesystem
				fsView.init(loginInfo, function() {
					// init successful
				});
			});
		});
	};
	
	return self;
}(window, document, $));