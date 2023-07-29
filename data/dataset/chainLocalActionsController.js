({
    handleClick:function(cmp){
        var multiply = cmp.get("c.multiply");
        multiply.setParams({
            "a" : 2
        });
        multiply.setCallback(cmp, function(action){
            $A.log(action.getReturnValue());//Should be 200
        });
        multiply.setChained();
        var subtract = cmp.get("c.subtract");
        subtract.setParams({
            "a" : 99
        });
        subtract.setCallback(cmp, function(action){
            $A.log(action.getReturnValue());//Should be 101
        });
        subtract.setChained();

        var add = cmp.get("c.add");
        add.setParams({
            "a" : 1,
            "b" : 99,
            "actions": $A.util.json.encode({
                actions: [multiply, subtract]
            })
        });
        add.setCallback(cmp, function(action){
            $A.log(action.getReturnValue());//Should be 100
        });
        $A.enqueueAction(add);
    },

    callServerButPassNoChainedActions:function(cmp){
        var a = cmp.get("c.add");
        a.setCallback(cmp, function(action){
            $A.log(action.getError());
            $A.log(action.getReturnValue())
        });
        a.setParams({
            "a" : 1,
            "b" : 99,
            "action1" : null
        });
        $A.enqueueAction(a);
    }
})
