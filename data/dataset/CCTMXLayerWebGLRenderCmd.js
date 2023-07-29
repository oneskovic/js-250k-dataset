(function(){
    cc.TMXLayer.WebGLRenderCmd = function(renderableObject){
        cc.SpriteBatchNode.WebGLRenderCmd.call(this, renderableObject);
        this._needDraw = true;
    };

    var proto = cc.TMXLayer.WebGLRenderCmd.prototype = Object.create(cc.SpriteBatchNode.WebGLRenderCmd.prototype);
    proto.constructor = cc.TMXLayer.WebGLRenderCmd;

    proto._updateCacheContext = function(){};

    proto.initImageSize = function(){
        var node = this._node;
        node.tileset.imageSize = this._textureAtlas.texture.getContentSizeInPixels();

        // By default all the tiles are aliased
        // pros:
        //  - easier to render
        // cons:
        //  - difficult to scale / rotate / etc.
        this._textureAtlas.texture.setAliasTexParameters();
    };

    proto._reusedTileWithRect = function(rect){
        var node = this._node;
        if (!node._reusedTile) {
            node._reusedTile = new cc.Sprite();
            node._reusedTile.initWithTexture(node.texture, rect, false);
            node._reusedTile.batchNode = node;
        } else {
            // XXX HACK: Needed because if "batch node" is nil,
            // then the Sprite'squad will be reset
            node._reusedTile.batchNode = null;

            // Re-init the sprite
            node._reusedTile.setTextureRect(rect, false);

            // restore the batch node
            node._reusedTile.batchNode = node;
        }
        return node._reusedTile;
    };
})();
