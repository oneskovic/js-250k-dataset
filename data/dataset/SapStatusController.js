Ext.define('Ssp.controller.tool.profile.SapStatusController', {
    extend: 'Deft.mvc.ViewController',
    mixins: [ 'Deft.mixin.Injectable' ],
    inject: {
    	apiProperties: 'apiProperties',
        sapStatusesStore: 'sapStatusesAllUnpagedStore'
    },
	control: {
        codeField: '#code',
        nameField: '#name',
		descriptionField: '#description'
	},

	init: function() {
		var me=this;
		var args = arguments;
		
		if(me.sapStatusesStore.getTotalCount() <= 0){
			me.sapStatusesStore.addListener("load", me.sapStatusesStoreLoaded, me, {single:true});
			me.sapStatusesStore.load();
		}else{
			me.sapStatusesStoreLoaded();
		}
		return this.callParent(arguments);
    },

	sapStatusesStoreLoaded: function(){
		var me=this;
		var sapStatus = me.sapStatusesStore.findRecord('code',me.getView().code, 0, false, false, true);
		if(sapStatus){
			me.getCodeField().setValue(sapStatus.get('code'));
			me.getDescriptionField().setValue(sapStatus.get('description'));
			me.getNameField().setValue(sapStatus.get('name'));
		}else{
			me.sapStatusesStore.load();
		}
	},


	destroy: function() {
	        var me=this;
	        return me.callParent( arguments );
	}
	
});