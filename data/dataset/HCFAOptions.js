Ext.define('App.model.patient.HCFAOptions', {
	extend: 'Ext.data.Model',
	table: {
		name: 'encounter_1500_options'
	},
	fields: [
		{
			name: 'id',
			type: 'int'
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
			name: 'date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		},
		{
			name: 'employment_related',
			type: 'bool'
		},
		{
			name: 'auto_accident',
			type: 'bool'
		},
		{
			name: 'state',
			type: 'string',
			len: 80
		},
		{
			name: 'other_accident',
			type: 'bool'
		},
		{
			name: 'similar_illness_date',
			type: 'date',
			dataType: 'date',
			dateFormat: 'Y-m-d'
		},
		{
			name: 'unable_to_work_from',
			type: 'date',
			dataType: 'date',
			dateFormat: 'Y-m-d'
		},
		{
			name: 'unable_to_work_to',
			type: 'date',
			dataType: 'date',
			dateFormat: 'Y-m-d'
		},
		{
			name: 'hops_date_to',
			type: 'date',
			dataType: 'date',
			dateFormat: 'Y-m-d'
		},
		{
			name: 'out_lab_used',
			type: 'bool'
		},
		{
			name: 'amount_charges',
			type: 'string',
			len: 10
		},
		{
			name: 'medicaid_resubmission_code',
			type: 'string',
			len: 15
		},
		{
			name: 'medicaid_original_reference_number',
			type: 'string',
			len: 60
		},
		{
			name: 'prior_authorization_number',
			type: 'string',
			len: 60
		},
		{
			name: 'replacement_claim',
			type: 'bool'
		},
		{
			name: 'notes',
			type: 'string',
			dataType: 'text'
		}
	],
	proxy: {
		type: 'direct',
		api: {
			update: 'Encounter.updateHCFA'
		}
	},
	belongsTo: {
		model: 'App.model.patient.Encounter',
		foreignKey: 'eid'
	}
});