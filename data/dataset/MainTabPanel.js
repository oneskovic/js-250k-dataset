Ext.ns('OE');

OE.MainTabPanel = Ext.extend(Ext.TabPanel, {
    constructor: function (config) {
        config = Ext.apply({
            id: OE.main.tabsPanelId,
            region: 'center',
            layoutOnTabChange: true,
            plain: true,
            activeTab: 0,
            enableTabScroll: true,
            items: [ ]
        }, config);

        OE.MainTabPanel.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        this.on('beforetabchange', function (tabPanel, newTab) {
            // Make sure the navigation panel's node is also set to selected
            var navPanelCtrl = OE.NavPanel.instance;
            var newTabId = newTab.itemId;

            if (!newTabId) {
                // do nothing, just unselect and return
                var selectedNode = navPanelCtrl.selModel.selNode;
                if (selectedNode) {
                    selectedNode.unselect();
                }
            } else {
                if (navPanelCtrl.root.attributes.children && navPanelCtrl.root.attributes.children.length > 0) {
                    for (var i = 0; i < navPanelCtrl.root.attributes.children.length; i++) {
                        var node = navPanelCtrl.root.attributes.children[i];
                        if (node) {
                            if (node.leaf && (newTab.itemId == node.id)) {
                                navPanelCtrl.getNodeById(treeItem.id).select();
                            }
                            else if (!node.leaf && node.children && node.children.length > 0) {
                                for (var j = 0; j < node.children.length; j++) {
                                    var leafNode = node.children[j];

                                    if (leafNode.id == newTabId) {
                                        navPanelCtrl.getNodeById(leafNode.id).select();

                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        OE.MainTabPanel.superclass.initComponent.call(this);
    }
});

OE.MainTabPanel.instance = null;
