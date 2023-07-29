Ext.namespace("Ext.ux.grid", "Ext.ux.renderer");

Ext.ux.grid.ComboColumn = Ext.extend(Ext.grid.Column, {

    /**
     * The grids id
     */
    gridId: undefined,

    constructor: function (cfg) {
        Ext.ux.grid.ComboColumn.superclass.constructor.call(this, cfg);

        // Check for editor using custom renderer otherwise default
        this.renderer = (this.editor && this.editor.triggerAction) ? Ext.ux.renderer.ComboBoxRenderer(this.editor,
            this.gridId) : function (value) {
            return value; // TODO fix this formatting
        };
    }
});
Ext.grid.Column.types.combocolumn = Ext.ux.grid.ComboColumn;

/**
 *  A renderer to show the display value when using combo boxes in editor grids (instead of value/fk)
 */
Ext.ux.renderer.ComboBoxRenderer = function (combo, gridId) {
    // Get the value from displayfield, else value
    var getValue = function (value) {
        var record = combo.store.getAt(combo.store.findExact(combo.valueField, value));
        if (record) {
            return record.get(combo.displayField);
        }

        return value;
    };

    return function (value) {
        // Ensure combos store is loaded
        if (combo.store.getCount() === 0 && gridId) {
            if (!combo.onloadDefined) {
                // Ensure we are adding onLoad only once per combo column
                // This check was added because onLoad was added to the store 2^n times
                // where n is number of combo columns in this grid
                combo.onloadDefined = true;

                combo.store.on('load', function () {
                        var grid = Ext.getCmp(gridId);
                        if (grid) {
                            grid.getView().refresh();
                        }
                    }, {
                        single: true
                    }
                );
            }

            return value;
        }

        return getValue(value);
    };
};
