var CardTerminalFactory = Class.create({
	/** @lends CardTerminalFactory.prototype */
	
	/**
	 * @class Interface defining the interaction with the available Card Terminals for the system
	 * @constructs
	 */
	initialize: function() {
		throw "abstract class"; 
	},
	
	
	/**
	 * List the names of the available terminals
	 * This name can be used to build a CardTerminal for the current implementation
	 * @returns {Array} list of available terminals names
	 */
	list: function() {
	},
	
	/**
	 * Get the card terminal associated to the given name
	 * @param {String} name name card terminal name
	 * @param {String} [initOptions] initialization options associated to this terminal 
	 * @returns {CardTerminal} card terminal
	 */
	getCardTerminal: function(name, initOptions) {
	},
	
	/**
	 * List the names of all terminals which received a card inserted event since the last call
	 * @returns {Array} name of all found terminals
	 */
	waitInserted: function() {
	},
	
});

