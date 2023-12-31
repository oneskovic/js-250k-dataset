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
      name: "VisibilityConfig Tests",

      setup: function() {
         browser = this.remote;
         return TestCommon.loadTestWebScript(this.remote, "/VisibilityConfig", "VisibilityConfig Tests").end();
      },

      beforeEach: function() {
         browser.end();
      },

      // teardown: function() {
      //    browser.end();
      // },
      
     "Check LOGO1 is initially displayed": function () {
         // Test 1: Check that LOGO1 is initially displayed and that LOGO2 is initially hidden...
         return browser.findAllByCssSelector("#LOGO1")
            .then(function (els) {
               assert.lengthOf(els, 1, "LOGO1 was unexpectedly hidden");
            });
      },

      "Check that LOGO2 was hidden": function() {
         return browser.findByCssSelector("#LOGO2")
            .getComputedStyle("display")
            .then(function(result) {
               assert.equal(result, "none", "LOGO2 was displayed unexpectedly");
            });
      },

      "Check that LOGO1 was gets hidden": function() {
         // Test 2: Check that LOGO1 can be hidden can then displayed by isNot rules
         return browser.findByCssSelector("#HIDE_LOGO_1")
            .click()
         .end()
         .findByCssSelector("#LOGO1")
            .getComputedStyle("display")
            .then(function(result) {
               assert.equal(result, "none", "LOGO1 was not hidden");
            });
      },

      "Check that LOGO1 gets revealed": function() {
         return browser.findByCssSelector("#SHOW_LOGO_1")
            .click()
         .end()
         .findByCssSelector("#LOGO1")
            .getComputedStyle("display")
            .then(function(result) {
               assert.equal(result, "block", "LOGO1 was not revealed");
            });
      },

      "Check that LOGO2 gets revealed": function() {
         // Test 3: Check that LOGO2 can be displayed and then hidden by is rules
         return browser.findByCssSelector("#SHOW_LOGO_2_A")
            .click()
         .end()
         .findByCssSelector("#LOGO2")
            .getComputedStyle("display")
            .then(function(result) {
               assert.equal(result, "block", "LOGO2 was not revealed");
            });
      },

      "Check that LOGO2 gets hidden": function() {
         return browser.findByCssSelector("#HIDE_LOGO_2")
            .click()
         .end()
         .findByCssSelector("#LOGO2")
            .getComputedStyle("display")
            .then(function(result) {
               assert.equal(result, "none", "LOGO2 was not hidden");
            });
      },

      "Check that LOGO2 gets revealed again": function() {
         return browser.findByCssSelector("#SHOW_LOGO_2_B")
            .click()
         .end()
         .findByCssSelector("#LOGO2")
            .getComputedStyle("display")
            .then(function(result) {
               assert.equal(result, "block", "LOGO2 was not revaled again");
            });
      },

      "Post Coverage Results": function() {
         TestCommon.alfPostCoverageResults(this, browser);
      }
   });
});