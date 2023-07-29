dojo.provide("wm.base.debug.ConsolePanel");

dojo.declare("wm.debug.ConsolePanel", wm.Container, {
    layoutKind: "top-to-bottom",
    htmlItems: [],
    isActive: false,

    postInit: function() {
		this.inherited(arguments);
		var components = this.createComponents({
		    html: ["wm.Html", {width: "100%", height: "100%", name: "html", border: "1", borderColor: "#333"}],
		    panel: ["wm.Panel", {width: "100%", height: "50px", layoutKind: "left-to-right", verticalAlign: "center"},{},{
			text: ["wm.LargeTextArea", {width: "100%", height: "100%", name: "text"}],
			button: ["wm.Button", {width: "50px", height: "100%", caption: "Send"}]
		    }]
		});
		this.html = components[0];
		this.text = components[1].c$[0];
		this.button = components[1].c$[1];
		this.connect(this.button, "onclick", this, "send");
    },
    send: function() {
    	var result;
    	try {
    		result = eval(this.text.getDataValue());
    	} catch (e) {
    		result = "<span style='color:red'>" + e.toString() + "</span>";
    	}
    	this.htmlItems.push(result);
    	while (this.htmlItems.length > 500) this.htmlItems.shift();
    	if (this.isActive) {
    		dojo.create("div", {
    			innerHTML: result
    		}, this.html.domNode);
    	}
    	this.text.setDataValue("");
    	this.text.focus();
    },
    activate: function() {
    	this.isActive = true;
    	if (this.htmlItems.length) {
    		this.html.setHtml("<div>" + this.htmlItems.join("</div><div>") + "</div>");
    	}
    },
    deactivate: function() {
    	this.isActive = false;
    	this.html.setHtml("");
    }});