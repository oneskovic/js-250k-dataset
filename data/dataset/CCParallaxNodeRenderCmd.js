//TODO find a way to simple these code.

(function(){
    cc.ParallaxNode.CanvasRenderCmd = function(renderable){
        cc.Node.CanvasRenderCmd.call(this, renderable);
        this._needDraw = false;
    };

    var proto = cc.ParallaxNode.CanvasRenderCmd.prototype = Object.create(cc.Node.CanvasRenderCmd.prototype);
    proto.constructor = cc.ParallaxNode.CanvasRenderCmd;

    proto.updateStatus = function(){
        this._node._updateParallaxPosition();
        cc.Node.CanvasRenderCmd.prototype.updateStatus.call(this);
    };

    proto._syncStatus = function(parentCmd){
        this._node._updateParallaxPosition();
        cc.Node.CanvasRenderCmd.prototype._syncStatus.call(this, parentCmd);
    }
})();

(function(){
    if(cc._renderType !== cc._RENDER_TYPE_WEBGL)
        return;

    cc.ParallaxNode.WebGLRenderCmd = function(renderable){
        cc.Node.WebGLRenderCmd.call(this, renderable);
        this._needDraw = false;
    };

    var proto = cc.ParallaxNode.WebGLRenderCmd.prototype = Object.create(cc.Node.WebGLRenderCmd.prototype);
    proto.constructor = cc.ParallaxNode.WebGLRenderCmd;

    proto.updateStatus = function(){
        this._node._updateParallaxPosition();
        cc.Node.WebGLRenderCmd.prototype.updateStatus.call(this);
    };

    proto._syncStatus = function(parentCmd){
        this._node._updateParallaxPosition();
        cc.Node.WebGLRenderCmd.prototype._syncStatus.call(this, parentCmd);
    }
})();

