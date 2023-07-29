/*global TestCase: true, 
  assertTrue: true, assertEquals: true, assertNotNull: true */
(function() {
   "use strict"; //$NON-NLS-1$
   
   /*jslint newcap : false */
   TestCase("NDCJtdTest", {
      /* jslint newcap : true */
      setUp : function() {
         Sm.log.NDC.clear();
      },
      
      tearDown : function() {
         Sm.log.NDC.clear();
      },
      
      testPush : function() {
         assertEquals( Sm.log.NDC.getNDCString(), '' );
         Sm.log.NDC.push( "x" );
         assertEquals( Sm.log.NDC.getNDCString(), 'x' );
         Sm.log.NDC.push( "y" );
         assertEquals( Sm.log.NDC.getNDCString(), 'x.y' );
      },
      
      testPop : function() {
         Sm.log.NDC.push( "x" );
         Sm.log.NDC.push( "y" );
         Sm.log.NDC.push( "z" );

         Sm.log.NDC.pop();
         assertEquals( Sm.log.NDC.getNDCString(), 'x.y' );
         Sm.log.NDC.pop();
         assertEquals( Sm.log.NDC.getNDCString(), 'x' );
         Sm.log.NDC.pop();
         assertEquals( Sm.log.NDC.getNDCString(), '' );
      },
   
      testGetNDCString : function() {
         assertEquals( Sm.log.NDC.getNDCString(), '' );
         Sm.log.NDC.push( "x" );
         assertEquals( Sm.log.NDC.getNDCString(), 'x' );
         Sm.log.NDC.push( "y" );
         assertEquals( Sm.log.NDC.getNDCString(), 'x.y' );
      }
    });

}());