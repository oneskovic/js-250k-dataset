(function(){

	jQuery.sap.declare("ui5strap.RowRenderer");

	ui5strap.RowRenderer = {
	};

	ui5strap.RowRenderer.render = function(rm, oControl) {
		var content = oControl.getColumns();
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("row");
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};


}());
