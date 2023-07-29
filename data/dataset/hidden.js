Ext.define('Ext.field.Hidden', {
    extend: 'Ext.field.Field',
    alternateClassName: 'Ext.form.Hidden',
    xtype: 'hiddenfield',

    config: {
        /**
         * @cfg
         * @inheritdoc
         */
        component: {
            xtype: 'input',
            type : 'hidden'
        },

        /**
         * @cfg
         * @inheritdoc
         */
        ui: 'hidden',

        /**
         * @cfg hidden
         * @hide
         */
        hidden: true,

        /**
         * @cfg {Number} tabIndex
         * @hide
         */
        tabIndex: -1
    }

});
