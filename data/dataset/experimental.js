/**
 * Module: Experimental
 */

/**
TODO: DESCRIPTION FOR EXPERIMENTAL

@module EdgeCommons
@submodule Experimental
@main EdgeCommons
**/
(function (EC) {
    //------------------------------------
    // Constructor
    //------------------------------------
    var C = EC;

    //------------------------------------
    // Public
    //------------------------------------
    C.Experimental = {}; 
    C.Experimental.VERSION = "0.0.4";
    
    //------------------------------------
    // Private
    //------------------------------------
    // jQuery
    var $ = EC.$;
    // Logger
    var LOG_GROUP = "EdgeCommons | Experimental";

    //------------------------------------
    // Methods
    //------------------------------------
   



    //-------------------------------------------    
    // Speed Control    
    //-------------------------------------------    
    C.SpeedControl = {};
    /**
     * TODO: recursive
     */
    C.SpeedControl.setSpeed = function(factor, sym, recursive) {
        //EC.debug("setSpeed: factor:", LOG_GROUP, factor);    
        
        $.each( sym.timelines["Default Timeline"].timeline, function(key, item) {
            if (typeof item.ec == 'undefined') {
                item.ec = {};
            }
            // Save old values
            if (typeof item.ec.oldPosition == 'undefined') {
                item.ec.originalPosition = item.position;
                item.ec.originalDuration = item.duration;
            }
            // Change position
            item.position = 1/factor * item.ec.originalPosition;
            // Change duration
            item.duration = 1/factor * item.ec.originalDuration;
            // Flush Cache
            sym._flushCache();
            
            
            EC.debug("setSpeed: factor:", LOG_GROUP, 1/factor);    
        });
        sym._flushCache();
    };    
        
        
    //------------------------------------
    // Init
    //------------------------------------
    //Log.debug("", LOG_GROUP);

})(EdgeCommons);