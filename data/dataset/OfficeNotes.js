Ext.define('App.model.miscellaneous.OfficeNotes', {
	extend: 'Ext.data.Model',
	table: {
		name: 'office_notes',
		comment: 'Office Notes'
	},
	fields: [
		{
			name: 'id',
			type: 'int',
			comment: 'Office Notes ID'
		},
		{
			name: 'date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},
		{
			name: 'body',
			type: 'string'
		},
		{
			name: 'user',
			type: 'string'
		},
		{
			name: 'facility_id',
			type: 'string'
		},
		{
			name: 'activity',
			type: 'string'
		}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'OfficeNotes.getOfficeNotes',
			create: 'OfficeNotes.addOfficeNotes',
			update: 'OfficeNotes.updateOfficeNotes'
		}
	}
});