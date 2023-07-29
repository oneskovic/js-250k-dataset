oscar.Control.ArgParser = oscar.BaseClass(OpenLayers.Control.ArgParser, {
	/**
	 * Property: args 
	 * Stores the map property.
	 */
	args :null,
	
	/**
	 * Constructor: oscar.Control.ArgParser
	 * 
	 * Parameters: 
	 * options - {Object} An optional object whose properties will be set on
	 * 			 this instance.
	 */
	initialize : function() {
		OpenLayers.Control.ArgParser.prototype.initialize.apply(this, []);
	},
	
	/**
	 * APIMethod: setMap 
	 * Set the map property for the control.
	 * 
	 * Parameters: 
	 * map - {<oscar.Map>}
	 */
	setMap : function(map) {
		this.map = map;
		this.args = OpenLayers.Util.getParameters();
	},
	
	/**
	 * Constant: CLASS_NAME
	 * - oscar.Control.ArgParser
	 */
	CLASS_NAME :'oscar.Control.ArgParser'

});