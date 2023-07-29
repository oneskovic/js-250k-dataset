({
	fireSelectedItemsChange: function (cmp, data) {
		cmp.getEvent('onselecteditemschange').setParams({
			data: data
		}).fire();
	},

	
	fireProvide: function (concrete) {
		if (concrete._dataProviders[0]) {
			concrete._dataProviders[0].getEvent('provide').fire();
		}
	},

	/**
	 * All initialization logic must apply to all child components.
	 * If any init logic may be overrideable, put it in a different function.
	 */
	initialize: function (cmp) {
		this.initializeDataProviders(cmp);
	},

	initializeDataProviders: function(cmp) {
        var concrete = cmp.getConcreteComponent(),
        	dataProviders = cmp.get("v.dataProvider");

        concrete._dataProviders = [];

        for (var n = 0; n < dataProviders.length; n++) {
        	var dp = dataProviders[n];
    		dp.addHandler("onchange", cmp, "c.handleDataChange");
    		concrete._dataProviders.push(dp);
        }

        cmp.set("v.dataProvider", dataProviders);

        if (concrete._dataProviders.length > 0) {
        	this.fireProvide(concrete);
        }
    },

	/**
	 * Handles refresh. By default, provide is fired against the dataProvider.
	 */
	handleRefresh: function (concrete) {
		this.fireProvide(concrete);
	},

	/**
	 * Implement logic in concrete.
	 *
	 * @param {Component} AbstractDataGrid component
	 */
    deriveItemShape: function (cmp) {
    	$A.error('Unimplemented function in abstractDataGridHelper');
    },

    /**
	 * Implement logic in concrete.
	 */
    handleDataChange: function (concrete, data) {
    	concrete.set('v.items', data);
    },

    /**
	 * Implement logic in concrete.
	 */
    handleDataChange: function (concrete, data) {
    	concrete.set('v.items', data);
    },

	/**
	 * Implement logic in concrete.
	 *
	 * @param {Component} AbstractDataGrid component
	 */
	handleModeChange: function (cmp) {
		$A.error('Unimplemented function in abstractDataGridHelper');
	},

	/**
	 * Implement logic in concrete.
	 */
	handleSortByChange: function (concrete) {
		$A.error('Unimplemented function in abstractDataGridHelper');
	},

	/**
	 * Implement logic in concrete.
	 *
	 * @param {Component} AbstractDataGrid component
	 * @param {Object} params from ui:dataGridInsert
	 */
	handleAddRemove: function (cmp, params) {
		$A.error('Unimplemented function in abstractDataGridHelper');
	}
});