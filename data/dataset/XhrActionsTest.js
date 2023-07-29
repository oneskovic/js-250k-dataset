/**
 * @author David Webster
 */
define(["intern!object",
        "intern/chai!expect",
        "intern/chai!assert",
        "require",
        "alfresco/TestCommon"],
       function (registerSuite, expect, assert, require, TestCommon) {

   var browser;
   registerSuite({
      name: "XHR Actions Renderer Tests",

      setup: function() {
         browser = this.remote;
         return TestCommon.loadTestWebScript(this.remote, "/XhrActions", "XHR Actions Renderer Tests").end();
      },

      beforeEach: function() {
         browser.end();
      },

     "Check Actions menu was rendered": function () {
         // Test spec:
         // 1: Check dropdown element exists
         return browser.findByCssSelector(".alfresco-menus-AlfMenuBar span:first-child")
            .getVisibleText()
            .then(function(resultText) {
               assert(resultText === "Actions", "Actions should be rendered as a menu: " + resultText);
            });
      },

      "Check that document request event was triggered": function() {
         // 2: Click on it. Check event triggered: ALF_RETRIEVE_SINGLE_DOCUMENT_REQUEST
         return browser.findByCssSelector(".alfresco-menus-AlfMenuBar span:first-child")
            .click()
            .end()
         .findAllByCssSelector(TestCommon.topicSelector("ALF_RETRIEVE_SINGLE_DOCUMENT_REQUEST", "publish", "any"))
            .then(function(elements) {
               assert(elements.length === 1, "Retrieve single doc request not triggered");
            });
      },

      "Post Coverage Results": function() {
         TestCommon.alfPostCoverageResults(this, browser);
      }
   });
});