/*jslint plusplus: false, nomen: false */
/*global require: false */
"use strict";

require.modify("rdw/Message", "rdw/ext/MessageDebug-rdw/Message",
["rd", "dojo", "rdw/Message"],
function (rd, dojo, Message) {

    rd.addStyle("rdw/ext/css/MessageDebug");

    rd.applyExtension("rdw/ext/MessageDebug", "rdw/Message", {
        after: {
            /** Adds debug links to show documents associated with message */
            postCreate: function () {
                //NOTE: the "this" in this function is the instance of rdw/Message.

                //Create a node to hold the debug links
                var debugNode = dojo.create("div", {
                        "class": "debug"
                    }),
                    prop, schema;

                //Loop over the sources and add links for each kind.
                for (prop in this.msg.schemas) {
                    if (this.msg.schemas.hasOwnProperty(prop)) {
                        schema = this.msg.schemas[prop];
                        if (!schema._id) {
                            continue;
                        }
                        dojo.create("a", {
                            "class": "tag",
                            target: "_blank",
                            title: schema.rd_schema_id,
                            href: "http://127.0.0.1:5984/_utils/document.html?raindrop/" + encodeURIComponent(schema._id),
                            innerHTML: schema.rd_schema_id.replace(/rd\.msg\./, '')
                        }, debugNode);
                    }
                }

                //Attach the debug div to the Messsage.
                dojo.query(".message", this.domNode).addContent(debugNode);
            }
        }
    });
});
