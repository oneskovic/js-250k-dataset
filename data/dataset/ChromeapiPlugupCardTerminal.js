require('Sandbox');
require('CardTerminal');
require('ChromeapiPlugupCard');
require('Convert');

var ChromeapiPlugupCardTerminal = Class.extend(CardTerminal, {
	/** @lends ChromeapiPlugupCardTerminal.prototype */
	
	/**
	 *  @class In browser implementation of the {@link CardTerminal} interface using the Chrome API
	 *  @param {String} terminalName Name of the terminal
	 *  @constructs
	 *  @augments CardTerminal
	 */	
	initialize: function(device, terminalName) {
		this.device = device;
		this.terminalName = terminalName;
	},
	
	isCardPresent:function() {
		return true;
	},
	
	getCard_async:function() {
		if (typeof this.cardInstance == "undefined") {
			this.cardInstance = new ChromeapiPlugupCard(this, this.device);
			return this.cardInstance.connect_async();
		}
		// compat if the card instance has already been retrieved 
		var currentObject = this;
                // promisising of the return value
		return Q.fcall(function() {
			return currentObject.cardInstance;
		});
	},
		
	getTerminalName:function() {
		return this.terminalName;
	},
	
	getName:function() {		
		if ((typeof this.terminalName == "undefined") || (this.terminalName.length == 0)) {
			return "Default";
		}
		else {
			return this.terminalName;
		}
	}
			
});
