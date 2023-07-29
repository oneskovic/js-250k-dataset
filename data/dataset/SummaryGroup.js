/*jslint nomen: false, plusplus: false */
/*global require: false */
"use strict";

require.def("rdw/SummaryGroup",
["rd", "dojo", "rdw/_Base", "rd/onHashChange"],
function (rd, dojo, Base, onHashChange) {

    return dojo.declare("rdw.SummaryGroup", [Base], {
        templateString: '<div class="rdwSummaryGroup WidgetBox"></div>',

        //List of topics to listen to and modify contents based
        //on those topics being published. Note that this is an object
        //on the rdw.SummaryGroup prototype, so modifying it will affect
        //all instances. Reassign the property to a new object to affect
        //only one instance.
        topics: {
        },

        /** Dijit lifecycle method after template insertion in the DOM. */
        postCreate: function () {
            //Register for hashchange events so widget can update its state to
            //reflect the hash state.
            this.subscribe("rd/onHashChange", "onHashChange");
        },

        onHashChange: function (value) {
            value = value || "rd:home";
            this.clear();
            var topic = rd.getFragIdTopic(value),
                funcName = this.topics[topic.name];
            if (funcName) {
                this[funcName](topic.data);
            }
        },

        clear: function () {
            this.destroyAllSupporting();
            this.domNode.innerHTML = "";     
        }
    });
});
