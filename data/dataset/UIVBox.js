/**
 * The vertical box of Cocos UI. Its layout type is ccui.Layout.LINEAR_VERTICAL.
 * @class
 * @extends ccui.Layout
 */
ccui.VBox = ccui.Layout.extend(/** @lends ccui.VBox# */{
    /**
     * The constructor of ccui.VBox
     * @function
     * @param {cc.Size} size
     */
    ctor: function(size){
        ccui.Layout.prototype.ctor.call(this, size);
        if(size !== undefined)
            this.initWithSize(size);
        else
            this.init();
    },

    /**
     * Initializes a VBox. please do not call this function by yourself, you should pass the parameters to constructor to initialize it.
     * @override
     * @returns {boolean}
     */
    init: function(){
        if(ccui.Layout.prototype.init.call(this)){
            this.setLayoutType(ccui.Layout.LINEAR_VERTICAL);
            return true;
        }
        return false;
    },

    /**
     * Initializes a VBox with size.
     * @param {cc.Size} size
     * @returns {boolean}
     */
    initWithSize: function(size){
        if(this.init()){
            this.setContentSize(size);
            return true;
        }
        return false;
    }
});

/**
 * Creates a VBox
 * @param {cc.Size} size
 * @returns {ccui.VBox}
 */
ccui.VBox.create = function(size){
    return new ccui.VBox(size);
};