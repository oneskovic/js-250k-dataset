({
    init: function (cmp) {
    	var totalItems = cmp.get("v.totalItems");
    	
    	if (totalItems && totalItems == 0) {
    		cmp.set("v.totalItems", 25);
    	}
    },

    handleProvide: function (cmp, evt, hlp) {
    	if (cmp.get('v.throwError')) {
    		cmp.getEvent("error").setParams({error: {throwError: true}}).fire();
    		return;
    	}
    	
        var currentPage = cmp.get('v.currentPage'),
            pageSize = cmp.get('v.pageSize'),
            sortBy = cmp.get('v.sortBy'),
            tasks = hlp.createTasks(cmp),
            column = sortBy, 
            descending = false,
        	requestedTasks;
        
        if (column && column.indexOf('-') === 0) {
            column = sortBy.slice(1);
            descending = true;
        }

        if (column) {
            hlp.sort(tasks, column, descending);
        }
        
        // Paginate
        requestedTasks = hlp.applyPagination(tasks, currentPage, pageSize);

        hlp.fireDataChangeEvent(cmp, requestedTasks);
    }
})