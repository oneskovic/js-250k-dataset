Ext.define('App.model.administration.DocumentsTemplates', {
	extend: 'Ext.data.Model',
	table: {
		name: 'documents_templates',
		comment: 'Documents Templates',
		data: 'App.data.administration.DocumentTemplates'
	},
	fields: [
		{
			name: 'id',
			type: 'int',
			comment: 'Documentation Templates ID'
		},
		{
			name: 'title',
			type: 'string',
			len: 50
		},
		{
			name: 'template_type',
			type: 'string',
			len: 50
		},
		{
			name: 'body',
			type: 'string',
			dataType: 'text'
		},
		{
			name: 'date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s',
			comment: 'to be replace by created_date'
		},
		{
			name: 'created_date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},
		{
			name: 'updated_date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},
		{
			name: 'created_by_uid',
			type: 'int'
		},
		{
			name: 'updated_by_uid',
			type: 'int'
		}
	]
});