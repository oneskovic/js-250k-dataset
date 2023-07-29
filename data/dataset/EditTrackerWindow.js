Ext.ns('Deluge');

/**
 * @class Deluge.EditTrackerWindow
 * @extends Ext.Window
 */
Deluge.EditTrackerWindow = Ext.extend(Ext.Window, {

	title: _('Edit Tracker'),
	layout: 'fit',
	width: 375,
	height: 110,
	plain: true,
	closable: true,
	resizable: false,

	bodyStyle: 'padding: 5px',
	buttonAlign: 'right',
	closeAction: 'hide',
	iconCls: 'x-deluge-edit-trackers',
	
	initComponent: function() {
		Deluge.EditTrackerWindow.superclass.initComponent.call(this);
		
		this.addButton(_('Cancel'), this.onCancelClick, this);
		this.addButton(_('Save'), this.onSaveClick, this);
		this.on('hide', this.onHide, this);
		
		this.form = this.add({
			xtype: 'form',
			defaultType: 'textfield',
			baseCls: 'x-plain',
			labelWidth: 55,
			items: [{
				fieldLabel: _('Tracker'),
				name: 'tracker',
				anchor: '100%'
			}]
		});
	},
	
	show: function(record) {
		Deluge.EditTrackerWindow.superclass.show.call(this);
		
		this.record = record;
		this.form.getForm().findField('tracker').setValue(record.data['url']);
	},
	
	onCancelClick: function() {
		this.hide();
	},
	
	onHide: function() {
		this.form.getForm().findField('tracker').setValue('');
	},
	
	onSaveClick: function() {
		var url = this.form.getForm().findField('tracker').getValue();
		this.record.set('url', url);
		this.record.commit();
		this.hide();
	}
});
