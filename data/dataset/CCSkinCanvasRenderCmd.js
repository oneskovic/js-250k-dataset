(function(){
    ccs.Skin.RenderCmd = {
        updateArmatureTransform: function () {
            var node = this._node;
            this._transform = cc.affineTransformConcat(
                node._skinTransform,
                node.bone.getNodeToArmatureTransform()
            );
            this._dirtyFlag = this._dirtyFlag & cc.Node._dirtyFlags.transformDirty ^ this._dirtyFlag;
        },

        getNodeToWorldTransform: function () {
            return cc.affineTransformConcat(this._transform, this._node.bone.getArmature().getNodeToWorldTransform());
        },

        getNodeToWorldTransformAR: function () {
            var displayTransform = this._transform, node = this._node;
            this._anchorPointInPoints = cc.pointApplyAffineTransform(this._anchorPointInPoints, displayTransform);
            displayTransform.tx = this._anchorPointInPoints.x;
            displayTransform.ty = this._anchorPointInPoints.y;
            return cc.affineTransformConcat(displayTransform, node.bone.getArmature().getNodeToWorldTransform());
        }
    };

    ccs.Skin.CanvasRenderCmd = function(renderable){
        cc.Sprite.CanvasRenderCmd.call(this, renderable);
        this._needDraw = true;
    };

    var proto = ccs.Skin.CanvasRenderCmd.prototype = Object.create(cc.Sprite.CanvasRenderCmd.prototype);
    cc.inject(ccs.Skin.RenderCmd, proto);
    proto.constructor = ccs.Skin.CanvasRenderCmd;
})();
