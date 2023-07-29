if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
    (function () {
        ccui.Widget.CanvasRenderCmd = function (renderable) {
            cc.ProtectedNode.CanvasRenderCmd.call(this, renderable);
            this._needDraw = false;
        };

        var proto = ccui.Widget.CanvasRenderCmd.prototype = Object.create(cc.ProtectedNode.CanvasRenderCmd.prototype);
        proto.constructor = ccui.Widget.CanvasRenderCmd;

        proto.visit = function (parentCmd) {
            var node = this._node;
            if (node._visible) {
                node._adaptRenderers();
                cc.ProtectedNode.CanvasRenderCmd.prototype.visit.call(this, parentCmd);
            }
        };

        proto.transform = function (parentCmd, recursive) {
            var node = this._node;

            if (node._visible) {
                node._adaptRenderers();
                if(!this._usingLayoutComponent){
                    var widgetParent = node.getWidgetParent();
                    if (widgetParent) {
                        var parentSize = widgetParent.getContentSize();
                        if (parentSize.width !== 0 && parentSize.height !== 0) {
                            node._position.x = parentSize.width * node._positionPercent.x;
                            node._position.y = parentSize.height * node._positionPercent.y;
                        }
                    }
                }
                cc.ProtectedNode.CanvasRenderCmd.prototype.transform.call(this, parentCmd, recursive);
            }
        };
    })();
} else {
    (function () {
        ccui.Widget.WebGLRenderCmd = function (renderable) {
            cc.ProtectedNode.WebGLRenderCmd.call(this, renderable);
            this._needDraw = false;
        };

        var proto = ccui.Widget.WebGLRenderCmd.prototype = Object.create(cc.ProtectedNode.WebGLRenderCmd.prototype);
        proto.constructor = ccui.Widget.WebGLRenderCmd;

        proto.visit = function (parentCmd) {
            var node = this._node;
            if (node._visible) {
                node._adaptRenderers();
                cc.ProtectedNode.WebGLRenderCmd.prototype.visit.call(this, parentCmd);
            }
        };

        proto.transform = function(parentCmd, recursive){
            var node = this._node;
            if (node._visible) {
                node._adaptRenderers();

                if(!this._usingLayoutComponent) {
                    var widgetParent = node.getWidgetParent();
                    if (widgetParent) {
                        var parentSize = widgetParent.getContentSize();
                        if (parentSize.width !== 0 && parentSize.height !== 0) {
                            node._position.x = parentSize.width * node._positionPercent.x;
                            node._position.y = parentSize.height * node._positionPercent.y;
                        }
                    }
                }
                cc.ProtectedNode.WebGLRenderCmd.prototype.transform.call(this, parentCmd, recursive);
            }
        };
    })();
}

