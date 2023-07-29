Ext.define('Rubedo.view.NestedContentAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.NestedContentAddWindow',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.TextArea'
    ],

    height: 500,
    id: 'NestedContentAddWindow',
    width: 900,
    resizable: false,
    layout: 'fit',
    constrainHeader: true,
    iconCls: 'documentDep',
    title: 'Nouveau Contenu Imbriqué',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            isUpdate: false,
                            id: 'nestedContentRecordBtn',
                            iconCls: 'save',
                            text: 'Enregistrer'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    height: 101,
                    id: 'nestedContentsFieldBox',
                    autoScroll: true,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            padding: 10,
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '90%',
                                    style: {
                                        float: left
                                    },
                                    fieldLabel: 'Titre ',
                                    name: 'text',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'helpBouton',
                                    style: '{float:right;}',
                                    handleMouseEvents: false,
                                    iconCls: 'help',
                                    pressedCls: 'x-btn',
                                    text: '',
                                    tooltip: 'Titre du contenu. Obligatoire.'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            padding: 10,
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'textareafield',
                                    anchor: '90%',
                                    style: {
                                        float: left
                                    },
                                    fieldLabel: 'Résumé',
                                    labelSeparator: ' ',
                                    name: 'summary'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'helpBouton',
                                    style: '{float:right;}',
                                    handleMouseEvents: false,
                                    iconCls: 'help',
                                    pressedCls: 'x-btn',
                                    text: '',
                                    tooltip: 'Résumé facultatif du contenu.'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});