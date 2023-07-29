(function(){
    cc.LabelAtlas.CanvasRenderCmd = function(renderableObject){
        cc.AtlasNode.CanvasRenderCmd.call(this, renderableObject);
        this._needDraw = false;
    };

    var proto = cc.LabelAtlas.CanvasRenderCmd.prototype = Object.create(cc.AtlasNode.CanvasRenderCmd.prototype);
    proto.constructor = cc.LabelAtlas.CanvasRenderCmd;

    proto.setCascade = function(){
        var node = this._node;
        node._cascadeOpacityEnabled = true;
        node._cascadeColorEnabled = false;
    };

    proto.updateAtlasValues = function(){
        var node = this._node;
        var locString = node._string || "";
        var n = locString.length;
        var texture = this._texture;
        var locItemWidth = node._itemWidth , locItemHeight = node._itemHeight;     //needn't multiply cc.contentScaleFactor(), because sprite's draw will do this

        for (var i = 0; i < n; i++) {
            var a = locString.charCodeAt(i) - node._mapStartChar.charCodeAt(0);
            var row = parseInt(a % node._itemsPerRow, 10);
            var col = parseInt(a / node._itemsPerRow, 10);

            var rect = cc.rect(row * locItemWidth, col * locItemHeight, locItemWidth, locItemHeight);
            var c = locString.charCodeAt(i);
            var fontChar = node.getChildByTag(i);
            if (!fontChar) {
                fontChar = new cc.Sprite();
                if (c === 32) {
                    fontChar.init();
                    fontChar.setTextureRect(cc.rect(0, 0, 10, 10), false, cc.size(0, 0));
                } else
                    fontChar.initWithTexture(texture, rect);

                cc.Node.prototype.addChild.call(node, fontChar, 0, i);
            } else {
                if (c === 32) {
                    fontChar.init();
                    fontChar.setTextureRect(cc.rect(0, 0, 10, 10), false, cc.size(0, 0));
                } else {
                    // reusing fonts
                    fontChar.initWithTexture(texture, rect);
                    // restore to default in case they were modified
                    fontChar.visible = true;
                }
            }
            fontChar.setPosition(i * locItemWidth + locItemWidth / 2, locItemHeight / 2);
        }
    };

    proto.setString = function(label){
        var node = this._node;
        if (node._children) {
            var locChildren = node._children;
            var len = locChildren.length;
            for (var i = 0; i < len; i++) {
                var child = locChildren[i];
                if (child && !child._lateChild)
                    child.visible = false;
            }
        }
    };

    proto._addChild = function(){
        child._lateChild = true;
    };
})();