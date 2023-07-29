/**
 * The Relative box for Cocos UI layout.  Its layout type is ccui.Layout.RELATIVE.
 * @class
 * @extends ccui.Layout
 */
ccui.RelativeBox = ccui.Layout.extend(/** @lends ccui.RelativeBox# */{
    /**
     * The constructor of ccui.RelativeBox
     * @function
     * @param {cc.Size} [size]
     */
    ctor: function(size){
        if(size)
            this.initWithSize(size);
        else
            this.init();
    },

    /**
     * Initializes a relative box. please do not call this function by yourself, you should pass the parameters to constructor to initialize it.
     * @override
     * @returns {boolean}
     */
    init: function(){
        if(ccui.Layout.prototype.init.call(this)){
            this.setLayoutType(ccui.Layout.RELATIVE);
            return true;
        }
        return false;
    },

    /**
     * Initializes a relative box with size
     * @param {cc.Size} [size]
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
 * Creates a relative box
 * @deprecated  since v3.0, please use new ccui.RelativeBox(size) instead.
 * @param {cc.Size} size
 * @returns {ccui.RelativeBox}
 */
ccui.RelativeBox.create = function(size){
    return new ccui.RelativeBox(size);
};