/**
 * Spin up a page-worker that runs the loggest testdriver in said page-worker,
 *  making sure to cram any required globals in first.
 **/

let $self = require('self'),
    $nacl = require('nacl'); // jsctypes binding, yo

exports.testerUrl = $self.data.url("testing/logdriver.html");

// We can't inject things directly into a page-worker, so let's bail on this
//  and use a hidden frame for now.
/*
let $pworker = require('page-worker')

exports.goRunTest = function goRunTest(test, testName) {
  test.waitUntilDone(6 * 1000);
  var page = $pworker.Page({
    contentURL: exports.testerUrl + "?" + testName,
    onMessage: function(msg) {
      if (msg === "pass")
        test.pass();
      else
        test.fail();
      test.done();
      page.destroy();
    },
  });
};
*/

let $hframe = require('hidden-frame');

var gHiddenFrame;
exports.goRunTest = function goRunTest(test, testName) {
  test.waitUntilDone(10 * 1000);

  gHiddenFrame = $hframe.add($hframe.HiddenFrame({
    onReady: function() {
      // now that we have a frame, point it at a URL so we get a principal...
      // (we can remove this step once the bug noted above is fixed; we could
      //  also potentially avoid the hidden frame and just grab it out of the
      //  hidden window itself or what not.)
      this.element.contentWindow.location = exports.testerUrl + "?" + testName;

      let self = this;
      this.element.addEventListener("DOMContentLoaded", function() {
        let win = self.element.contentWindow;

        win.wrappedJSObject.$NACL = $nacl;
        win.wrappedJSObject.TESTDONE = function(msg) {
          if (msg === "pass")
            test.pass();
          else
            test.fail();
          test.done();
          gHiddenFrame.destroy();
        };
        // invoke it if it is there, otherwise, it has not yet been defined
        //  and when it gets defined it will see TESTDONE and autostart.
        if (win.wrappedJSObject.GO_RUN_TESTS)
          win.wrappedJSObject.GO_RUN_TESTS();
      }, true, true);
    }
  }));
};
