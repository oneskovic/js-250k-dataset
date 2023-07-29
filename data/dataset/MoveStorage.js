Ext.namespace('Deluge');
Deluge.MoveStorage = Ext.extend(Ext.Window, {
	
	constructor: function(config) {
		config = Ext.apply({
			title: _('Move Storage'),
			width: 375,
			height: 110,
			layout: 'fit',
			buttonAlign: 'right',
			closeAction: 'hide',
			closable: true,
			iconCls: 'x-deluge-move-storage',
			plain: true,
			resizable: false
		}, config);
		Deluge.MoveStorage.superclass.constructor.call(this, config);
	},

	initComponent: function() {
		Deluge.MoveStorage.superclass.initComponent.call(this);

		this.addButton(_('Cancel'), this.onCancel, this);
		this.addButton(_('Move'), this.onMove, this);

		this.form = this.add({
			xtype: 'form',
			border: false,
			defaultType: 'textfield',
			width: 300,
			bodyStyle: 'padding: 5px'
		});

		this.moveLocation = this.form.add({
			fieldLabel: _('Location'),
			name: 'location',
			width: 240
		});
		//this.form.add({
		//	xtype: 'button',
		//	text: _('Browse'),
		//	handler: function() {
		//		if (!this.fileBrowser) {
		//			this.fileBrowser = new Deluge.FileBrowser();
		//		}
		//		this.fileBrowser.show();
		//	},
		//	scope: this
		//});
	},

	hide: function() {
		Deluge.MoveStorage.superclass.hide.call(this);
		this.torrentIds = null;
	},

	show: function(torrentIds) {
		Deluge.MoveStorage.superclass.show.call(this);
		this.torrentIds = torrentIds;
	},

	onCancel: function() {
		this.hide();
	},

	onMove: function() {
		var dest = this.moveLocation.getValue();
		deluge.client.core.move_storage(this.torrentIds, dest);
		this.hide();
	}
});
deluge.moveStorage = new Deluge.MoveStorage();
