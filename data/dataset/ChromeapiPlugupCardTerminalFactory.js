require('Sandbox');
require('ChromeapiPlugupCardTerminal');

var ChromeapiPlugupCardTerminalFactory = Class.extend(CardTerminalFactory, {
	/** @lends ChromeapiPlugupCardTerminalFactory.prototype */

	/**
	 *  @class Implementation of the {@link CardTerminalFactory} using the Chrome API for Plug-up Dongle
	 *  @constructs
	 *  @augments CardTerminalFactory
	 */
	initialize: function(pid) {
		this.pid = pid;
	},

	list_async: function() {
		if (typeof chromeDevice == "undefined") {
			throw "Content script is not available";
		}
		return chromeDevice.enumerateDongles_async(this.pid)
		       .then(function(result) {
		       		return result.deviceList;
		       });
	},

	waitInserted: function() {
		throw "Not implemented"
	},

	getCardTerminal: function(device) {
		return new ChromeapiPlugupCardTerminal(device);
	}
});
