
 Ext.define("Common.plugin.DataViewScrollPane", {
    extend: "Common.plugin.ScrollPane",
    alias: "plugin.dataviewscrollpane",
    areaSelector: ".x-component",
    init: function (cmp) {
        var me = this,
        store;
        me.callParent(arguments);
        store = me.cmp.getStore();
        if (store) {
            store.on("datachanged", function () {
                me.cmp && me.cmp.rendered && me.cmp.getWidth() > 0 && me.cmp.getHeight() > 0 && me.updateScrollPane();
            },
            me, {
                buffer: 10
            });
        }
        me.cmp.on("viewready", me.onViewReady, me, {
            single: true
        });
    },
    onKeyDown: function (e, eOpts) {
        var me = this;
        var store = me.cmp.getStore();
        var highlightAt = function (index) {
            var item = me.cmp.getNode(store.getAt(index)),
            itemEl = Ext.create("Ext.Element", item);
            if (item) {
                var container = Ext.getDom(me.cmp.getTargetEl()) || Ext.getBody().dom;
                var offsets = itemEl.getOffsetsTo(container),
                top = offsets[1] + container.scrollTop,
                bottom = top + item.offsetHeight,
                ctClientHeight = container.clientHeight,
                ctScrollTop = parseInt(container.scrollTop, 10),
                ctBottom = ctScrollTop + ctClientHeight;
                if (item.offsetHeight > ctClientHeight || top < ctScrollTop) {
                    if (me.jspApi) {
                        me.jspApi.scrollByY(top, false);
                    }
                } else {
                    if (bottom > ctBottom) {
                        if (me.jspApi) {
                            me.jspApi.scrollByY(bottom - ctClientHeight, false);
                        }
                    }
                }
            }
        };
        switch (e.getKey()) {
        case e.UP:
            case e.DOWN:
            var currItem = me.cmp.getSelectionModel().getLastSelected(),
            currItemIdx = currItem ? store.indexOf(currItem) : -1;
            highlightAt(currItemIdx);
            break;
        case e.PAGE_UP:
            case e.PAGE_DOWN:
            break;
        case e.HOME:
            me.cmp.select(0);
            highlightAt(0);
            break;
        case e.END:
            me.cmp.select(store.count() - 1);
            highlightAt(store.count() - 1);
            break;
        }
    },
    onViewReady: function () {
        var me = this;
        me.cmp.getEl().on("keydown", me.onKeyDown, me);
    }
});