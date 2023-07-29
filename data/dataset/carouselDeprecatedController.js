({
	onInit : function(cmp, evt, helper) {
		helper.init(cmp);
	},
	
	onPageComponentsChanged: function(cmp, evt, helper) {		
    	helper.initPages(cmp); 
    },
    
    /**
     * Handle scrollStart event coming from scroller
     */
    onScrollMove : function(cmp, evt, helper) {
    	helper.handleScrollMove(cmp, evt);
    },
    
    /**
     * Handle scrollEnd event coming from scroller
     */
    onScrollEnd : function(cmp, evt, helper) {  	
    	helper.handleScrollEnd(cmp, evt);
    },
    
    /**
     * Handle scroller refreshed event
     */
    onScrollerRefreshed: function(cmp, evt, helper) {    	
		//fire selectDefaultPage only after the the scroller has initialized and ready
		var e = cmp.getEvent("selectDefaultPage");
		e.fire();    	
    },
     
    /**
     * Handle window resize event
     */      
	refresh: function(cmp, evt, helper) {	
        helper.refresh(cmp, evt);
    },
    

    onRefreshCurrentPage: function(cmp, evt, helper) {
    	var curPage = cmp.get('v.priv_currentPage');
    	var pages = helper.getPageComponents(cmp);
    	
    	if (curPage > 0 && curPage <= pages.length) {
	    	var e = cmp.get('e.loadPage'),
	    		pageCmp = helper.getPageComponentFromIndex(cmp, curPage),
	    		pageModel = helper.getPageModelFromIndex(cmp, curPage);
	    	
			e.setParams({pageModel: pageModel, pageComponent: pageCmp, pageIndex: curPage});    			
			e.fire();
    	}
    },
    
    /**
     * Handle clicking event from page indicator
     */
    pagerClicked: function (cmp, evt, helper) {    	
        var pageIndex = evt.getParam("pageIndex");
        
        helper.handlePagerClicked(cmp, pageIndex);
        
        if (evt.preventDefault) evt.preventDefault();
    },

    /**
     * Handle key event from page indicator
     */
    pagerKeyed: function (cmp, evt, helper) {	
        helper.handlePagerKeyed(cmp, evt);
    },    
    
    selectDefaultPage: function (cmp, evt, helper) {   	
    	if (cmp.isRendered()) {
    		helper.selectDefaultPage(cmp, evt);
    	}
    }
})
