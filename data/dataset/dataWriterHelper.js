({
	handleItemsChange: function (cmp, params) {
		var concrete = cmp.getConcreteComponent(),
			sync = cmp.get('v.sync');

		if (!concrete._resetting && sync) {
			this.handleWrite(cmp);
		}
	},

	handleWrite: function (cmp) {
		var items 			= cmp.get('v.items'),
			defaultFields 	= cmp.get('v.defaultFields'),
			cfg  			= {},
			item, list;

		// Break appart operations into a separate lists on a single config object.
		for (var i = 0; i < items.length; i++) {
			item = items[i];

			if (!item || !item.operation) {
				return $A.error('Invalid data format. Specify the desired operation.');
			}

			if (defaultFields) {
				for (var f in defaultFields) {
					
					// Copy defaultFields onto item object if not set.
					if (!item[f]) {
						item[f] = defaultFields[f];
					}
				}
			}

			if (!cfg[item.operation]) { 
				cfg[item.operation] = []; 
			}

			cfg[item.operation].push(item.record);
		}

		// Delegate actual server action to concrete implementation.
		// Run appropriate actions based on the response. 
		this.write(cmp.getConcreteComponent(), cfg, function (err, data) {
			if (err) { 
				cmp.get('e.onerror').setParams({ value: { error: err, items: items } }); 
			}
			else {
				cmp.get('e.onsuccess').setParams({ value: { data: data, items: items } });
			} 
		});
	},

	/**
	 * Implement write logic in a concrete helper.
	 *
	 * @param {Component} concrete 
	 * @params {Object} cfg { operation => [] }
	 * @params {Function} callback optional callback to invoker of write operation function (error, response)
	 */
	write: function (concrete, cfg, callback) {
		$A.error('Unimplemented function! dataWriterHelper#write should be implemented in a concrete helper.');
	}
})