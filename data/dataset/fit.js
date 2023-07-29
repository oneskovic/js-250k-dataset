Ext.define('Ext.layout.Fit', {
    extend: 'Ext.layout.Default',
    alternateClassName: 'Ext.layout.FitLayout',

    alias: 'layout.fit',

    cls: Ext.baseCSSPrefix + 'layout-fit',

    itemCls: Ext.baseCSSPrefix + 'layout-fit-item',

    constructor: function(container) {
        this.callParent(arguments);

        this.apply();
    },

    apply: function() {
        this.container.innerElement.addCls(this.cls);
    },

    reapply: function() {
        this.apply();
    },

    unapply: function() {
        this.container.innerElement.removeCls(this.cls);
    },

    doItemAdd: function(item, index) {
        if (item.isInnerItem()) {
            item.addCls(this.itemCls);
        }

        this.callParent(arguments);
    },

    /**
     * @private
     */
    doItemRemove: function(item) {
        if (item.isInnerItem()) {
            item.removeCls(this.itemCls);
        }

        this.callParent(arguments);
    }
});
