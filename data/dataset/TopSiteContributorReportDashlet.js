/**
 * TopSiteContributorReportDashlet
 *
 * @module alfresco/reports/TopSiteContributorReportDashlet
 * @extends alfresco/dashlets/Dashlet
 * @author Erik Winlöf
 */
define(["dojo/_base/declare",
   "alfresco/core/Core",
   "alfresco/core/I18nUtils",
   "alfresco/dashlets/Dashlet",
   "dojo/_base/lang"],
      function(declare, AlfCore, I18nUtils, Dashlet) {

         return declare([Dashlet], {

            /**
             * The i18n scope to use for this widget.
             *
             * @instance
             */
            i18nScope: "alfresco.reports.TopSiteContributorReportDashlet",

            /**
             * An array of the i18n files to use with this widget.
             *
             * @instance
             * @type {object[]}
             * @default [{i18nFile: "./i18n/TopSiteContributorReportDashlet.properties"}]
             */
            i18nRequirements: [{i18nFile: "./i18n/TopSiteContributorReportDashlet.properties"}],

            /**
             * The widgets to be processed to generate each item in the rendered view.
             *
             * @instance
             * @type {object[]}
             * @default null
             */
            widgetsForBody: [
               {
                  name: "alfresco/reports/TopSiteContributorReport",
                  config: {
                     title: ""
                  }
               }
            ]

         });
      });