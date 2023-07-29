(function(){

	jQuery.sap.declare("ui5strap.TableColumn");
	jQuery.sap.require("sap.ui.core.Control");


	sap.ui.core.Element.extend("ui5strap.TableColumn", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				text : {
					"type": "string", 
					"defaultValue": ""
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		}
	});

	ui5strap.TableColumn.prototype.init = function(){

	};

}());