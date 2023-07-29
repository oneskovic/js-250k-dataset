/**
 * Abstract Report class
 *
 * @module alfresco/reports/Report
 * @extends module:alfresco/core/ProcessWidgets
 * @abstract
 *
 * @author Erik Winlöf
 */
define(["alfresco/core/ProcessWidgets",
   "dojo/_base/declare",
   "dojo/_base/lang"],
      function(ProcessWidgets, declare, lang) {

         return declare([ProcessWidgets], {

            /**
             * The CSS class (or a space separated list of classes) to include in the DOM node.
             *
             * @instance
             * @type {string}
             * @default "alfresco-reports-Report"
             */
            baseClass: "alfresco-reports-Report",

            /**
             * Creates the widgets as defined in widgets
             *
             * @instance
             */
            postCreate: function alfresco_reports_Report__postCreate() {
               if (this.widgets)
               {
                  this.processWidgets(lang.clone(this.widgets), this.containerNode);
               }
            }
         });
      });