Ext.define('App.model.administration.ExternalDataLoads', {
	extend: 'Ext.data.Model',
	table: {
		name: 'externaldataloads',
		comment: 'External Data Loads'
	},
	fields: [
		{
			name: 'id',
			type: 'int',
			comment: 'External Data Loads ID'
		},
		{
			name: 'date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},
		{
			name: 'version',
			type: 'string'
		},
		{
			name: 'path',
			type: 'string'
		},
		{
			name: 'basename',
			type: 'string'
		},
		{
			name: 'codeType',
			type: 'string'
		}
	]
});