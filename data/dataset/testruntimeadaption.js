/*global window, runtime*/

runtime.libraryPaths = (function () {
    "use strict";

    return function () {
        return ["../lib", "."];
    };
}());

runtime.log = (function () {
    "use strict";

    var normalLog = runtime.log,
        logoutput = window.document.getElementById("logoutput");

    return function (msgOrCategory, msg) {
        var node, doc, category;

        // do normal log first
        normalLog(msgOrCategory, msg);

        // now output also 
        if (msg !== undefined) {
            category = msgOrCategory;
        } else {
            msg = msgOrCategory;
        }

        doc = logoutput.ownerDocument;
        if (category) {
            node = doc.createElement("span");
            node.className = category;
            node.appendChild(doc.createTextNode(category));
            logoutput.appendChild(node);
            logoutput.appendChild(doc.createTextNode(" "));
        }
        node = doc.createElement("span");
        if (msg.length > 0 && msg[0] === "<") {
            node.innerHTML = msg;
        } else {
            node.appendChild(doc.createTextNode(msg));
        }
        logoutput.appendChild(node);
        logoutput.appendChild(doc.createElement("br"));
    };
}());
