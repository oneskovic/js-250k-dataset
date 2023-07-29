({
    /**
     * Verify that aura:beforeLayoutChange is fired before a layout change
     * IE789 excluded: history service was not previously supported in IE
     */
    //TODO: W-1635821 - fix this flapper
    _testEventsPreAndPostLayoutChange:{
	browsers:["-IE7", "-IE8", "-IE9"],
	labels : ["UnAdaptableTest"],
	test:[
	      function(cmp){
		  $A.test.setTestTimeout(5000);
		  //Use history service to change layout to STEP 2
		  $A.historyService.set("Step2");
		  $A.test.addWaitFor(true, function() {
			return cmp._layoutChanging;
        		}, function() {
        		    this.assertEvntParams(cmp,{"prevLayoutName": "default", "prevTitle":"Step 0"}, 
        			    {"layoutName":"Step2", "title": "Step 2"}, true);
        		});
		  $A.test.addWaitFor(true, function() {
			return cmp._layoutChanged;
          		}, function() {
          		    this.assertEvntParams(cmp,{"prevLayoutName": "default", "prevTitle":"Step 0"}, 
          			    {"layoutName":"Step2", "title": "Step 2"}, false);
          		});
	      },function(cmp){
		  //Use layout service to change layout to STEP 1
		  $A.layoutService.layout("Step1");
		  $A.test.addWaitFor(true, function() {
			return cmp._layoutChanging;
      			}, function() {
      			    	this.assertEvntParams(cmp,{"prevLayoutName": "Step2", "prevTitle":"Step 2"}, 
      			    		{"layoutName":"Step1", "title": "Step 1"}, true);
      			});
		  $A.test.addWaitFor(true, function() {
			return cmp._layoutChanged;
        		}, function() {
        		    this.assertEvntParams(cmp,{"prevLayoutName": "Step2", "prevTitle":"Step 2"}, 
  			    		{"layoutName":"Step1", "title": "Step 1"}, false);
        		});
	      },function(cmp){
		  //Use layout service to go back to previous state, STEP 2
		  $A.layoutService.back();
		  $A.test.addWaitFor(true, function() {
			return cmp._layoutChanging;
    			}, function() {
    			    this.assertEvntParams(cmp,{"prevLayoutName": "default", "prevTitle":"Step 0"}, 
    				    	{"layoutName":"Step2", "title": "Step 2"}, true);
    			});
		  $A.test.addWaitFor(true, function() {
			return cmp._layoutChanged;
      			}, function() {
      			    this.assertEvntParams(cmp,{"prevLayoutName": "default", "prevTitle":"Step 0"}, 
			    		{"layoutName":"Step2", "title": "Step 2"}, false);
      			});
	      }]
    },
    assertEvntParams: function(cmp , prevLayoutParams, currentLayoutParams, preLayoutChange ){
	var evt;
	if(preLayoutChange){
	    $A.test.assertDefined(cmp._beforeLayoutChangeEvt, "aura:beforeLayoutChange event not fired before layout changed");
	    evt = cmp._beforeLayoutChangeEvt;
	    cmp._layoutChanging = false; 
	}else{
	    $A.test.assertDefined(cmp._layoutChangeEvt, "aura:layoutChange event not fired after layout changed");
	    evt = cmp._layoutChangeEvt;
	    cmp._layoutChanged = false;
	}
	$A.test.assertEquals(currentLayoutParams.layoutName, evt.getParam("layoutName"));
	$A.test.assertEquals(currentLayoutParams.title, evt.getParam("title"));
	$A.test.assertEquals(prevLayoutParams.prevLayoutName, evt.getParam("prevLayoutName"));
	$A.test.assertEquals(prevLayoutParams.prevTitle, evt.getParam("prevTitle"));
    }

})