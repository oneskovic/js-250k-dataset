/*global runtime, xmldom, NodeFilter*/

runtime.loadClass("xmldom.RelaxNG");
runtime.loadClass("xmldom.RelaxNG2");

function validate(relaxng, relaxng2, url) {
    "use strict";
    runtime.loadXML(url, function (err, dom) {
        var walker;
        if (err) {
            runtime.log("Could not read " + url + ": " + err);
        } else {
            walker = dom.createTreeWalker(dom.firstChild, NodeFilter.SHOW_ALL);
            relaxng.validate(walker, function (err) {
                if (err) {
                    var i;
                    runtime.log("Found " + String(err.length) +
                            " error validating " + url + ":");
                    for (i = 0; i < err.length; i += 1) {
                        runtime.log(err[i].message());
                    }
                }
            });
            relaxng2.validate(walker, function (err) {
                if (err) {
                    var i;
                    runtime.log("Found " + String(err.length) +
                            " error validating " + url + ":");
                    for (i = 0; i < err.length; i += 1) {
                        runtime.log(err[i].message());
                    }
                }
            });
        }
    });
}

var args = arguments,
    relaxngurl = args[1];

// load and parse the Relax NG
runtime.loadXML(relaxngurl, function (err, dom) {
    "use strict";
    var parser, i, relaxng, relaxng2;
    if (err) {
        return;
    }
    parser = new xmldom.RelaxNGParser();
    relaxng = new xmldom.RelaxNG();
    relaxng2 = new xmldom.RelaxNG2();
    err = parser.parseRelaxNGDOM(dom, relaxng.makePattern);
    relaxng.init(parser.rootPattern);
    relaxng2.init(parser.start, parser.nsmap);

    // loop over arguments to load ODF
    for (i = 2; i < args.length; i += 1) {
        runtime.log("Validating " + args[i] + " from " + relaxngurl);
        validate(relaxng, relaxng2, args[i]);
    }
});
