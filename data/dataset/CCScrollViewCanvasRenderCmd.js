(function() {
    cc.ScrollView.CanvasRenderCmd = function(renderable){
        cc.Layer.CanvasRenderCmd.call(this, renderable);
        this._needDraw = false;

        this.startCmd = new cc.CustomRenderCmd(this, this._startCmd);
        this.endCmd = new cc.CustomRenderCmd(this, this._endCmd);
    };

    var proto = cc.ScrollView.CanvasRenderCmd.prototype = Object.create(cc.Layer.CanvasRenderCmd.prototype);
    proto.constructor = cc.ScrollView.CanvasRenderCmd;

    proto._startCmd = function(ctx, scaleX, scaleY){
        var node = this._node;
        var wrapper = ctx || cc._renderContext, context = wrapper.getContext();
        wrapper.save();

        if (node._clippingToBounds) {
            this._scissorRestored = false;
            wrapper.setTransform(this._worldTransform, scaleX, scaleY);

            var locScaleX = node.getScaleX(), locScaleY = node.getScaleY();

            var getWidth = (node._viewSize.width * locScaleX) * scaleX;
            var getHeight = (node._viewSize.height * locScaleY) * scaleY;

            context.beginPath();
            context.rect(0, 0, getWidth, -getHeight);
            context.closePath();
            context.clip();
        }
    };

    proto._endCmd = function(wrapper){
        wrapper = wrapper || cc._renderContext;
        wrapper.restore();
    };

    proto.visit = function(parentCmd){
        var node = this._node;
        var i, locChildren = node._children, childrenLen;

        this.transform(parentCmd);
        cc.renderer.pushRenderCommand(this.startCmd);

        if (locChildren && locChildren.length > 0) {
            childrenLen = locChildren.length;
            node.sortAllChildren();
            for (i = 0; i < childrenLen; i++) {
                locChildren[i]._renderCmd.visit(this);
            }
        }
        cc.renderer.pushRenderCommand(this.endCmd);
    };
})();