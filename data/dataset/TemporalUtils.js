/**
 * @module aikauTesting/mixins/TemporalUtils
 * @author Richard Smith
 */
define(["dojo/_base/declare",
        "alfresco/core/Core",
        "alfresco/core/TemporalUtils",
        "dojo/_base/lang"], 
        function(declare, AlfCore, TemporalUtils, lang) {

   return declare([AlfCore, TemporalUtils], {

      /**
       * [constructor description]
       */
      constructor: function aikauTesting_mixins_TemporalUtils__constructor(args) {
         lang.mixin(this, args);

         this.alfPublish("TEMPORALUTILS_TEST1", {result: this.getRelativeTime("1994-12-04T09:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST2", {result: this.getRelativeTime("2004-12-04T09:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST3", {result: this.getRelativeTime("2013-12-04T09:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST4", {result: this.getRelativeTime("2014-06-04T09:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST5", {result: this.getRelativeTime("2014-09-04T09:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST6", {result: this.getRelativeTime("2014-10-04T09:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST7", {result: this.getRelativeTime("2014-11-04T09:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST8", {result: this.getRelativeTime("2014-12-01T09:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST9", {result: this.getRelativeTime("2014-12-02T09:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST10", {result: this.getRelativeTime("2014-12-03T09:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST11", {result: this.getRelativeTime("2014-12-04T06:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST12", {result: this.getRelativeTime("2014-12-04T07:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST13", {result: this.getRelativeTime("2014-12-04T08:30:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST14", {result: this.getRelativeTime("2014-12-04T09:00:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST15", {result: this.getRelativeTime("2014-12-04T09:10:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST16", {result: this.getRelativeTime("2014-12-04T09:20:20-00:00", "2014-12-04T09:30:20-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST17", {result: this.getRelativeTime("2014-12-04T09:30:10-00:00", "2014-12-04T09:30:20-00:00")});

         this.alfPublish("TEMPORALUTILS_TEST18", {result: this.toISO8601(new Date(2014, 12, 4, 11, 52, 58))});
         this.alfPublish("TEMPORALUTILS_TEST19", {result: this.fromISO8601("2014-12-04T11:52:58+00:00").toDateString()});

         this.alfPublish("TEMPORALUTILS_TEST20", {result: this.formatDate("2014-12-04T09:30:10-00:00")});
         this.alfPublish("TEMPORALUTILS_TEST21", {result: this.formatDate("2014-12-04T09:30:10-00:00", "longDate")});

         this.alfPublish("TEMPORALUTILS_TEST22", {result: this.parseTime("11am").toTimeString()});
         this.alfPublish("TEMPORALUTILS_TEST23", {result: this.parseTime("1123").toTimeString()});
         this.alfPublish("TEMPORALUTILS_TEST24", {result: this.parseTime("08:00").toTimeString()});

      }

   });
});