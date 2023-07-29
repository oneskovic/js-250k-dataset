Ext.define('Rubedo.view.DelConfirmZ', {
    extend: 'Ext.window.Window',
    alias: 'widget.delConfirmZ',

    requires: [
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Hidden'
    ],

    localiserId: 'confirmDeleteWindow',
    draggable: false,
    id: 'delConfirmZ',
    width: 224,
    resizable: false,
    closable: false,
    iconCls: 'warning',
    title: 'Confirmation de suppression',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'panel',
                            border: 0,
                            height: 60,
                            hidden: true,
                            id: 'delConMessageHolder',
                            title: ''
                        },
                        {
                            xtype: 'button',
                            localiserId: 'confirmDeleteYes',
                            id: 'delConfirmZOui',
                            margin: '0 15 0 10',
                            iconCls: 'ouiS',
                            scale: 'large',
                            text: 'Oui'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                button.up().up().close();
                            },
                            localiserId: 'confirmDeleteNo',
                            id: 'delConfirmZNon',
                            margin: '0 0 0 20',
                            iconCls: 'nonS',
                            scale: 'large',
                            text: 'Non'
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'delConfirmZField',
                            fieldLabel: 'Label'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});