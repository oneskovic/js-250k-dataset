/**
 * @module alfresco/renderers/SmallThumbnail
 * @extends module:alfresco/renderers/Thumbnail
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "alfresco/renderers/Thumbnail",
        "service/constants/Default",
        "alfresco/core/FileIconUtils"], 
        function(declare, Thumbnail, AlfConstants, FileIconUtils) {

   return declare([Thumbnail], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/SmallThumbnail.css"}]
       */
      cssRequirements: [{cssFile:"./css/SmallThumbnail.css"}],
      
      /**
       * Adds the "small" CSS classes the main DOM node defined in the template
       * @instance
       * @type {string}
       * @default "small"
       */
      customClasses: "small",
      
      /**
       * Generates the URL to use as the source of the thumbnail.
       * 
       * @instance
       * @param {string} renditionName
       * @returns {string}
       */
      generateThumbnailUrl: function alfresco_renderers_SmallThumbnail__generateThumbnailUrl(renditionName) {
         var url,
             jsNode = this.currentItem.jsNode;
         if (jsNode.isContainer || (jsNode.isLink && jsNode.linkedNode.isContainer))
         {
            url = require.toUrl("alfresco/renderers") + "/css/images/filetypes/generic-folder-32.png";
            // TODO: DnD
         }
         else
         {
            var fileIcon = FileIconUtils.getFileIconByMimetype(this.currentItem.node.mimetype);
            url = require.toUrl("alfresco/renderers") + "/css/images/filetypes/" + fileIcon;
            // TODO: Preview
         }
         return url;
      }
   });
});