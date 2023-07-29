WM.Plugins.ArchWikiPkgAUR = new function () {
    this.mainAuto = function (args, title) {
        // Out of date, should use WM.Parser ########################################################

        var pageid = WM.MW.callQuerySync({prop: "info|revisions",
                                     rvprop: "content|timestamp",
                                     intoken: "edit",
                                     titles: title});

        var edittoken = pageid.edittoken;
        var timestamp = pageid.revisions[0].timestamp;
        var source = pageid.revisions[0]["*"];

        var newtext = source.replace(/\{\{[Pp]ackage Official\|/g, "{{Pkg|");
        newtext = newtext.replace(/\{\{[Pp]ackage AUR\|/g, "{{AUR|");

        if (newtext != source) {
            var summary = "use new package templates, see [[Help:Style]]";

            var res = WM.MW.callAPIPostSync({action: "edit",
                                     bot: "1",
                                     title: title,
                                     summary: summary,
                                     text: newtext,
                                     basetimestamp: timestamp,
                                     token: edittoken});

            if (res.edit && res.edit.result == 'Success') {
                return true;
            }
            else {
                WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
                return false;
            }
        }
        else {
            return true;
        }
    };
};
