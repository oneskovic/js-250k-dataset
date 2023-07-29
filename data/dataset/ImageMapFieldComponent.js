Ext.define('Rubedo.view.ImageMapFieldComponent', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.ImageMapFieldComponent',

    requires: [
        'Ext.button.Button'
    ],

    height: 29,
    width: 455,
    fieldLabel: 'Label',
    labelSeparator: ' ',
    labelWidth: 60,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    localiserId: 'addBtn',
                    itemId: 'addBtn',
                    margin: '0 10 0 0',
                    iconCls: 'add',
                    text: 'Ajouter'
                },
                {
                    xtype: 'button',
                    localiserId: 'modifyBtn',
                    itemId: 'editBtn',
                    margin: '0 10 0 0',
                    iconCls: 'edit',
                    text: 'Modifier'
                },
                {
                    xtype: 'button',
                    localiserId: 'removeBtn',
                    itemId: 'removeBtn',
                    iconCls: 'close',
                    text: 'Supprimer'
                }
            ]
        });

        me.callParent(arguments);
    }

});