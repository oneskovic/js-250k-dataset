({
    /**
     * Positive test case: Verify that chaining works with java controllers.
     *   Also verify the sequence of controllers called. using Addition, multiplication and subtraction helps in verifying the sequence.
     */
    testChainingLocalActions:{
        test:function(cmp){
            var multiply = $A.test.getAction(cmp,"c.multiply", {"a" : 2},
                                                        function(action){
                                                            //If the call backs are in order, then this attribute will have the value set by c.add's call back
                                                            $A.test.assertEquals("1", cmp.get('v.responseOrder'), "Action chaining did not preserve order at client.");
                                                            cmp.set('v.responseOrder', "2");
                                                        });
            multiply.setChained();

            var subtract = $A.test.getAction(cmp,"c.subtract",{"a" : 99},
                                                        function(action){
                                                            //If the call backs are in order, then this attribute will have the value set by c.multiply's call back
                                                            $A.test.assertEquals("2", cmp.get('v.responseOrder'), "Action chaining did not preserve order at client.");
                                                            cmp.set('v.responseOrder', "3");
                                                    });
            subtract.setChained();

            var add = $A.test.getAction(cmp,"c.add",{
                                        "a" : 1, "b" : 99,
                                        "actions": $A.util.json.encode({
                                            actions: [multiply, subtract]
                                        })
                                    },function(action){
                                            //If the call backs are in order, then this attribute will have the default value
                                            $A.test.assertEquals("", cmp.get('v.responseOrder'), "Action chaining did not preserve order at client.");
                                            cmp.set('v.responseOrder', "1");
                                    });
            $A.enqueueAction(add);
            cmp.getEvent("press").fire();
            $A.test.addWaitFor("SUCCESS",
                       function(){return subtract.getState();},
                       function(){
                           $A.test.assertEquals(100, add.getReturnValue(), "Action chaining did not preserve order at server.");
                           $A.test.assertEquals(200, multiply.getReturnValue(), "Action chaining did not preserve order at server.");
                           $A.test.assertEquals(101, subtract.getReturnValue(), "Action chaining did not preserve order at server.");
                       });
        }
    }
})
