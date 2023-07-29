({
    press: function(cmp, event, helper) {
        var localId = event.source.getLocalId();

        // Extract flags

        var data = localId.split(" ");
        var target = data[0];
        var language = data[1];

        // Build messages
        var targetCmp = cmp.find(target);
        var text;
        if (targetCmp) {
             text = "- Setting " + target + " to " + language;
        } else {
             text = "- Can't set " + target + " to " + language + " (expected if outter was set)";
        }

        // Log action directly in the DOM to avoid rendering cycle

        var log = cmp.find("log").getElement();
        log.appendChild(document.createTextNode(text));
        log.appendChild(document.createElement("br"));

        // Change the DOM via components

        if (targetCmp) {

            var message;
            switch (language) {
                case "Spanish":
                    message = "¡Hola!";
                    break;

                case "French":
                    message = "Bonjour!";
                    break;
            }

            var newCmp = $A.componentService.newComponent({
                "componentDef" : "markup://ui:outputText",
                "attributes": {
                    "values": {
                        "value": message
                    }
                }
            });

            targetCmp.set("v.body", [newCmp]);
        }
    }
})
