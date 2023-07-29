(function(){

	jQuery.sap.declare("ui5strap.ListLinkItemRenderer");
	jQuery.sap.require("ui5strap.LinkRenderer");

	ui5strap.ListLinkItemRenderer = {
	};

	ui5strap.ListLinkItemRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl, {});

		ui5strap.LinkRenderer.renderContent(rm, oControl);

		this.endRender(rm, oControl);
	};

	ui5strap.ListLinkItemRenderer.startRender = function(rm, oControl){
		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");

		ui5strap.LinkRenderer.startRender(rm, oControl, { listLink : true });
	};

	ui5strap.ListLinkItemRenderer.endRender = function(rm, oControl){
		ui5strap.LinkRenderer.endRender(rm, oControl);
		    
		rm.write("</li>");
	};

}());
