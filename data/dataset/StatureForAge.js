Ext.define('App.model.patient.charts.StatureForAge', {
	extend: 'Ext.data.Model',
	table: {
		name: 'statureforage',
		comment: 'Stature For Age'
	},
	fields: [
		{name: 'id', type: 'int', comment: 'Stature For Age ID'},
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
			type: 7
		}
	}

});