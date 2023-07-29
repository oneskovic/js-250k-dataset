Ext.define('App.ux.LiveRXNORMSearch', {
	extend: 'Ext.form.ComboBox',
	requires:[
		'App.model.administration.MedicationInstruction'
	],
	alias: 'widget.rxnormlivetsearch',
	hideLabel: true,
	displayField: 'STR',
	valueField: 'RXCUI',
	initComponent: function(){
		var me = this;

		Ext.define('liveRXNORMSearchModel', {
			extend: 'Ext.data.Model',
			fields: [
				{
					name: 'RXCUI',
					type: 'string'
				},
				{
					name: 'CODE',
					type: 'string'
				},
				{
					name: 'NDC',
					type: 'string'
				},
				{
					name: 'STR',
					type: 'string',
					convert: function(v){
						var regex = /\(.*\) | \(.*\)|\(.*\)/g;
						return v.replace(regex, '');
					}
				},
				{
					name: 'DST',
					type: 'auto'
				},
				{
					name: 'DRT',
					type: 'auto'
				},
				{
					name: 'DDF',
					type: 'auto'
				},
				{
					name: 'DDFA',
					type: 'auto'
				},
				{
					name: 'RXN_QUANTITY',
					type: 'auto'
				},
				{
					name: 'SAB',
					type: 'auto'
				},
				{
					name: 'RXAUI',
					type: 'auto'
				},
				{
					name: 'CodeType',
					defaultValue: 'RXNORM'
				}
			],
			proxy: {
				type: 'direct',
				api: {
					read: 'Rxnorm.getRXNORMLiveSearch'
				},
				reader: {
					totalProperty: 'totals',
					root: 'rows'
				}
			},
			hasMany: [
				{
					model: 'App.model.administration.MedicationInstruction',
					name: 'instructions',
					primaryKey: 'RXCUI',
					foreignKey: 'rxcui'
				}
			]
		});

		me.store = Ext.create('Ext.data.Store', {
			model: 'liveRXNORMSearchModel',
			pageSize: 25,
			autoLoad: false
		});

		Ext.apply(this, {
			store: me.store,
			emptyText: _('search') + '...',
			typeAhead: false,
			hideTrigger: true,
			minChars: 3,
			listConfig: {
				loadingText: _('searching') + '...',
				//emptyText	: 'No matching posts found.',
				//---------------------------------------------------------------------
				// Custom rendering template for each item
				//---------------------------------------------------------------------
				getInnerTpl: function(){
					return '<div class="search-item"><h3>{STR}<span style="font-weight: normal"> NDC: {NDC} </span></h3></div>';
				}
			},
			pageSize: 25
		});

		me.callParent();
	}
});