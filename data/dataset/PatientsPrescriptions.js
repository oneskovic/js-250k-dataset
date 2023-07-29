Ext.define('App.model.patient.PatientsPrescriptions', {
	extend: 'Ext.data.Model',
	fields: [
		{
			name: 'id',
			type: 'int',
			comment: 'Patient Prescription ID'
		},
		{
			name: 'pid',
			type: 'int'
		},
		{
			name: 'eid',
			type: 'int'
		},
		{
			name: 'uid',
			type: 'int'
		},
		{
			name: 'created_date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		} ,
		{
			name: 'note',
			type: 'string'
		},
		{
			name: 'document_id',
			type: 'int'
		},
		{
			name: 'docUrl',
			type: 'string'
		},
		{
			name: 'medications'
		}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'Prescriptions.getPrescriptions',
			create: 'Prescriptions.addPrescription',
			update: 'Prescriptions.updatePrescription'
		}
	}
});