
 Ext.define("DE.component.MenuDimensionPicker", {
    extend: "Ext.menu.Menu",
    alias: "widget.demenudimensionpicker",
    requires: ["DE.component.DimensionPicker"],
    hideOnClick: true,
    minWidth: 10,
    minHeight: 10,
    maxWidth: 1000,
    maxHeight: 1000,
    minRows: 5,
    minColumns: 5,
    maxRows: 20,
    maxColumns: 20,
    baseCls: "dimension-picker-menu",
    initComponent: function () {
        var me = this,
        cfg = Ext.apply({},
        me.initialConfig);
        delete cfg.listeners;
        Ext.apply(me, {
            plain: true,
            showSeparator: false,
            items: Ext.applyIf({
                xtype: "dedimensionpicker",
                minRows: this.minRows,
                minColumns: this.minColumns,
                maxRows: this.maxRows,
                maxColumns: this.maxColumns
            },
            cfg)
        });
        me.callParent(arguments);
        me.picker = me.down("dedimensionpicker");
        me.relayEvents(me.picker, ["select"]);
        if (me.hideOnClick) {
            me.on("select", me.hidePickerOnSelect, me);
        }
        var onPickerChange = function (picker, columns, rows) {
            var width = ((columns < me.picker.minColumns) ? me.picker.minColumns : ((columns + 1 > me.picker.maxColumns) ? me.picker.maxColumns : columns + 1));
            var height = ((rows < me.picker.minRows) ? me.picker.minRows : ((rows + 1 > me.picker.maxRows) ? me.picker.maxRows : rows + 1));
            width = width * me.picker.itemSize + 2 * me.picker.padding;
            height = height * me.picker.itemSize + 2 * me.picker.padding + me.picker.itemSize;
            me.setSize(width, height);
        };
        me.picker.addListener("change", onPickerChange, this);
    },
    show: function (animateTarget, callback, scope) {
        var me = this;
        me.callParent(arguments);
        me.picker.setTableSize(0, 0);
        this.setSize(me.picker.minColumns * me.picker.itemSize + 2 * me.picker.padding, me.picker.minRows * me.picker.itemSize + 2 * me.picker.padding + me.picker.itemSize);
    },
    hidePickerOnSelect: function (picker, columns, rows) {
        Ext.menu.Manager.hideAll();
    }
});