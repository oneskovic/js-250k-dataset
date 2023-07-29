Ext.define('App.ux.LiveSnomedSearch', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.snomedlivesearch',
	hideLabel: true,
	displayField: 'FullySpecifiedName',
	valueField: 'ConceptId',
	initComponent: function(){
		var me = this;

		Ext.define('liveSnomedSearchModel', {
			extend: 'Ext.data.Model',
			fields: [
				{
					name: 'ConceptId',
					type: 'string'
				},
				{
					name: 'FullySpecifiedName',
					type: 'string'
				},
				{
					name: 'CodeType',
					type: 'string',
					defaultValue: 'SNOMED'
				}
			],
			proxy: {
				type: 'direct',
				api: {
					read: 'SnomedCodes.liveCodeSearch'
				},
				reader: {
					totalProperty: 'totals',
					root: 'data'
				}
			}
		});

		me.store = Ext.create('Ext.data.Store', {
			model: 'liveSnomedSearchModel',
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
					return '<div class="search-item"><h3>{FullySpecifiedName}<span style="font-weight: normal"> ({ConceptId}) </span></h3></div>';
				}
			},
			pageSize: 25
		});

		me.callParent();
	}
});