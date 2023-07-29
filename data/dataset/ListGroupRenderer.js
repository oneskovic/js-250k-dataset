(function(){

	jQuery.sap.declare("ui5strap.ListGroupRenderer");

	ui5strap.ListGroupRenderer = {
	};

	ui5strap.ListGroupRenderer.render = function(rm, oControl) {
		var items = oControl.getItems(),
			tag = oControl.getContainer() ? 'div' : 'ul';
		

		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('list-group');
		rm.writeClasses();
		rm.write(">");
		    
		for(var i = 0; i < items.length; i++){ 
			rm.renderControl(items[i]);
		}
		    
		rm.write("</" + tag + ">");
	};

}());
