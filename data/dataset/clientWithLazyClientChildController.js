({
    makeClient : function(cmp){
        cmp.set("v.status", null)
        $A.componentService.newComponentAsync(
            this,
            function(newCmp){
                var body = cmp.get("v.body");
                body.push(newCmp);
                cmp.set("v.body", body);
            },
            "markup://loadLevelTest:clientComponent"
        );
    },

    makeServer : function(cmp){
        cmp.set("v.status", null)
        $A.componentService.newComponentAsync(
            this,
            function(newCmp){
                var body = cmp.get("v.body");
                body.push(newCmp);
                cmp.set("v.body", body);
            },
            "markup://loadLevelTest:serverComponent"
        );
    },

    makeExclusiveServer : function(cmp){
        cmp.set("v.status", null)
        $A.componentService.newComponentAsync(
            this,
            function(newCmp){
                var body = cmp.get("v.body");
                body.push(newCmp);
                cmp.set("v.body", body);
            },
            {
                componentDef : "markup://loadLevelTest:serverComponent",
                load : "EXCLUSIVE"
            }
        );
    },

    waiting : function(cmp){
        cmp.set("v.status", "Waiting for Server")
    },

    doneWaiting : function(cmp){
        cmp.set("v.status", null)
    }
})
