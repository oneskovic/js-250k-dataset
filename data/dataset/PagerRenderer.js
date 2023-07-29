(function(){

	jQuery.sap.declare("ui5strap.PagerRenderer");

	ui5strap.PagerRenderer = {};

	ui5strap.PagerRenderer.render = function(rm, oControl) {
		var previous = oControl.getPrevious(),
			next = oControl.getNext(),
			spread = oControl.getAligned();

		rm.write('<ul class="pager"');
		rm.writeControlData(oControl);
		rm.writeClasses();
		rm.write(">");
		
		rm.write('<li');
		if(spread){
			rm.addClass('previous');
		}
		if(oControl.getDisabledPrevious()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");
		rm.renderControl(previous);
		rm.write('</li>');
		
		rm.write('<li');
		if(spread){
			rm.addClass('next');
		}
		if(oControl.getDisabledNext()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");
		rm.renderControl(next);
		rm.write('</li>');
		

		rm.write("</ul>");

	};

}());