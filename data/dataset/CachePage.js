Ext.namespace('Deluge.preferences');

/**
 * @class Deluge.preferences.Cache
 * @extends Ext.form.FormPanel
 */
Deluge.preferences.Cache = Ext.extend(Ext.form.FormPanel, {

	border: false,
	title: _('Cache'),
	layout: 'form',
	
	initComponent: function() {
		Deluge.preferences.Cache.superclass.initComponent.call(this);

		var om = deluge.preferences.getOptionsManager();
		
		var fieldset = this.add({
			xtype: 'fieldset',
			border: false,
			title: _('Settings'),
			autoHeight: true,
			labelWidth: 180,
			defaultType: 'spinnerfield',
			defaults: {
				decimalPrecision: 0,
				minValue: -1,
				maxValue: 999999
			}
		});
		om.bind('cache_size', fieldset.add({
			fieldLabel: _('Cache Size (16 KiB Blocks)'),
			name: 'cache_size',
			width: 60,
			value: 512
		}));
		om.bind('cache_expiry', fieldset.add({
			fieldLabel: _('Cache Expiry (seconds)'),
			name: 'cache_expiry',
			width: 60,
			value: 60
		}));
	}
});
