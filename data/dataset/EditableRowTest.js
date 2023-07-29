/**
 * @author Dave Draper
 */
define(["intern!object",
        "intern/chai!assert",
        "require",
        "alfresco/TestCommon"],
        function(registerSuite, assert, require, TestCommon) {

   var browser;
   registerSuite({
      name: "Editable Row Tests",

      setup: function() {
         browser = this.remote;
         return TestCommon.loadTestWebScript(this.remote, "/EditableRow", "Editable Row Tests").end();
      },

      beforeEach: function() {
         browser.end();
      },

      "Check there are two editable rows": function() {
         return browser.findAllByCssSelector(".alfresco-lists-views-layouts-EditableRow")
            .then(function(elements) {
               assert.lengthOf(elements, 2, "The wrong number of editable rows were found");
            });
      },

      "Check there are 6 cells": function() {
         return browser.findAllByCssSelector(".alfresco-lists-views-layouts-Cell")
            .then(function(elements) {
               assert.lengthOf(elements, 6, "The wrong number of cells were found");
            });
      },

      "Check the value of the first property": function() {
         // The assumption here is that we'll work with the first of 4 properties... 
         // If the test ever fails, check this holds true first!
         return browser.findByCssSelector(".alfresco-renderers-Property .value")
            .getVisibleText()
            .then(function(resultText) {
               assert.equal(resultText, "rhubarb", "Property value not initialised as expected");
            });
      },

      "Check that edit mode widgets haven't been created yet": function() {
         return browser.findAllByCssSelector(".alfresco-forms-Form")
            .then(function(elements) {
               assert.lengthOf(elements, 0, "Edit mode widgets were unexpectedly created");
            });
      },

      "Enter edit mode (mouse)": function() {
         return browser.findByCssSelector(".alfresco-lists-views-layouts-EditableRow:nth-child(1) .alfresco-renderers-PublishAction > img")
            .click()
         .end()
         .findAllByCssSelector(".alfresco-forms-Form")
            .then(function(elements) {
               assert.lengthOf(elements, 1, "Edit mode widgets were not created");
            });
      },

      "Check the initial form value": function() {
         return browser.findByCssSelector("#LABEL_FIELD .dijitInputContainer input")
            .getProperty("value")
            .then(function(resultText) {
               assert.equal(resultText, "rhubarb", "The form field value was not set correctly");
            });
      },

      "Update form value and cancel": function() {
         return browser.findByCssSelector("#LABEL_FIELD .dijitInputContainer input")
            .clearValue()
            .type("bananas")
         .end()
         .findByCssSelector(".cancelButton > span")
            .click()
         .end()
         .findByCssSelector(".alfresco-renderers-Property .value")
            .getVisibleText()
            .then(function(resultText) {
               assert.equal(resultText, "rhubarb", "The property should not have been updated");
            });
      },

      "Check form is re-initialised": function() {
         return browser.findByCssSelector(".alfresco-lists-views-layouts-EditableRow:nth-child(1) .alfresco-renderers-PublishAction > img")
            .click()
         .end()
         .findByCssSelector("#LABEL_FIELD .dijitInputContainer input")
            .getProperty("value")
            .then(function(resultText) {
               assert.equal(resultText, "rhubarb", "The form field value was not re-initialised");
            });
      },

      "Update form value and save": function() {
         return browser.findByCssSelector("#LABEL_FIELD .dijitInputContainer input")
            .clearValue()
            .type("bananas")
         .end()
         .findByCssSelector(".confirmationButton > span")
            .click()
         .end()
         .findByCssSelector(".alfresco-renderers-Property .value")
            .getVisibleText()
            .then(function(resultText) {
               assert.equal(resultText, "bananas", "The property should not have been updated");
            });
      },

      "Post Coverage Results": function() {
         TestCommon.alfPostCoverageResults(this, browser);
      }
   });
});