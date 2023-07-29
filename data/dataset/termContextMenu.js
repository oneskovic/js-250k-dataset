Ext.define('Rubedo.view.termContextMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.termContextMenu',

    requires: [
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    id: 'termContextMenu',
    showSeparator: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    localiserId: 'termField',
                    id: 'nouveauTermeTaxoField',
                    fieldLabel: 'Terme ',
                    labelWidth: 50,
                    allowBlank: false
                },
                {
                    xtype: 'button',
                    localiserId: 'addBtn',
                    id: 'boutonAjouterTermesTaxo',
                    icon: '',
                    iconCls: 'add',
                    text: 'Ajouter'
                },
                {
                    xtype: 'button',
                    localiserId: 'removeBtn',
                    id: 'boutonSupprimerTermesTaxo',
                    iconCls: 'close',
                    text: 'Supprimer'
                }
            ]
        });

        me.callParent(arguments);
    }

});