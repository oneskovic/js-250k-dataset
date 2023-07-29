({
    // mostly the same tests as testIfTest
    testEmpty: {
        attributes : {thang : ''},
        test: function(component){
            this.whatItIs(component, "Empty string", false);
        }
    },

    testUndefined: {
        test: function(component){
            this.whatItIs(component, "Undefined", false);
        }
    },

    testTrue: {
        attributes : {thang : 'true'},
        test: function(component){
            this.whatItIs(component, "true", true);
        }
    },

    testFalse: {
        attributes : {thang : 'false'},
        test: function(component){
            this.whatItIs(component, "false", false);
        }
    },

    testLiterals: {
        test: function(component){
            $A.test.assertNull($A.test.getElementByClass("itIsLiterallyFalse"), "Literal false didn't evaluate as false");
            $A.test.assertNotNull($A.test.getElementByClass("itIsLiterallyNotFalse"), "Literal true evaluated as false");
        }
    },

    whatItIs : function(component, name, value){
        if (!value) {
            $A.test.assertNotNull($A.test.getElementByClass("itIsFalse"), name+" didn't evaluate as false");
            $A.test.assertNull($A.test.getElementByClass("itIsTrue"), name+" evaluated as true");
        }else{
            $A.test.assertNotNull($A.test.getElementByClass("itIsTrue"), name+" didn't evaluate as true");
            $A.test.assertNull($A.test.getElementByClass("itIsFalse"), name+" evaluated as false");
        }
    }
})