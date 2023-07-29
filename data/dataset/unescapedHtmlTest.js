({
    /**
     * Empty string value renders no elements.
     */
    // W-1132685 - https://gus.salesforce.com/a07B0000000KzSX
    testValueEmptyString: {
        attributes : { value: "" },
        test: [function(component){
                var cmp = component.find("value");
                $A.test.assertTrue($A.util.isEmpty(cmp.getElements()), "no elements should have been rendered");
                component.find("toggle").get("e.press").fire();
                $A.test.addWaitFor(true, function(){
                    return !component.isDirty("v.value");
                });
            }, function(component){
                var cmp = component.find("value");
                var e = cmp.getElement();
                $A.test.assertEquals("B", e.tagName.toUpperCase());
                $A.test.assertEquals("some value", $A.test.getText(e) || e.innerText, "new value not rendered");
                component.find("toggle").get("e.press").fire();
                $A.test.addWaitFor(true, function(){
                    return !component.isDirty("v.value");
                });
            }, function(component){
                var cmp = component.find("value");
                $A.test.assertTrue($A.util.isEmpty(cmp.getElements()), "previous element was not unrendered");
            }]
    },

    /**
     * Undefined value renders no elements.
     */
    // W-1132685 - https://gus.salesforce.com/a07B0000000KzSX
    testValueMissing: {
        test: [function(component){
                var cmp = component.find("value");
                $A.test.assertTrue($A.util.isEmpty(cmp.getElements()), "no elements should have been rendered");
                component.find("toggle").get("e.press").fire();
                $A.test.addWaitFor(true, function(){
                    return !component.isDirty("v.value");
                });
            }, function(component){
                var cmp = component.find("value");
                var e = cmp.getElement();
                $A.test.assertEquals("B", e.tagName.toUpperCase());
                $A.test.assertEquals("some value", $A.test.getText(e) || e.innerText, "new value not rendered");
                component.find("toggle").get("e.press").fire();
                $A.test.addWaitFor(true, function(){
                    return !component.isDirty("v.value");
                });
            }, function(component){
                var cmp = component.find("value");
                $A.test.assertTrue($A.util.isEmpty(cmp.getElements()), "previous element was not unrendered");
            }]
    },

    /**
     * Null value renders no elements.
     */
    // W-1132685 - https://gus.salesforce.com/a07B0000000KzSX
    testValueNull: {
        test: [function(component){
                var cmp = component.find("null");
                $A.test.assertTrue($A.util.isEmpty(cmp.getElements()), "no elements should have been rendered");
                component.find("toggle").get("e.press").fire();
                $A.test.addWaitFor(true, function(){
                    return !component.isDirty("v.value");
                });
            }, function(component){
                var cmp = component.find("null");
                $A.test.assertTrue($A.util.isEmpty(cmp.getElements()), "still no elements should have been rendered");
            }]
    }
})
