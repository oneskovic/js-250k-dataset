Ext.define('App.model.patient.Dental', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int', comment: 'Dental Data ID'},
		{name: 'eid', type: 'int'},
		{name: 'pid', type: 'int'},
		{name: 'created_uid', type: 'int'},
		{name: 'updated_uid', type: 'int'},
		{name: 'create_date', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{name: 'cdt_code', type: 'string'},
		{name: 'description', type: 'string'},
		{
			name: 'begin_date',
			type: 'date',
			dateFormat: 'Y-m-d'
		},
		{
			name: 'end_date',
			type: 'date',
			dateFormat: 'Y-m-d'
		},
		{name: 'ocurrence', type: 'string'},
		{name: 'referred_by', type: 'string'},
		{name: 'outcome', type: 'string'},
		{name: 'destination', type: 'string'},
		{name: 'alert', type: 'bool'}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'Medical.getPatientDental',
			create: 'Medical.addPatientDental',
			update: 'Medical.updatePatientDental'
		}
	}
});