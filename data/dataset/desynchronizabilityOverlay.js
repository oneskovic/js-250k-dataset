if (!ORYX.Plugins) 
    ORYX.Plugins = new Object();

ORYX.Plugins.DesynchronizabilityOverlay = ORYX.Plugins.AbstractPlugin.extend({

    facade: undefined,
    
    construct: function(facade){
		
        this.facade = facade;
        
		this.active = false;
		this.el 	= undefined;
		this.callback = undefined;
		
        this.facade.offer({
            'name': ORYX.I18N.DesynchronizabilityOverlay.name,
            'functionality': this.showOverlay.bind(this),
            'group': ORYX.I18N.DesynchronizabilityOverlay.group,
            'icon': ORYX.BASE_FILE_PATH + "images/bpmn2pn.png",
            'description': ORYX.I18N.DesynchronizabilityOverlay.desc,
            'index': 3,
            'minShape': 0,
            'maxShape': 0
        });
		
    },
    
	showOverlay: function(){

		if (this.active) {
			
			this.facade.raiseEvent({
				type: 	ORYX.CONFIG.EVENT_OVERLAY_HIDE,
				id: 	"desynchronizability"
			});
			this.active = !this.active;				

		} else {
			

		try {
			var serialized_rdf =this.getRDFFromDOM();
//			serialized_rdf = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + serialized_rdf;
			
			// Send the request to the server.
			new Ajax.Request(ORYX.CONFIG.DESYNCHRONIZABILITY_URL, {
				method: 'POST',
				asynchronous: false,
				parameters: {
					resource: location.href,
					data: serialized_rdf
				},
				onSuccess: function(request){
					var resp = request.responseText.evalJSON();
	
					if (resp.conflicttransitions) {
					if (resp.conflicttransitions.length > 0) {
					
						// Get all Valid ResourceIDs and collect all shapes
						var transitionshapes = resp.conflicttransitions.collect(function(res){ 
							return this.facade.getCanvas()
								.getChildShapeByResourceId( res ) 
						}.bind(this)).compact();
	
						this.facade.raiseEvent({
							type: 			ORYX.CONFIG.EVENT_OVERLAY_SHOW,
							id: 			"desynchronizability",
							shapes: 		transitionshapes,
							attributes: 	{fill: "red", stroke: "black"}
						});
	
						this.active = !this.active;				
	
					} else {
	
						Ext.Msg.alert(ORYX.I18N.Oryx.title, ORYX.I18N.DesynchronizabilityOverlay.sync);
						// var win = window.open('data:text/plain,' +request.responseText, '_blank', "resizable=yes,width=640,height=480,toolbar=0,scrollbars=yes");
					}
					} else if (resp.syntaxerrors) {
	
						// Get all Valid ResourceIDs and collect all shapes
	//							var shapes = transitions.collect(function(res){ return this.facade.getCanvas().getChildShapeByResourceId( res ) }.bind(this)).compact();
	
						Ext.Msg.alert(ORYX.I18N.Oryx.title, ORYX.I18N.DesynchronizabilityOverlay.error.replace(/1/, resp.syntaxerrors.length));
	
	//							this.active = !this.active;				
	
					} else {
						Ext.Msg.alert(ORYX.I18N.Oryx.title, ORYX.I18N.DesynchronizabilityOverlay.invalid);
					}
				}.bind(this)
			});
			
		} catch (error){
			this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
			Ext.Msg.alert(ORYX.I18N.Oryx.title, error);
	 	}

		}
		
	}	
    
});
