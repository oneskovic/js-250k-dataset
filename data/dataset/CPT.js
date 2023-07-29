Ext.define('App.controller.administration.CPT', {
	extend: 'Ext.app.Controller',

	refs: [
		{
			ref: 'CptAdminGrid',
			selector: 'cptadmingrid'
		},
		{
			ref: 'AdminCpt4CodeOnlyActiveBtn',
			selector: '#adminCpt4CodeOnlyActiveBtn'
		}
	],

	init: function(){
		var me = this;

		me.control({
			'cptadmingrid': {
				activate: me.onCptAdminGridActive
			},
			'#adminCpt4CodeSearchField': {
				keyup: me.onAdminCpt4CodeSearchFieldKeyUp
			}
		});
	},

	onCptAdminGridActive: function(grid){
		grid.getStore().load();
	},

	onAdminCpt4CodeSearchFieldKeyUp: function(field){
		var me = this,
			store = me.getCptAdminGrid().getStore();
		me.dataQuery = field.getValue();
		store.proxy.extraParams = {
			onlyActive: me.getAdminCpt4CodeOnlyActiveBtn().pressed,
			query: me.dataQuery
		};

		store.loadPage(1);
	}

});