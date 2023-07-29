 ({
    provide: function(component, event, helper){
    	component = component.getConcreteComponent();
    	var isGetDataFromServer = component.get("v.getDataFromServer");
    	var listType = component.get("v.listType")
    	var currentPage = component.get("v.currentPage");
	var multiplier = component.get("v.multiplier");
        var pageSize = component.get("v.pageSize") * multiplier;
        var start = (currentPage - 1) * pageSize;
	var limit = start+pageSize;
        var data = [];
        
        if (listType === "single") {
        	limit = start+1;
        }
        
        if (isGetDataFromServer) {
        	var action = component.get("c.getList");
        	
        	action.setParams({
        		"start" : start,
        		"limit" : limit
        	});
        	
        	action.setCallback(this, function(action) {
        		if (action.getState() === "SUCCESS") {
        			data = action.getReturnValue();
        			helper.fireDataChangeEvent(component, data);
        		}
        	});
        	$A.enqueueAction(action);
        } else {
        	for (var i=start; i<limit; i++) {
        		data.push({
        			index: i+1,
        			char: String.fromCharCode(65 + (i%26))
        		});
        	}
        
	        // TODO: figure out why this server hit is necessary to get the parent scroller to refresh...
	        
	        var action = component.get("c.dummy");
	    	action.setCallback(this, function(action) {
				// we don't actually care--we just want the server action lifecycle to fire so the scroller will refresh...
			    
	        	helper.fireDataChangeEvent(component, data); 
	    	});
	    	this.runAfter(action);
	    	
			// this should be all that's needed...        
	        //helper.fireDataChangeEvent(component, data);
    	}
    }
})