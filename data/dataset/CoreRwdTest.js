/**
 * This test assesses the CoreRwd mixin as applied to AlfMenuBarPopup
 * 
 * @author Richard Smith
 * @author Dave Draper
 */
define(["intern!object",
        "intern/chai!expect",
        "require",
        "alfresco/TestCommon"], 
        function (registerSuite, expect, require, TestCommon) {

   var browser;
   registerSuite({
      name: "CoreRwd Tests",

      setup: function() {
         browser = this.remote;
         return TestCommon.loadTestWebScript(this.remote, "/CoreRwd", "CoreRwd Tests").end();
      },

      beforeEach: function() {
         browser.end();
      },

      // teardown: function() {
      //    browser.end();
      // },
      
      "Check the dropdown is not hidden": function () {
         return browser.findById("DROP_DOWN_MENU_1")
            .getAttribute("class")
            .then(function (classes1){
               expect(classes1).to.not.contain("hidden", "The dropdown should not have class 'hidden'");
            });
      },

      "Check the dropdown is visible": function() {   
         return browser.findById("DROP_DOWN_MENU_1")
            .isDisplayed()
            .then(function (displayed){
               expect(displayed).to.equal(true, "The dropdown should be visible");
            });
      },

      "Check the dropdown is hidden": function() { 
         return browser.setWindowSize(null, 700, 400)
            .findById("DROP_DOWN_MENU_1")
            .getAttribute("class")
            .then(function (classes2){
               expect(classes2).to.contain("hidden", "The dropdown should have class 'hidden'");
            });
      },

      "Check the dropdown is not visible": function() {  
         return browser.findById("DROP_DOWN_MENU_1")
            .isDisplayed()
            .then(function (displayed){
               expect(displayed).to.equal(false, "The dropdown should not be visible");
            });
      },

      "Check the dropdown is not hidden again": function() {
         return browser.setWindowSize(null, 1024, 768)
            .findById("DROP_DOWN_MENU_1")
            .getAttribute("class")
            .then(function (classes3){
               expect(classes3).to.not.contain("hidden", "The dropdown should not have class 'hidden'");
            });
      },

      "Check the dropdown is visible again": function() {
         return browser.findById("DROP_DOWN_MENU_1")
            .isDisplayed()
            .then(function (displayed){
               expect(displayed).to.equal(true, "Test #1f - The dropdown should be visible again");
            });
      },

      "Post Coverage Results": function() {
         TestCommon.alfPostCoverageResults(this, browser);
      }
   });
});