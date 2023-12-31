/* 
 * -setDefaultBrowser commandline handler
 * Makes the current executable the "default browser".
 */

const Cc = Components.classes;
const Ci = Components.interfaces;
Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

function nsSetDefaultBrowser() {}

nsSetDefaultBrowser.prototype = {
  handle: function nsSetDefault_handle(aCmdline) {
    if (aCmdline.handleFlag("setDefaultBrowser", false)) {
      var shell = Cc["@mozilla.org/browser/shell-service;1"].
                  getService(Ci.nsIShellService);
      shell.setDefaultBrowser(true, true);
    }
  },

  helpInfo: "  -setDefaultBrowser Set this app as the default browser.\n",

  classID: Components.ID("{F57899D0-4E2C-4ac6-9E29-50C736103B0C}"),
  QueryInterface: XPCOMUtils.generateQI([Ci.nsICommandLineHandler]),
};

var NSGetFactory = XPCOMUtils.generateNSGetFactory([nsSetDefaultBrowser]);
