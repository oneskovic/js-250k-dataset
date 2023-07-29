Ext.define('App.ux.combo.AllergiesAbdominal',{
		extend: 'Ext.form.ComboBox',
		alias: 'widget.mitos.allergiesabdominalcombo',
		initComponent: function(){
			var me = this;

			Ext.define('allergiesabdominalModel',{
				extend: 'Ext.data.Model',
				fields: [
					{
						name: 'option_name',
						type: 'string'
					},
					{
						name: 'option_value',
						type: 'string'
					}
				],
				proxy: {
					type: 'direct',
					api: {
						read: 'CombosData.getOptionsByListId'
					}
				}
			});


			Ext.apply(this,{
				editable: false,
				queryMode: 'local',
				displayField: 'option_name',
				valueField: 'option_value',
				emptyText: _('select'),
				store: Ext.create('Ext.data.Store',{
					model: 'allergiesabdominalModel',
					autoLoad: false
				})
			});
			me.callParent(arguments);
		}
	});