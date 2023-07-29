(function(){

	jQuery.sap.declare("ui5strap.ButtonToolbar");
	
	sap.ui.core.Control.extend("ui5strap.ButtonToolbar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "buttonGroups",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
			},
					
			aggregations : { 
				"buttonGroups" : {
					type : "ui5strap.ButtonGroup",
					singularName: "buttonGroups"
				} 
			}
		}
	});

}());