({  
    testEmpty: {
        attributes : {thang : ''},
        test: function(component){
            this.whatItIs(component, "Empty string", false);

            $A.run(function() {
                // Making sure that globalId for client side component ends with 'c'
                var newCmp;
                $A.newCmpAsync(
                    this,
                    function(component){
                        newCmp = component;
                    },
                    {
                        "componentDef": "markup://ifTest:testIf"
                    }
                );
                $A.test.addWaitFor(false, $A.test.isActionPending, function(){
                    var reg = /:c/; 
                    $A.test.assertNotNull(newCmp.getGlobalId().match(reg), "GlobalId for clientSide cmp should end with "
                            + "'c' but it is" + newCmp.getGlobalId());
                });
            });
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

    // TODO(W-1419175): onchange events don't fire across function expressions
    _testRerender: {
        attributes : {thang : "true"},
        test: function(component){
            this.whatItIs(component, "Testing Renrender: true", true);
            component.set("v.thang", false);
            $A.rerender(component);
            this.whatItIs(component, "Testing Rerender: false", false);
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
