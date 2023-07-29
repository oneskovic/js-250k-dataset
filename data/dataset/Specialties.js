Ext.define('App.controller.administration.Specialties', {
	extend: 'Ext.app.Controller',

	refs: [
		{
			ref: 'SpecialtiesPanel',
			selector: 'specialtiespanel'
		},
		{
			ref: 'SpecialtiesAddBtn',
			selector: '#specialtiesAddBtn'
		}
	],

	init: function(){
		var me = this;

		me.control({
			'#specialtiesAddBtn': {
				click: me.onSpecialtiesAddBtnClick
			}
		});

	},

	onSpecialtiesAddBtnClick: function(btn){
		var grid = btn.up('grid');

		grid.editingPlugin.cancelEdit();
		grid.getStore().insert(0, {
			create_date: new Date(),
			update_date: new Date(),
			create_uid: app.user.id,
			update_uid: app.user.id,
			active: 1
		});
		grid.editingPlugin.startEdit(0, 0);
	}

});