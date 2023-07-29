(function(){

	jQuery.sap.declare("ui5strap.AlertRenderer");

	ui5strap.AlertRenderer = {};

	ui5strap.AlertRenderer.render = function(rm, oControl) {
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("alert alert-" + ui5strap.BSSeverity[oControl.getSeverity()] + (oControl.getAnimate() ? " fade" : ''));
		rm.writeClasses();
		rm.write(">");

		var closeButton = oControl.getCloseButton();
		if(null !== closeButton && oControl.getClosable()){
			rm.renderControl(closeButton);
		}
		
		ui5strap.RenderUtils.renderContent(rm, oControl);

		rm.write("</div>");

	};

}());