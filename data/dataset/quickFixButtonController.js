({
    fix : function(cmp, evt){
        var quickFix = cmp.get("v.quickFix");
        var ui = quickFix["ui"];
        if (ui) {
            $A.newCmpAsync(
                this,
                function(newCmp){
                    var show = cmp.getEvent("showUI");
                    show.setParams({
                        ui : newCmp
                    });
                    show.fire();
                },
                {
                    componentDef: ui,
                    attributes: {
                        values: {
                            quickFix: quickFix
                        }
                    }
                }
            );
        } else {
            var a = cmp.get("c.doFix");
            a.setParams({
                name: quickFix["name"],
                attributes: quickFix["attributes"]
            });

            a.setCallback(cmp, function(action){
                alert("woohoo");
            });

            $A.enqueueAction(a);
        }
    }
})
