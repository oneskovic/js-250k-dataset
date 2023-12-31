/**
 * @module alfresco/navigation/CategoryTree
 * @extends module:alfresco/navigation/Tree
 * @mixes module:alfresco/documentlibrary/_AlfDocumentListTopicMixin
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "alfresco/navigation/Tree",
        "alfresco/documentlibrary/_AlfDocumentListTopicMixin",
        "dojo/_base/lang",
        "service/constants/Default"], 
        function(declare, Tree, _AlfDocumentListTopicMixin, lang, AlfConstants) {
   
   return declare([Tree, _AlfDocumentListTopicMixin], {
      
      /**
       * An array of the i18n files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{i18nFile: "./i18n/CategoryTree.properties"}]
       */
      i18nRequirements: [{i18nFile: "./i18n/CategoryTree.properties"}],
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/CategoryTree.css"}]
       */
      cssRequirements: [{cssFile:"./css/CategoryTree.css"}],
      
      /**
       * Overrides the inherited value to allow the CSS selectors to change the icon images.
       * 
       * @instance
       * @type {string}
       * @default "categories"
       */
      customCssClasses: "categories",
      
      /**
       * @instance
       * @type {string}
       * @default "categories.root.label"
       */
      rootLabel: "categories.root.label",
      
      /**
       * @instance
       */
      getTargetUrl: function alfresco_navigation_Tree__getTargetUrl() {
         var url = AlfConstants.PROXY_URI + "slingshot/doclib/categorynode/node/alfresco/category/root";
         return url;
      },
      
      /**
       * Overrides the inherited value to set the "ALF_DOCUMENTlIST_CATEGORY_CHANGED" topic.
       * 
       * @instance
       * @type {string}
       * @default "ALF_DOCUMENTLIST_CATEGORY_CHANGED"
       */
      onClickTopic: "ALF_DOCUMENTLIST_CATEGORY_CHANGED",

      /**
       * @instance
       * @param {object} item The store item represented by the clicked node
       * @param {object} node The node on the tree that was clicked
       * @param {object} evt The click event
       */
      onClick: function alfresco_navigation_Tree__onClick(item, node, evt) {
         this.alfLog("log", "Tree Node clicked", item, node, evt);
         this.alfPublish(this.onClickTopic, {
            path: item.path,
            description: this.message("filter.classified.label", {"0":item.path})
         });
      }
   });
});