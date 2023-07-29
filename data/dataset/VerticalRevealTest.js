/**
 * This is a unit test for the VerticalReveal widget
 *
 * @author Martin Doyle
 */
define(["intern!object",
      "intern/chai!assert",
      "require",
      "alfresco/TestCommon"
   ],
   function(registerSuite, assert, require, TestCommon) {

      var browser;
      registerSuite({
         name: "VerticalReveal tests",

         setup: function() {
            browser = this.remote;
            return TestCommon.loadTestWebScript(this.remote, "/VerticalReveal", "VerticalReveal Tests").end();
         },

         beforeEach: function() {
            browser.end();
         },

         "Content is hidden on load": function() {
            return browser.findAllByCssSelector(".alfresco-layout-VerticalReveal .content")
               .getSize()
               .then(function(size) {
                  var contentHeight = (size && size.height) || 0;
                  assert.equal(contentHeight, 0, "Content was visible at page-load");
               });
         },

         "Content is displayed when toggled": function() {
            return browser.findById("TOGGLE_LOGO")
               .click()
               .sleep(1000)
               .end()

            .screenie() // Allow visual checking of content appearing

            .findByCssSelector(".alfresco-layout-VerticalReveal .content")
               .getSize()
               .then(function(size) {
                  assert(size.height > 0, "Content was not revealed on button click");
               });
         },

         "Content is hidden when toggled again": function() {
            return browser.findById("TOGGLE_LOGO")
               .click()
               .sleep(1000)
               .end()

            .screenie() // Allow visual checking of content hiding

            .findByCssSelector(".alfresco-layout-VerticalReveal .content")
               .getSize()
               .then(function(size) {
                  assert.equal(size.height, 0, "Content was not hidden on second button click");
               });
         },

         "Post Coverage Results": function() {
            TestCommon.alfPostCoverageResults(this, browser);
         }
      });
   });