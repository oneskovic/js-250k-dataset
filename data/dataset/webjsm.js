// = WebJsModule =
//
// The {{{WebJsModule}}} class is used when it's desirable to have JavaScript
// libraries that were originally intended for use on the web be
// accessible from JS Modules.
//
// Generally, this is done by using an always-existing DOM window to
// host the JS library in chrome space and provide direct access to it.
// This ensures that all standard globals the code expects to exist,
// such as {{{window}}} and {{{XMLHttpRequest}}}, actually exist.
//
// Note, however, that since the code is running in chrome space,
// care must be taken to ensure that any JS libraries loaded don't load
// remote code from untrusted sources.

var EXPORTED_SYMBOLS = ["WebJsModule"];

const Cc = Components.classes;
const Ci = Components.interfaces;

// == The WebJsModule Class ==
//
// The constructor requires a callback function, which is called when the
// {{{WebJsModule}}} is finished initializing itself. Optionally, the
// constructor can also take an instance of a DOM window, which it will
// use to host any JS code. If unspecified, the hidden DOM window is
// used.

function WebJsModule(callback, window) {
  if (!window)
    window = Cc["@mozilla.org/appshell/appShellService;1"]
             .getService(Ci.nsIAppShellService)
             .hiddenDOMWindow;

  var importedScripts = {};

  var self = this;
  var iframe = window.document.createElement("iframe");
  iframe.setAttribute("src", "chrome://ubiquity/content/hiddenframe.html");
  iframe.addEventListener(
    "pageshow",
    function WJM__onPageShow() {
      iframe.removeEventListener("pageshow", arguments.callee, false);

      // Have our instance dynamically inherit the properties of the
      // hidden window.
      self.__proto__ = iframe.contentWindow;
      callback();
    },
    false
  );
  window.document.documentElement.appendChild(iframe);

  // === {{{WebJsModule#importScript()}}} ===
  //
  // This method is passed a URL that specifies the content-space JS
  // library to load. If the library is already loaded, this method
  // does nothing.
  //
  // Once the script is imported, any globals it created can be
  // directly accessed as properties of the {{{WebJsModule}}} instance.

  this.importScript = function WJM_importScript(url) {
    if (!(url in importedScripts)) {
      (iframe.contentWindow
       .Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
       .getService(Ci.mozIJSSubScriptLoader)
       .loadSubScript(url));
      importedScripts[url] = true;
    }
  };
}
