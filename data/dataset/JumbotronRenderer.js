(function(){

	jQuery.sap.declare("ui5strap.JumbotronRenderer");

	ui5strap.JumbotronRenderer = {
	};

	ui5strap.JumbotronRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		rm.write("<div");

		rm.writeControlData(oControl);
		rm.addClass('jumbotron')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		};

		rm.write("</div>");
	};

}());