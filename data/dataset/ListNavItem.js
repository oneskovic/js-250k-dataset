(function(){

	jQuery.sap.declare("ui5strap.ListNavItem");
	jQuery.sap.require("ui5strap.ListLinkItem");

	ui5strap.ListLinkItem.extend("ui5strap.ListNavItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				badge : {
					type:"string",
					defaultValue : ""
				}
			}
		}
	});

}());