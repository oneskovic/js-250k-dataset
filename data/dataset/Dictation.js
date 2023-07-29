Ext.define('App.model.patient.Dictation', {
	extend: 'Ext.data.Model',
	table: {
		name: 'encounter_dictation',
		comment: 'Dictation Panel Data'
	},
	fields: [
		{
			name: 'id',
			type: 'int'
		},
		{
			name: 'pid',
			type: 'int',
			index: true
		},
		{
			name: 'eid',
			type: 'int',
			index: true
		},
		{
			name: 'uid',
			type: 'int'
		},
		{
			name: 'date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},
		{
			name: 'dictation',
			type: 'string',
			dataType: 'longtext'
		},
		{
			name: 'additional_notes',
			type: 'string',
			dataType: 'longtext'
		}
	],
	proxy: {
		type: 'direct',
		api: {
			update: 'Encounter.updateDictation'
		}
	},
	belongsTo: {
		model: 'App.model.patient.Encounter',
		foreignKey: 'eid'
	}
});