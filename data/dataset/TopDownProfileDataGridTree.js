/**
 * @constructor
 * @extends {WebInspector.ProfileDataGridNode}
 * @param {!ProfilerAgent.CPUProfileNode} profileNode
 * @param {!WebInspector.TopDownProfileDataGridTree} owningTree
 */
WebInspector.TopDownProfileDataGridNode = function(profileNode, owningTree)
{
    var hasChildren = !!(profileNode.children && profileNode.children.length);

    WebInspector.ProfileDataGridNode.call(this, profileNode, owningTree, hasChildren);

    this._remainingChildren = profileNode.children;
}

WebInspector.TopDownProfileDataGridNode.prototype = {
    _sharedPopulate: function()
    {
        var children = this._remainingChildren;
        var childrenLength = children.length;

        for (var i = 0; i < childrenLength; ++i)
            this.appendChild(new WebInspector.TopDownProfileDataGridNode(children[i], this.tree));

        this._remainingChildren = null;
    },

    _exclude: function(aCallUID)
    {
        if (this._remainingChildren)
            this.populate();

        this._save();

        var children = this.children;
        var index = this.children.length;

        while (index--)
            children[index]._exclude(aCallUID);

        var child = this.childrenByCallUID[aCallUID];

        if (child)
            this._merge(child, true);
    },

    __proto__: WebInspector.ProfileDataGridNode.prototype
}

/**
 * @constructor
 * @extends {WebInspector.ProfileDataGridTree}
 * @param {WebInspector.CPUProfileView} profileView
 * @param {ProfilerAgent.CPUProfileNode} rootProfileNode
 */
WebInspector.TopDownProfileDataGridTree = function(profileView, rootProfileNode)
{
    WebInspector.ProfileDataGridTree.call(this, profileView, rootProfileNode);

    this._remainingChildren = rootProfileNode.children;

    var any = /** @type{*} */(this);
    var node = /** @type{WebInspector.ProfileDataGridNode} */(any);
    WebInspector.TopDownProfileDataGridNode.prototype.populate.call(node);
}

WebInspector.TopDownProfileDataGridTree.prototype = {
    /**
     * @param {!WebInspector.ProfileDataGridNode} profileDataGridNode
     */
    focus: function(profileDataGridNode)
    {
        if (!profileDataGridNode)
            return;

        this._save();
        profileDataGridNode.savePosition();

        this.children = [profileDataGridNode];
        this.totalTime = profileDataGridNode.totalTime;
    },

    /**
     * @param {!WebInspector.ProfileDataGridNode} profileDataGridNode
     */
    exclude: function(profileDataGridNode)
    {
        if (!profileDataGridNode)
            return;

        this._save();

        var excludedCallUID = profileDataGridNode.callUID;

        var any = /** @type{*} */(this);
        var node = /** @type{WebInspector.TopDownProfileDataGridNode} */(any);
        WebInspector.TopDownProfileDataGridNode.prototype._exclude.call(node, excludedCallUID);

        if (this.lastComparator)
            this.sort(this.lastComparator, true);
    },

    restore: function()
    {
        if (!this._savedChildren)
            return;

        this.children[0].restorePosition();

        WebInspector.ProfileDataGridTree.prototype.restore.call(this);
    },

    _merge: WebInspector.TopDownProfileDataGridNode.prototype._merge,

    _sharedPopulate: WebInspector.TopDownProfileDataGridNode.prototype._sharedPopulate,

    __proto__: WebInspector.ProfileDataGridTree.prototype
}
