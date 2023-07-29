/*global extension, jQuery, MissingE */

(function($){

MissingE.packages.dashLinksToTabs = {

   dashClick: function(e) {
      var settings = MissingE.packages.dashLinksToTabs.settings;
      var node = e.target;
      if (node === undefined || node === null) { return false; }

      if (settings.newPostTabs !== 1 &&
          $(node).parents('#new_post').length > 0) {
         return false;
      }
      if (MissingE.isTumblrURL(location.href, ["followers"]) &&
          $(node).parent().hasClass('pagination')) {
         return false;
      }
      if ($(node).closest('#dashboard_controls').length > 0) { return false; }
      if ($(node).parent().hasClass('post_controls')) {
         if (/^\/reblog\/\d+\//.test($(node).attr('href')) &&
             settings.reblogLinks !== 1) {
            return false;
         }
         if (/^\/edit\/\d+/.test($(node).attr('href')) &&
             settings.editLinks !== 1) {
            return false;
         }
      }
      if (node.tagName!=='A') {
         while (node !== null && node.tagName !== 'AREA' &&
                node.tagName !== 'A' &&
                node !== this) {
            node = node.parentNode;
         }
      }
      if ($(node).hasClass('MissingE_quick_reblog_main')) { return false; }
      if ($(node).attr('id') === 'MissingE_quick_reblog_manual' &&
          settings.reblogLinks !== 1) {
         return false;
      }
      if (node === null || node === this) { return false; }
      if (!$(node).attr('href')) { return false; }
      if (/^#/.test($(node).attr('href'))) { return false; }
      var urlhash = $(node).attr('href').match(/^([^#]*)#/);
      var prehash = $(node).attr('href');
      if (urlhash !== undefined && urlhash !== null && urlhash.length > 1) {
         prehash = urlhash[1];
      }
      var lochash = location.href.match(/^([^#]*)#/);
      var prelochash = location.href;
      if (lochash !== undefined && lochash !== null && lochash.length > 1) {
         prelochash = lochash[1];
      }
      if (prehash === prelochash) { return false; }
      node.target='_blank';
      return true;
   },

   run: function() {
      var settings = this.settings;
      var lcol = document.getElementById('left_column');
      var rcol = document.getElementById('right_column');

      if (lcol) {
         lcol.addEventListener('click', function(e) {
            MissingE.packages.dashLinksToTabs.dashClick(e);
         }, false);
      }
      if (rcol && settings.sidebar === 1) {
         rcol.addEventListener('click', function(e) {
            MissingE.packages.dashLinksToTabs.dashClick(e);
         }, false);
      }
      if (settings.sidebar === 1) {
         $('#inbox_button a').bind('click', function() {
            $(this).attr('target','_blank');
            return true;
         });
      }
      $('#MissingE_quick_reblog a').live('click', function(e) {
         MissingE.packages.dashLinksToTabs.dashClick(e);
      });
   },

   init: function() {
      extension.sendRequest("settings", {component: "dashLinksToTabs"},
                            function(response) {
         if (response.component === "dashLinksToTabs") {
            var i;
            MissingE.packages.dashLinksToTabs.settings = {};
            for (i in response) {
               if (response.hasOwnProperty(i) &&
                   i !== "component") {
                  MissingE.packages.dashLinksToTabs.settings[i] = response[i];
               }
            }
            MissingE.packages.dashLinksToTabs.run();
         }
      });
   }
};

if (extension.isChrome ||
    extension.isFirefox) {
   MissingE.packages.dashLinksToTabs.init();
}

}(jQuery));
