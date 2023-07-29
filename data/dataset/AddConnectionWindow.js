Ext.ns('Deluge');


Deluge.AddConnectionWindow = Ext.extend(Ext.Window, {

	title: _('Add Connection'),
	iconCls: 'x-deluge-add-window-icon',

	layout: 'fit',
	width:  300,
	height: 195,

	bodyStyle: 'padding: 10px 5px;',
	closeAction: 'hide',

	initComponent: function() {
		Deluge.AddConnectionWindow.superclass.initComponent.call(this);

		this.addEvents('hostadded');
	
		this.addButton(_('Close'), this.hide, this);
		this.addButton(_('Add'), this.onAddClick, this);
	
		this.on('hide', this.onHide, this);
	
		this.form = this.add({
			xtype: 'form',
			defaultType: 'textfield',
			baseCls: 'x-plain',
			labelWidth: 60,
			items: [{
				fieldLabel: _('Host'),
				name: 'host',
				anchor: '75%',
				value: ''
			}, {
				xtype: 'spinnerfield',
				fieldLabel: _('Port'),
				name: 'port',
				strategy: {
					xtype: 'number',
					decimalPrecision: 0,
					minValue: -1,
					maxValue: 65535
				},
				value: '58846',
				anchor: '40%'
			}, {
				fieldLabel: _('Username'),
				name: 'username',
				anchor: '75%',
				value: ''
			}, {
				fieldLabel: _('Password'),
				anchor: '75%',
				name: 'password',
				inputType: 'password',
				value: ''
			}]
		});
	},

	onAddClick: function() {
		var values = this.form.getForm().getValues();
		deluge.client.web.add_host(values.host, values.port, values.username, values.password, {
			success: function(result) {
				if (!result[0]) {
					Ext.MessageBox.show({
						title: _('Error'),
						msg: "Unable to add host: " + result[1],
						buttons: Ext.MessageBox.OK,
						modal: false,
						icon: Ext.MessageBox.ERROR,
						iconCls: 'x-deluge-icon-error'
					});
				} else {
					this.fireEvent('hostadded');
				}
				this.hide();
			},
			scope: this
		});
	},

	onHide: function() {
		this.form.getForm().reset();
	}
});
