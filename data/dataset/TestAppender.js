/*jslint strict: false */

(function() {
   // "use strict"; //$NON-NLS-1$

   Ext.define('Sm.log.test.TestAppender', { //$NON-NLS-1$
      extend: 'Sm.log.AppenderBase',

      logs : [],
      
      clear : function() {
         this.logs = [];
      },
      
      doLog : function(logEvent) {
         this.logs.push(logEvent);
      },
      
      last : function() {
         if( this.logs.length === 0 ) {
            return null;
         }
         return this.logs[this.logs.length - 1];
      },
      
      pop : function() {
         return this.logs.pop();
      },
      
      count : function() {
         return this.logs.length;
      },
      
      constructor : function(cfg) {
         this.callParent(arguments); // callParent(cfg) won't work (?)
         this.clear();
      }
   });
   
}());