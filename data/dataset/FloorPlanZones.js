Ext.define('App.model.administration.FloorPlanZones', {
	extend: 'Ext.data.Model',
	table: {
		name: 'floor_plans_zones',
		comment: 'Floor Plan Zones'
	},
	fields: [
		{
			name: 'id',
			type: 'int',
			comment: 'Floor Plan Zones ID'
		},
		{
			name: 'floor_plan_id',
			type: 'int',
			index: true
		},
		{
			name: 'code',
			type: 'string',
			len: 40,
			index: true
		},
		{
			name: 'title',
			type: 'string',
			len: 180
		},
		{
			name: 'type',
			type: 'string',
			len: 100
		},
		{
			name: 'bg_color',
			type: 'string',
			lem: 10,
			useNull: true
		},
		{
			name: 'border_color',
			type: 'string',
			lem: 10,
			useNull: true
		},
		{
			name: 'scale',
			type: 'string',
			lem: 30,
			defaultValue: 'medium'
		},
		{
			name: 'width',
			type: 'int',
			useNull: true
		},
		{
			name: 'height',
			type: 'int',
			useNull: true
		},
		{
			name: 'x',
			type: 'int'
		},
		{
			name: 'y',
			type: 'int'
		},
		{
			name: 'show_priority_color',
			type: 'bool'
		},
		{
			name: 'show_patient_preview',
			type: 'bool'
		},
		{
			name: 'active',
			type: 'bool',
			index: true
		}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'FloorPlans.getFloorPlanZones',
			create: 'FloorPlans.createFloorPlanZone',
			update: 'FloorPlans.updateFloorPlanZone',
			destroy: 'FloorPlans.removeFloorPlanZone'
		}
	}
});