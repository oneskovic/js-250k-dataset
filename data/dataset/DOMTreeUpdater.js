WebInspector.DOMTreeUpdater = function(treeOutline)
{
    WebInspector.domTreeManager.addEventListener(WebInspector.DOMTreeManager.Event.NodeInserted, this._nodeInserted, this);
    WebInspector.domTreeManager.addEventListener(WebInspector.DOMTreeManager.Event.NodeRemoved, this._nodeRemoved, this);
    WebInspector.domTreeManager.addEventListener(WebInspector.DOMTreeManager.Event.AttributeModified, this._attributesUpdated, this);
    WebInspector.domTreeManager.addEventListener(WebInspector.DOMTreeManager.Event.AttributeRemoved, this._attributesUpdated, this);
    WebInspector.domTreeManager.addEventListener(WebInspector.DOMTreeManager.Event.CharacterDataModified, this._characterDataModified, this);
    WebInspector.domTreeManager.addEventListener(WebInspector.DOMTreeManager.Event.DocumentUpdated, this._documentUpdated, this);
    WebInspector.domTreeManager.addEventListener(WebInspector.DOMTreeManager.Event.ChildNodeCountUpdated, this._childNodeCountUpdated, this);

    this._treeOutline = treeOutline;
    this._recentlyModifiedNodes = [];
}

WebInspector.DOMTreeUpdater.prototype = {
    close: function()
    {
        WebInspector.domTreeManager.removeEventListener(null, null, this);
    },

    _documentUpdated: function(event)
    {
        this._reset();
    },

    _attributesUpdated: function(event)
    {
        this._recentlyModifiedNodes.push({node: event.data.node, updated: true});
        if (this._treeOutline._visible)
            this._updateModifiedNodesSoon();
    },

    _characterDataModified: function(event)
    {
        this._recentlyModifiedNodes.push({node: event.data.node, updated: true});
        if (this._treeOutline._visible)
            this._updateModifiedNodesSoon();
    },

    _nodeInserted: function(event)
    {
        this._recentlyModifiedNodes.push({node: event.data.node, parent: event.data.parent, inserted: true});
        if (this._treeOutline._visible)
            this._updateModifiedNodesSoon();
    },

    _nodeRemoved: function(event)
    {
        this._recentlyModifiedNodes.push({node: event.data.node, parent: event.data.parent, removed: true});
        if (this._treeOutline._visible)
            this._updateModifiedNodesSoon();
    },

    _childNodeCountUpdated: function(event)
    {
        var treeElement = this._treeOutline.findTreeElement(event.data);
        if (treeElement)
            treeElement.hasChildren = event.data.hasChildNodes();
    },

    _updateModifiedNodesSoon: function()
    {
        if (this._updateModifiedNodesTimeout)
            return;
        this._updateModifiedNodesTimeout = setTimeout(this._updateModifiedNodes.bind(this), 0);
    },

    _updateModifiedNodes: function()
    {
        if (this._updateModifiedNodesTimeout) {
            clearTimeout(this._updateModifiedNodesTimeout);
            delete this._updateModifiedNodesTimeout;
        }

        var updatedParentTreeElements = [];

        for (var i = 0; i < this._recentlyModifiedNodes.length; ++i) {
            var parent = this._recentlyModifiedNodes[i].parent;
            var node = this._recentlyModifiedNodes[i].node;

            if (this._recentlyModifiedNodes[i].updated) {
                var nodeItem = this._treeOutline.findTreeElement(node);
                if (nodeItem)
                    nodeItem.updateTitle();
                continue;
            }

            if (!parent)
                continue;

            var parentNodeItem = this._treeOutline.findTreeElement(parent);
            if (parentNodeItem && !parentNodeItem.alreadyUpdatedChildren) {
                parentNodeItem.updateChildren();
                parentNodeItem.alreadyUpdatedChildren = true;
                updatedParentTreeElements.push(parentNodeItem);
            }
        }

        for (var i = 0; i < updatedParentTreeElements.length; ++i)
            delete updatedParentTreeElements[i].alreadyUpdatedChildren;

        this._recentlyModifiedNodes = [];
    },

    _reset: function()
    {
        WebInspector.domTreeManager.hideDOMNodeHighlight();
        this._recentlyModifiedNodes = [];
    }
}
