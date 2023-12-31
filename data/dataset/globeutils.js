goog.provide('owg.GlobeUtils');

//------------------------------------------------------------------------------
/**
 * @namespace GlobeUtils are a collection of utility function for the virtual globe
 * @author Martin Christen, martin.christen@fhnw.ch
 * @author Benjamin Loesch, benjamin.loesch@fhnw.ch
 */
var GlobeUtils = {};     
   
/**
 * @description Make filename hierarchical
 * @param{string} filename The filename to make hierarchical
 */
 GlobeUtils.MakeHierarchicalFilename = function(filename)
 {
   var newstring = "";
   for(var i=0;i < filename.length; i++)
   { 
      if(i%2==0 && i>0 && i<filename.length-4)
      {
         newstring = newstring.concat("/");    
      }  
      newstring = newstring.concat(filename[i]);
   }
         
   return newstring;  
} 

goog.exportSymbol('GlobeUtils', GlobeUtils);
goog.exportSymbol('GlobeUtils.MakeHierarchicalFilename', GlobeUtils.MakeHierarchicalFilename);
