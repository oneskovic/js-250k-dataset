/**
 * cc.BakeSprite is a type of sprite that will be cached.
 * @class
 * @extend cc.Sprite
 */
cc.BakeSprite = cc.Sprite.extend(/** @lends cc.BakeSprite# */{
    _cacheCanvas: null,
    _cacheContext: null,

    ctor: function(){
        cc.Sprite.prototype.ctor.call(this);
        var canvasElement = document.createElement("canvas");
        canvasElement.width = canvasElement.height = 10;
        this._cacheCanvas = canvasElement;
        this._cacheContext = new cc.CanvasContextWrapper(canvasElement.getContext("2d"));

        var texture = new cc.Texture2D();
        texture.initWithElement(canvasElement);
        texture.handleLoadedTexture();
        this.setTexture(texture);
    },

    getCacheContext: function(){
        return this._cacheContext;
    },

    getCacheCanvas: function(){
        return this._cacheCanvas;
    },

    /**
     * reset the cache canvas size
     * @param {cc.Size|Number} sizeOrWidth  size or width
     * @param {Number} [height]
     */
    resetCanvasSize: function(sizeOrWidth, height){
        if(height === undefined){
            height = sizeOrWidth.height;
            sizeOrWidth = sizeOrWidth.width;
        }
        var locCanvas = this._cacheCanvas;
        locCanvas.width = sizeOrWidth;
        locCanvas.height = height;   //TODO note baidu browser      reset the context after set width or height
        this.getTexture().handleLoadedTexture();
        this.setTextureRect(cc.rect(0,0, sizeOrWidth, height), false);
    }
});
