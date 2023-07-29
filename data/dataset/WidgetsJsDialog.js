dojo.provide("wm.base.widget.Dialogs.WidgetsJsDialog");
dojo.require("wm.base.widget.Dialogs.Dialog");



dojo.declare("wm.WidgetsJsDialog", wm.Dialog, { 
    margin: "0,4,4,0",// for shadow styles
    useContainerWidget: true,
    widgets_data: null,
    widgets_json: "",
    width: "400px",
    height: "150px",

    setShowing: function(inShowing, forceChange) {
	this.inherited(arguments);
	if (this.isReflowEnabled() && !this._rendered) {
	    this.leafFirstRenderCss();
	    this._rendered = true;
	}
    },
    postInit: function() {
	this.inherited(arguments);
	if (!this.widgets_data)
	    this.setWidgetsJson(this.widgets_json);
	this.generateContents();
	this.containerWidget.setPadding("0");
	this.renderBounds();
	this.reflow();
    },

    setWidgetsJson: function(inJson) {
	try {
	    this.widgets_json = inJson;
	    this.widgets_data = dojo.fromJson(this.widgets_json);
	    if (!this._cupdating)
		this.generateContents();
	} catch(e) {console.error(e);}
    },
    generateContents: function() {
	if (this._generated) return;
	this._generated = true;
	this.containerWidget._cupdating = true;
	this.containerWidget.createComponents(this.widgets_data, this);
	this.containerWidget._cupdating = false;
	this.containerWidget.reflow();
	if (this.button_data) {
	    if (!this.buttonBar) {
		var containerWidget = this.containerWidget;
		var containerNode = this.containerNode;
		delete this.containerWidget;
		delete this.containerNode;
		this.createButtonBar();
		this.containerWidget = containerWidget;
		this.containerNode = containerNode;
	    }
	    this.buttonBar.createComponents(this.button_data, this);
	}
    }
});
