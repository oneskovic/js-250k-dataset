Ext.define('Ext.field.TextArea', {
    extend: 'Ext.field.Text',
    xtype: 'textareafield',
    requires: ['Ext.field.TextAreaInput'],
    alternateClassName: 'Ext.form.TextArea',

    config: {
        /**
         * @cfg
         * @inheritdoc
         */
        ui: 'textarea',

        /**
         * @cfg
         * @inheritdoc
         */
        autoCapitalize: false,

        /**
         * @cfg
         * @inheritdoc
         */
        component: {
            xtype: 'textareainput'
        },

        /**
         * @cfg {Number} maxRows The maximum number of lines made visible by the input.
         * @accessor
         */
        maxRows: null
    },

    // @private
    updateMaxRows: function(newRows) {
        this.getComponent().setMaxRows(newRows);
    },

    doSetHeight: function(newHeight) {
        this.callParent(arguments);
        var component = this.getComponent();
        component.input.setHeight(newHeight);
    },

    doSetWidth: function(newWidth) {
        this.callParent(arguments);
        var component = this.getComponent();
        component.input.setWidth(newWidth);
    },

    /**
     * Called when a key has been pressed in the `<input>`
     * @private
     */
    doKeyUp: function(me) {
        // getValue to ensure that we are in sync with the dom
        var value = me.getValue();

        // show the {@link #clearIcon} if it is being used
        me[value ? 'showClearIcon' : 'hideClearIcon']();
    }
});
