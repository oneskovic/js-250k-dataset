WM.Plugins.ArchWikiDeprecateFaq = new function () {
    "use strict";

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();

        var faqs = WM.Parser.findTemplates(source, 'FAQ');
        var index = 0;
        var newText = "";

        for (var f = 0; f < faqs.length; f++) {
            var faq = faqs[f];
            var heading = faq.arguments[0].value.trim();

            if (faq.arguments.length == 2) {
                if (heading.indexOf("\n") > -1) {
                    WM.Log.logWarning("Cannot replace " + faq.rawTransclusion +
                            " because the question spans multiple lines");
                    newText += source.substring(index, faq.index + faq.length);
                }
                else {
                    newText += source.substring(index, faq.index) + "=== " +
                        heading + " ===\n\n" + faq.arguments[1].value.trim();
                }
            }
            else {
                WM.Log.logWarning("Cannot replace " + faq.rawTransclusion +
                        " because it has an unexpected number of arguments");
                newText += source.substring(index, faq.index + faq.length);
            }

            index = faq.index + faq.length;
        }

        newText += source.substr(index);

        if (faq) {
            WM.Editor.writeSource(newText);
            WM.Log.logWarning("Replaced Template:FAQ with simple level-3 " +
                                    "sections: check that the sections " +
                                    "don't require a higher level and that " +
                                    "no unneeded white space has been added");
        }

        if (callNext) {
            callNext();
        }
    };
};
