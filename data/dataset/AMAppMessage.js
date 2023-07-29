(function(){

	jQuery.sap.declare("ui5strap.AMAppMessage");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMAppMessage");

	var AMAppMessageProto = ui5strap.AMAppMessage.prototype;

	AMAppMessageProto.namespace = 'appMessage';

	AMAppMessageProto.parameters = {
		"receiver" : {
			"required" : true, 
			"type" : [ "string", "object"]
		},
		"message" : {
			"required" : true, 
			"type" : "object"
		},
		"toParent" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		}
	};

	
	AMAppMessageProto.run = function(){
		this.context.app.sendMessage(this.context.parameters[this.namespace]);
	};

}());