 if(!ORYX.Plugins)
	ORYX.Plugins = new Object();

ORYX.Plugins.PetriNet = {

	/**
	 *	Constructor
	 *	@param {Object} Facade: The Facade of the Editor
	 */
	construct: function(facade){
		this.facade = facade;
		
		this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED, this.handlePropertyChanged.bind(this));
	},
	
	/**
	 * Checks if the number of tokens on a place has changed. Up to four the 
	 * tokens are visualized as drawings, otherwise a number gets displayed.
	 */
	handlePropertyChanged: function(option) {
		var shapes = option.elements;
		var propertyKey = option.key;
		var propertyValue = option.value;
		
		var changed = false;
		shapes.each(function(shape){
			if((shape.getStencil().id() === "http://b3mn.org/stencilset/petrinet#Place") &&
				(propertyKey === "oryx-numberoftokens")) {
				
				/* Visualize number of Tokens */
				if(propertyValue == 0) {
					shape.setProperty("oryx-numberoftokens_text", "");
					shape.setProperty("oryx-numberoftokens_drawing", "0");
				} else if(propertyValue == 1) {
					shape.setProperty("oryx-numberoftokens_text", "");
					shape.setProperty("oryx-numberoftokens_drawing", "1");
				} else if(propertyValue == 2) {
					shape.setProperty("oryx-numberoftokens_text", "");
					shape.setProperty("oryx-numberoftokens_drawing", "2");
				} else if(propertyValue == 3) {
					shape.setProperty("oryx-numberoftokens_text", "");
					shape.setProperty("oryx-numberoftokens_drawing", "3");
				} else if(propertyValue == 4) {
					shape.setProperty("oryx-numberoftokens_text", "");
					shape.setProperty("oryx-numberoftokens_drawing", "4");
				} else {
					var tokens = parseInt(propertyValue, 10);
					if(tokens && tokens > 0) {
						shape.setProperty("oryx-numberoftokens_text", "" + tokens);
						shape.setProperty("oryx-numberoftokens_drawing", "0");
					} else {
						shape.setProperty("oryx-numberoftokens_text", "");
						shape.setProperty("oryx-numberoftokens_drawing", "0");
					}
				}
				changed = true;
			}
		});
		
		if(changed) {this.facade.getCanvas().update();}
	}
};
	
ORYX.Plugins.PetriNet = ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.PetriNet);
	