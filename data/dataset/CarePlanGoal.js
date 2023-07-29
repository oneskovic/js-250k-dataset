Ext.define('App.model.patient.CarePlanGoal', {
	extend: 'Ext.data.Model',
	table: {
		name: 'patient_care_plan_goals',
		comment: 'Patient Care Plan Goals'
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
			name: 'goal',
			type: 'string',
			len: 300
		},
		{
			name: 'goal_code',
			type: 'string',
			len: 20
		},
		{
			name: 'goal_code_type',
			type: 'string',
			len: 15
		},
		{
			name: 'instructions',
			type: 'string',
			len: 500
		},
		{
			name: 'plan_date',
			type: 'date',
			dateFormat: 'Y-m-d',
			dataType: 'date'
		},
		{
			name: 'created_date',
			type: 'date',
			dateFormat: 'Y-m-d H:i:s'
		}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'CarePlanGoals.getPatientCarePlanGoals',
			create: 'CarePlanGoals.addPatientCarePlanGoal',
			update: 'CarePlanGoals.updatePatientCarePlanGoal',
			destroy: 'CarePlanGoals.destroyPatientCarePlanGoal'
		}
	}
});

