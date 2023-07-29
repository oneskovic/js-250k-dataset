if(!ORYX.Plugins)
	ORYX.Plugins = new Object();

//No I18N, because not in use!!!

//TODO this one fails when importing a stencilset that is already loaded. Hoewver, since an asynchronous callback throws the error, the user doesn#t recognize it.
ORYX.Plugins.AddStencilSet = {

	/**
	 *	Constructor
	 *	@param {Object} Facade: The Facade of the Editor
	 */
	construct: function(facade) {
		this.facade = facade;

		this.facade.offer({
			'name':"Add Stencil Set",
			'functionality': this.addStencilSet.bind(this),
			'group': "StencilSet",
			'icon': ORYX.PATH + "images/add.png",
			'description': "Add a stencil set.",
			'index': 1,
			'minShape': 0,
			'maxShape': 0});
	},
	
	addStencilSet: function() {
		var url = Ext.Msg.prompt(ORYX.I18N.Oryx.title, "Enter relative url of the stencil set's JSON file:", (function(btn, url) {
			if(btn == 'ok' && url) {
				this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE, text:"Loading Stencil Set"});
				
				window.setTimeout(function(){
					
					this.facade.loadStencilSet(url);
					this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
				
				}.bind(this), 100);
			}
		}).bind(this));	
	}
};
ORYX.Plugins.AddStencilSet = Clazz.extend(ORYX.Plugins.AddStencilSet);
