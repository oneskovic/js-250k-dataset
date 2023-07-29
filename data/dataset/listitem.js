(function(){

	jQuery.sap.declare("ui5strap.ListItem");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.ListItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				selected : {
					type:"boolean", 
					defaultValue:false
				}, 
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				selectable : {
					type : "boolean",
					defaultValue : true
				},
				text : {
					type:"string",
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

	var ListItemPrototype = ui5strap.ListItem.prototype;

	ui5strap.Utils.dynamicText(ListItemPrototype);

	ui5strap.Utils.dynamicClass(ListItemPrototype, 'selected', { 'true' : 'active' });

}());