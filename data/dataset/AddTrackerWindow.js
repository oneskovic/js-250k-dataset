Ext.ns('Deluge');


Deluge.AddTrackerWindow = Ext.extend(Ext.Window, {
	
	title: _('Add Tracker'),
	layout: 'fit',
	width: 375,
	height: 150,
	plain: true,
	closable: true,
	resizable: false,

	bodyStyle: 'padding: 5px',
	buttonAlign: 'right',
	closeAction: 'hide',
	iconCls: 'x-deluge-edit-trackers',

	initComponent: function() {
		Deluge.AddTrackerWindow.superclass.initComponent.call(this);
	
		this.addButton(_('Cancel'), this.onCancelClick, this);
		this.addButton(_('Add'), this.onAddClick, this);
		this.addEvents('add');
	
		this.form = this.add({
			xtype: 'form',
			defaultType: 'textarea',
			baseCls: 'x-plain',
			labelWidth: 55,
			items: [{
				fieldLabel: _('Trackers'),
				name: 'trackers',
				anchor: '100%'
			}]
		})
	},

	onAddClick: function() {
		var trackers = this.form.getForm().findField('trackers').getValue();
		trackers = trackers.split('\n');
	
		var cleaned = [];
		Ext.each(trackers, function(tracker) {
			if (Ext.form.VTypes.url(tracker)) {
				cleaned.push(tracker);
			}
		}, this);
		this.fireEvent('add', cleaned);
		this.hide();
		this.form.getForm().findField('trackers').setValue('');
	},

	onCancelClick: function() {
		this.form.getForm().findField('trackers').setValue('');
		this.hide();
	}
});
