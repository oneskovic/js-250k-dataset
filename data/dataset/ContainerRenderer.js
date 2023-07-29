(function(){

	jQuery.sap.declare("ui5strap.ContainerRenderer");

	ui5strap.ContainerRenderer = {
		typeToTag : {
			Default : {
				tagName : "div",
				className : null
			},
			Page : {
				tagName : "div",
				className : "container"
			},
			Fluid : {
				tagName : "div",
				className : "container-fluid"
			},
			Section : {
				tagName : "section",
				className : null
			},
			Paragraph : {
				tagName : "div",
				className : "container-paragraph"
			},
			Floating : {
				tagName : "div",
				className : "container-floating"
			},
			Phrasing : {
				tagName : "span",
				className : "container-phrasing"
			}
		}
	};

	/*
	Show : "show",
			Hidden : "hidden",
			Invisible : "invisible",
			
			*/

	ui5strap.ContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			severity = oControl.getSeverity(),
			tagData = this.typeToTag[oControl.getType()],
			html = oControl.getHtml();

		rm.write("<" + tagData.tagName);
		rm.writeControlData(oControl);
		
		rm.addClass(tagData.className);

		if(ui5strap.Severity.None !== severity){
			rm.addClass("bg-" + ui5strap.BSSeverity[severity]);
		}

		ui5strap.RenderUtils.visibility(rm, oControl);

		ui5strap.RenderUtils.alignment(rm, oControl);

		rm.writeClasses();
		rm.write(">");

		if('' !== html){
			rm.write(html);
		}
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</" + tagData.tagName + ">");
	};


}());