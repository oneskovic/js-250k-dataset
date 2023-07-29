define(["intern!object",
        "intern/chai!assert",
        "require",
        "alfresco/TestCommon"], 
        function (registerSuite, assert, require, TestCommon) {

   var browser;
   registerSuite({
      name: "AlfContextMenu Tests",

      setup: function() {
         browser = this.remote;
         return TestCommon.loadTestWebScript(this.remote, "/AlfContextMenu", "AlfContextMenu Tests").end();
      },

      beforeEach: function() {
         browser.end();
      },

      // TESTS COMMENTED OUT PENDING ANSWER POSTED HERE: https://github.com/theintern/intern/issues/191
      // .findByCssSelector("#LOGO")
      //    .click("2")
      //    .end()
      // .findByCssSelector("#MI3")
      //    .click()
      //    .end()
      // .findAllByCssSelector(TestCommon.pubSubDataCssSelector("last", "key3", "value3"))
      //    .then(function(elements) {
      //       TestCommon.log(testname,"Check targeted node context menu works");
      //       assert(elements.length == 1, "Test #1 - Targeted node context menu failure");
      //    })
      //    .end()

      // .findByCssSelector("#CLASSIC_WINDOW div.content")
      //    .click("2")
      //    .end()
      // .findByCssSelector("#MI1")
      //    .click()
      //    .end()
      // .findAllByCssSelector(TestCommon.pubSubDataCssSelector("last", "key1", "value1"))
      //    .then(function(elements) {
      //       TestCommon.log(testname,"Check inherited node context menu works");
      //       assert(elements.length == 1, "Test #2 - Inherited node context menu failure");
      //    })
      //    .end()

      "Post Coverage Results": function() {
         TestCommon.alfPostCoverageResults(this, browser);
      }
   });
});