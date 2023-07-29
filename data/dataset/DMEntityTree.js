kimios.util.DMEntityTree = Ext.extend(Ext.tree.TreePanel, {
    constructor: function (config) {
        var getNode = function (withDoc) {
            var myTreeLoader = new Ext.tree.TreeLoader({
                dataUrl: getBackEndUrl('DmsTree'),
                baseParams: {
                    action: 'getEntities',
                    nodeUid: '',
                    dmEntityType: ''
                },
                autoLoad: true
            });
            myTreeLoader.on('beforeload', function (treeLoader, node) {
                myTreeLoader.baseParams.nodeUid = (node.attributes.dmEntityUid ? node.attributes.dmEntityUid : 0);
                myTreeLoader.baseParams.dmEntityType = (node.attributes.type ? node.attributes.type : 1);
                myTreeLoader.baseParams.action = 'getEntities';
            }, this);

            if (withDoc) {
                myTreeLoader.baseParams.withDoc = true;
            }
            myTreeLoader.on('exception', function (me, node, resp) {
                alert(node.id + " " + resp.responseText);
            });

            var rNode = new Ext.tree.AsyncTreeNode({
                draggable: false,
                text: config.rootText,
                iconCls: 'home',
                loader: myTreeLoader,
                allowChildren: true
            });

            return rNode;
        };

        this.loadMask = true;
        this.useArrows = true;
        if (config.dmEntityType) this.dmEntityType = 3;
        this.withDoc = (config.withDoc ? config.withDoc : false);
        this.root = (config.root ? config.root : getNode(this.withDoc));
        this.autoScroll = (config.autoScroll ? config.autoScroll : true);
        kimios.util.DMEntityTree.superclass.constructor.call(this, config);
        this.root.expand();
    }
});
