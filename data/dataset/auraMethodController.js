({	
	hasAttr: function(cmp, event, helper) {
		 var stringAttr = event.getParam('arguments').stringAttr;
	     if (stringAttr) {
	    	 cmp.set("v.outputStringAttr",stringAttr+", return from hasAttr");
	     } else {
	    	 $A.error("did not get the value from stringAttr");
	     }
	},
	
	noAttr : function(cmp, event, helper) {
		var paramArray = event.getParam('arguments');
		if(paramArray) {
			if(paramArray.length >= 0) {//array
				cmp.set("v.outputStringAttr","paramArray: "+paramArray.join()+", return from noAttr");
			} else {//object
				$A.error("This should not happen as we don't have attributes at all");
			}
		} else {//undefined
			$A.error("Did not get the argument");//cmp.set("v.outputStringAttr", "return from noAttr")
		}
	},
	
	//for method:withActionHasAttr
	funcHasAttr : function(cmp, event, helper) {
		var stringAttr = event.getParam('arguments').stringAttr;
	     if (stringAttr) {
	    	 cmp.set("v.outputStringAttr",stringAttr+", return from withActionHasAttr");
	     } else {
	    	 $A.error("did not get the value from stringAttr");
	     }
	},
	
	//for method:withActionNoAttr
	funcNoAttr : function(cmp, event, helper) {
	    cmp.set("v.outputStringAttr","return from withActionNoAttr");
	},
	
	//this function is not suppose to get called, as we pass in different action-name(funcNoAttr) to the method
	withActionNoAttr : function(cmp, event, helper) {
		$A.error("we are calling withActionNoAttr, instead of passed in action");
	},
	
	methodFromInterface : function(cmp, event, helper) {
		//Careful here: stringAttr is a attribute of method in interface. stringAttr2 is the same method in this component
		var stringAttr2 = event.getParam('arguments').stringAttr2;
	    if (stringAttr2) {
	    	cmp.set("v.outputStringAttr",stringAttr2+", return from methodFromInterface");
	    } else {
	    	 $A.error("did not get the value from stringAttr2");
	     }
	}
	
})