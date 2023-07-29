 
/**
  * Ext.ux.fbk.sonet.Iframer Extension Class
  *
  * @author Paolo Massa
  * @version 1.0
  * @class Ext.ux.fbk.sonet.Iframer
  * <p>This widget can include any html resource as iframe</p>
  * <pre><code>
    This is a example of the json
    </code></pre>
*/

/**
 * @constructor
 * @param {Object} json the json description file
 */

Iframer = function(json){

    var correctHeight;
    
    //if the height is NOT passed, we use a default value of 266
    if(json.height) {
	    correctHeight=json.height;
    } else {
	    correctHeight=266;
    }
    
    Iframer.superclass.constructor.call(this, {
        autoHeight: true,
        autoScroll: true,
        defaults: {
            autoScroll: true
        },
        html: '<div style="text-align:center;padding:2px;"><iframe style="border: none;" src="'+json.iframe_src_url+'" width="100%" height="'+correctHeight+'"></iframe></div>'
    });
    
    /** We cannot change the height on the fly using onload and a javascript function because at run time 
     *  we cannot access contentWindow.document.body of the contained src. We can do it only if the parent document and the iframe 
     *  are in the same domain (more precisely, the scheme, hostname and port match). Otherwise the JavaScript code throws an exception: 
     *  "Permission denied to get property HTMLDocument.body". 
     *  See for example http://www.mattcutts.com/blog/iframe-height-scrollbar-example/
     *  So we ask the json to pass the height, that's easy.
     *  A solution [http://www.surveygizmo.com/forum/?forum=3&topic=836 here] but you must be able to injext a script tag inside the <iframe> document 
     */
}

Ext.extend(Iframer, Ext.Panel); 
