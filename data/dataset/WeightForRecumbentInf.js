Ext.define('App.model.patient.charts.WeightForRecumbentInf', {
	extend: 'Ext.data.Model',
	table: {
		name: 'weightforrecumbentinf',
		comment: 'Weight For Recumbent Information'
	},
	fields: [
		{name: 'id', type: 'int', comment: 'Weight For Recumbent Information ID'},
		{name: 'age', type: 'float'},
		{name: 'PP', type: 'float'},
		{name: 'P3', type: 'float'},
		{name: 'P5', type: 'float'},
		{name: 'P10', type: 'float'},
		{name: 'P25', type: 'float'},
		{name: 'P50', type: 'float'},
		{name: 'P75', type: 'float'},
		{name: 'P90', type: 'float'},
		{name: 'P95', type: 'float'},
		{name: 'P97', type: 'float'}
	],
	proxy: {
		type: 'direct',
		api: {
			read: 'VectorGraph.getGraphData'
		},
		reader: {
			type: 'json'
		},
		extraParams: {
			type: 3
		}
	}

});