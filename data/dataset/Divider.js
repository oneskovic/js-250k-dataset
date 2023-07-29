// #ifdef __AMLDIVIDER || __INC_ALL

/**
 * Element displaying a divider. For use in toolbars, menu's and such.
 * @define divider
 * @constructor
 */
apf.divider = function(struct, tagName){
    this.$init(tagName || "divider", apf.NODE_VISIBLE, struct);
};

(function() {
    this.$focussable = false;

    this.implement(apf.ChildValue);
    this.$childProperty = "caption";
    
    //@todo apf3.0 fix this
    this.addEventListener("AMLReparent", function(beforeNode, pNode, withinParent){
        if (!this.$amlLoaded)
            return;
        
        if (!withinParent && this.skinName != pNode.skinName) {
            //@todo for now, assuming dom garbage collection doesn't leak
            this.loadAml();
        }
    });
    
    /** 
     * @attribute {String} caption the text displayed in the area defined by this 
     * element. 
     */
    this.$supportedProperties.push("caption", "value", "for", "textalign");
    this.$propHandlers["caption"] = function(value){
        if (this.$caption) {
            this.$setStyleClass(this.$ext, this.$baseCSSname + "Caption");
            this.$caption.innerHTML = value;
        }
        else {
            this.$setStyleClass(this.$ext, "", [this.$baseCSSname + "Caption"]);
        }
    };
    
    this.$canLeechSkin = true;
    
    /**
     * @private
     */
    this.$draw = function() {
        if (this.parentNode.isPaged && this.parentNode.$buttons)
            this.$pHtmlNode = this.parentNode.$buttons;
        
        if (this.$isLeechingSkin) {
            this.$ext = apf.insertHtmlNode(
                this.parentNode.$getLayoutNode("divider"), this.$pHtmlNode);
        }
        else {
            this.$ext     = this.$getExternal("main");
            this.$caption = this.$getLayoutNode("main", "caption", this.$ext);
        }
    };
}).call(apf.divider.prototype = new apf.Presentation);

apf.aml.setElement("divider", apf.divider);

//#endif