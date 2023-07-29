(function(){

	jQuery.sap.declare("ui5strap.PopoverRenderer");

	ui5strap.PopoverRenderer = {};

	ui5strap.PopoverRenderer.render = function(rm, oControl) {
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.writeAttribute("style", "display:none;");
		rm.addClass("popover-data");
		rm.writeClasses();
		rm.write(">");

		rm.write("<div");
			   
		rm.addClass("popover-data-title");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderTitleContent(rm, oControl);

		rm.write("</div>");


		rm.write("<div");
		  
		rm.addClass("popover-data-content");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		rm.write("</div>");

		rm.write("</div>");
		    
	};

}());