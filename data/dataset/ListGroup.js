(function(){

	jQuery.sap.declare("ui5strap.ListGroup");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListGroupItem");

	ui5strap.ListBase.extend("ui5strap.ListGroup", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				container : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.ListGroupItem",
					singularName: "item"
				} 
			}

		}
	});

}());