/**
 * @author Dave Draper
 */
define(["intern!object",
        "intern/chai!expect",
        "intern/chai!assert",
        "require",
        "alfresco/TestCommon"], 
        function (registerSuite, expect, assert, require, TestCommon) {

   var browser;
   registerSuite({
      name: "Widget Creation Tests",

      setup: function() {
         browser = this.remote;
         return TestCommon.loadTestWebScript(this.remote, "/WidgetCreation", "Widget Creation Tests").end();
      },

      beforeEach: function() {
         browser.end();
      },

      // teardown: function() {
      //    browser.end();
      // },
      
     "Count the number of Logo widgets": function () {
         // This isn't the optimal way of testing this - ideally we want to get each widget and then
         // check the IDs - however, it's not easily understood how to do this with mulitple selection and 
         // chaining of promises - this test should be sufficient but it would be nice to update at some
         // point in the future!

         return browser.findAllByCssSelector(".alfresco-logo-Logo")
            .then(function (els) {
               assert.lengthOf(els, 3, "An unexpected number of logo widgets found");
            });
      },

      "Check for the Logo with the specific ID": function() {
         return browser.findAllByCssSelector("#SPECIFIC_DOM_ID")
            .then(function (els) {
               assert.lengthOf(els, 1, "Couldn't find Logo with specific DOM id");
            });
      },

      "Check for the Logo with the overridden ID": function() {
         return browser.findAllByCssSelector("#SPECIFIC_DOM_ID")
            .then(function (els) {
               assert.lengthOf(els, 1, "Couldn't find Logo with overridden DOM id");
            });
      },

      "Post Coverage Results": function() {
         TestCommon.alfPostCoverageResults(this, browser);
      }
   });
});