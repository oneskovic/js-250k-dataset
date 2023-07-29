/*jslint plusplus: false */
/*global require: false, location: false, setInterval: false, setTimeout: false */
"use strict";

//Simple utility that watches for hash changes and then publishes changes.
require.def("rd/onHashChange", ["rd", "dojo"], function (rd, dojo) {
    var value = location.href.split("#")[1] || "", interval,
        onHashChange = { value: value },
        oldSubscribe = dojo.subscribe;

    //Override Dojo's subscribe to notify subscriber to hash change topics
    //to notify them of the current value on subscription.
    dojo.subscribe = function (topic, context, method) {
        var handle = oldSubscribe.apply(dojo, arguments), frag;
        if (topic === "rd/onHashChange") {
            dojo.hitch(context, method)(onHashChange.value);
        }
        return handle;
    };

    interval = setInterval(function () {
        var newValue = location.href.split("#")[1] || "";
        if (newValue !== value) {
            onHashChange.value = value = newValue;
            //Use a set timeout so an error on a subscriber does
            //not stop the polling.
            setTimeout(function () {
                dojo.publish("rd/onHashChange", [value]);
            }, 10);
        }
    }, 300);

    return onHashChange;
});
