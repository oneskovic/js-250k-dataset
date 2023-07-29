({
    /**
     * Verify setting disabled attribute.
     */
    testDisabled: {
        attributes : {disabled: true},
        test: function(component){
            $A.test.assertTrue(component.find("select").getElement().disabled, "Element not correctly disabled");
        }
    },
    /**
     * Verify not setting disabled attribute.
     */
    testNotDisabled: {
        attributes : {disabled: false},
        test: function(component){
            $A.test.assertFalse(component.find("select").getElement().disabled, "Element not correctly enabled");
        }
    },
    /**
     * Verify setting name attribute.
     */
    testName:{
        attributes : {name: 'select'},
        test: function(component){
            $A.test.assertEquals('select', component.find("select").getElement().name, "Name attribute not correct");
        }
    },
    /**
     * Verify setting multiple attribute.
     */
    testMultiple: {
        attributes : {name: 'select', multiple: true},
        test: function(component){
            $A.test.assertEquals(true, component.find("select").getElement().multiple, "Multiple attribute not correct");
        }
    },
    /**
     * Verify setting size attribute.
     */
    testSize: {
        attributes : {name: 'select', size: '5'},
        test: function(component){
            $A.test.assertEquals(5, component.find("select").getElement().size, "Size attribute not correct");
        }
    }
})
