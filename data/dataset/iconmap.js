// #ifdef __AMLICONMAP || __INC_ALL

/**
 * element that provides a means to get icons from a
 * single image containing many icons.
 * Example:
 * <code>
 *  <a:iconmap 
 *    id     = "tbicons" 
 *    src    = "toolbar.icons.gif"
 *    type   = "horizontal" 
 *    size   = "20" 
 *    offset = "2,2" />
 *  <a:menu id="menu1">
 *      <a:item icon="tbicons:1">Tutorials</a:item>
 *      <a:item icon="tbicons:5">Contact</a:item>
 *  </a:menu>
 *  <a:toolbar>
 *      <a:menubar>
 *          <a:button submenu="menu1">File</a:button>
 *      </a:menubar>
 *  </a:toolbar>
 * </code>
 * @attribute {String} src    the location of the image.
 * @attribute {String} type   the spatial distribution of the icons within the image.
 *   Possible values:
 *   horizontal the icons are horizontally tiled.
 *   vertically the icons are vertically tiled.
 * @attribute {String} size   the width and height in pixels of an icon. Use this for square icons.
 * @attribute {String} width  the width of an icon in pixels.
 * @attribute {String} height the height of an icon in pixels.
 * @attribute {String} offset the distance from the calculated grid point that has to be added. This value consists of two numbers seperated by a comma. Defaults to 0,0.
 * @addnode elements
 *
 * @author      Ruben Daniels (ruben AT ajax DOT org)
 * @version     %I%, %G%
 * @since       0.4
 */
apf.iconmap = function(){
    this.$init("iconmap", apf.NODE_HIDDEN);
};

(function(){
    this.$parsePrio = "050";
    
    this.addEventListener("DOMNodeInsertedIntoDocument", function(e){
        //#ifdef __DEBUG
        if (!this.id) {
            throw new Error(apf.formatErrorString(0, this,
                "Creating icon map",
                "Could not create iconmap. Missing id attribute", this.$aml));
        }
        //#endif

        apf.skins.addIconMap({
            name   : this.id,
            src    : this.src,
            type   : this.type,
            size   : parseInt(this.size),
            width  : parseInt(this.width),
            height : parseInt(this.height),
            offset : (this.offset || "0,0").splitSafe(",")
        });
    });
}).call(apf.iconmap.prototype = new apf.AmlElement());

apf.aml.setElement("iconmap", apf.iconmap);

// #endif
