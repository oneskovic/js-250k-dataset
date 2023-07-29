/**
 * @author Martin Doyle
 */
define(["intern!object",
      "intern/chai!assert",
      "require",
      "alfresco/TestCommon",
      "intern/dojo/node!leadfoot/keys",
      "intern/dojo/node!leadfoot/helpers/pollUntil"
   ],
   function(registerSuite, assert, require, TestCommon, keys, pollUntil) {

      var browser;

      registerSuite({
         name: "TinyMCE",

         setup: function() {
            browser = this.remote;
            return TestCommon.loadTestWebScript(this.remote, "/TinyMCE", "TinyMCE")
               .end();
         },

         beforeEach: function() {
            browser.end();
         },

         "Can enter content into control and publish it": function() {
            return browser.findByCssSelector(".alfresco-editors-TinyMCE iframe")
               .execute("tinymce.get(0).setContent('<p><strong>a</strong></p>');")
               .execute("tinymce.get(0).save();")
               .screenie()
               .screenie()
               .end()

            .findByCssSelector(".confirmationButton .dijitButtonNode")
               .click()
               .then(pollUntil(function() {
                  /*jshint browser:true*/
                  var topicData = document.querySelectorAll(".sl-topic[data-publish-topic=FORM_POST] + td.sl-data"),
                     lastTopic = topicData && topicData[topicData.length - 1],
                     dataContent = lastTopic && (lastTopic.textContent || lastTopic.innerText);
                  return dataContent || null;
               }, 5000))
               .then(function(dataContent) {
                  assert.include(dataContent, "RichText", "Publish did not include editor Form ID");
                  assert.include(dataContent, "<p><strong>a</strong></p>", "Publish did not include created content");
               }, function(err) {
                  assert.fail(null, null, "Unable to enter content and publish it [" + err.name + "]: " + err);
               });
         },

         "Post Coverage Results": function() {
            TestCommon.alfPostCoverageResults(this, browser);
         }
      });
   });