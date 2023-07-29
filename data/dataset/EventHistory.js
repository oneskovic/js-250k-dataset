Ext.define('App.model.patient.EventHistory', {
	extend: 'Ext.data.Model',
	table: {
		name: 'encounter_history'
	},
	fields: [
		{
			name: 'id',
			type: 'int',
			comment: 'Event History ID'
		},
		{
			name: 'eid',
			type: 'int'
		},
		{
			name: 'date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},
		{
			name: 'user',
			type: 'string',
			len: 80
		},
		{
			name: 'event',
			type: 'string',
			len: 600
		}
	]
});

