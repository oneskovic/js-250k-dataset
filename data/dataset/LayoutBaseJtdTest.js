/*global TestCase: true, 
  assertTrue: true, assertEquals: true, assertNotNull: true */
(function() {
   "use strict"; //$NON-NLS-1$
   
   /*jslint newcap : false */
   TestCase("LayoutBaseJtdTest", {
      testAppendFormattedData : function () {
   /* jslint newcap : true */
         var appender, logger, le; 
         // We do not instantiate a layout because we are using
         // the default layout, which is as good a any other one
         appender = new Sm.log.test.TestAppender();
         logger = Sm.log.Logger.getLogger("testAppendFormattedData");
         logger.addAppender(appender);
         
         // Logged object, exporting loggedObject
         appender.getLayout().setExportFormattedLoggedObject(true);
         logger.info( {message:"info", loggedObject : 77} );
         le = appender.pop();         
         assertTrue( le.message !== undefined);
         assertTrue( le.formattedMessage !== undefined);
         assertTrue( le.time !== undefined);
         assertTrue( le.formattedTime !== undefined);
         assertTrue( le.level !== undefined);
         assertTrue( le.levelLevel !== undefined);
         assertTrue( le.hasLoggedObject === true);
         assertTrue( le.loggedObject === 77);
         assertTrue( le.hasOwnProperty( "formattedLoggedObject" ));

         // No logged object, exporting loggedObject
         appender.getLayout().setExportFormattedLoggedObject(true);
         logger.info( "info" );
         le = appender.pop();
         assertTrue( le.message !== undefined);
         assertTrue( le.formattedMessage !== undefined);
         assertTrue( le.time !== undefined);
         assertTrue( le.formattedTime !== undefined);
         assertTrue( le.level !== undefined);
         assertTrue( le.levelLevel !== undefined);
         assertTrue( le.hasLoggedObject === false);
         assertTrue( le.loggedObject === undefined);
         assertTrue( le.formattedLoggedObject === '');

         // Logged object, NOT exporting loggedObject
         appender.getLayout().setExportFormattedLoggedObject(false);
         logger.info( {message:"info", loggedObject : 77} );
         le = appender.pop();         
         assertTrue( le.message !== undefined);
         assertTrue( le.formattedMessage !== undefined);
         assertTrue( le.time !== undefined);
         assertTrue( le.formattedTime !== undefined);
         assertTrue( le.level !== undefined);
         assertTrue( le.levelLevel !== undefined);
         assertTrue( le.hasLoggedObject === true);
         assertTrue( le.loggedObject === 77);
         assertTrue( le.formattedLoggedObject === undefined);

         // No logged object, NOT exporting loggedObject
         appender.getLayout().setExportFormattedLoggedObject(false);
         logger.info( "info" );
         le = appender.pop();
         assertTrue( le.message !== undefined);
         assertTrue( le.formattedMessage !== undefined);
         assertTrue( le.time !== undefined);
         assertTrue( le.formattedTime !== undefined);
         assertTrue( le.level !== undefined);
         assertTrue( le.levelLevel !== undefined);
         assertTrue( le.hasLoggedObject === false);
         assertTrue( le.loggedObject === undefined);
         assertTrue( le.formattedLoggedObject === undefined);
      },
      
      testTimeFormat : function () {
         var appender, logger, le, now, layout; 
         // We do not instantiate a layout because we are using
         // the default layout, which is as good a any other one
         layout = new Sm.log.TemplateLayout({template:'{formattedMessage}'});
         layout.timeFormat = "Y";
         appender = new Sm.log.test.TestAppender();
         appender.setLayout(layout);
         logger = Sm.log.Logger.getLogger("testTimeFormat");
         logger.addAppender(appender);         
         
         now= new Date();
         logger.info( "msg" );
         le = appender.pop();     
         assertEquals( now.getFullYear().toString(), le.formattedTime );

      }
    });

}());