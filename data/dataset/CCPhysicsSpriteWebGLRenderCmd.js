/**
 * cc.PhysicsSprite's rendering objects of WebGL
 */
(function(){
    cc.PhysicsSprite.WebGLRenderCmd = function(renderableObject){
        cc.Sprite.WebGLRenderCmd.call(this, renderableObject);
        this._needDraw = true;
    };

    var proto = cc.PhysicsSprite.WebGLRenderCmd.prototype = Object.create(cc.Sprite.WebGLRenderCmd.prototype);
    proto.constructor = cc.PhysicsSprite.WebGLRenderCmd;

    proto.rendering = function(ctx){
        //  This is a special class
        //  Sprite can not obtain sign
        //  So here must to calculate of each frame
        var node  = this._node;
        node._syncPosition();
        if(!node._ignoreBodyRotation)
            node._syncRotation();
        this.transform(this.getParentRenderCmd());

        cc.Sprite.WebGLRenderCmd.prototype.rendering.call(this, ctx);
    };

    proto.getNodeToParentTransform = function(){
        var node = this._node;
        var locBody = node._body, locAnchorPIP = this._anchorPointInPoints, locScaleX = node._scaleX, locScaleY = node._scaleY;
        var x = locBody.p.x;
        var y = locBody.p.y;

        if (this._ignoreAnchorPointForPosition) {
            x += locAnchorPIP.x;
            y += locAnchorPIP.y;
        }

        // Make matrix
        var radians = locBody.a, c = 1, s=0;
        if (radians && !node._ignoreBodyRotation) {
            c = Math.cos(radians);
            s = Math.sin(radians);
        }

        // Although scale is not used by physics engines, it is calculated just in case
        // the sprite is animated (scaled up/down) using actions.
        // For more info see: http://www.cocos2d-iphone.org/forum/topic/68990
        if (!cc._rectEqualToZero(locAnchorPIP)) {
            x += c * -locAnchorPIP.x * locScaleX + -s * -locAnchorPIP.y * locScaleY;
            y += s * -locAnchorPIP.x * locScaleX + c * -locAnchorPIP.y * locScaleY;
        }

        // Rot, Translate Matrix
        this._transform = cc.affineTransformMake(c * locScaleX, s * locScaleX,
                -s * locScaleY, c * locScaleY, x, y);

        return this._transform;
    };

    proto.updateTransform = function(){
        this._dirty = this._node.isDirty();
        cc.Sprite.WebGLRenderCmd.prototype.updateTransform.call(this);
    };
})();