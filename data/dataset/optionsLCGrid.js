Ext.define('Rubedo.view.optionsLCGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.optionsLCGrid',

    requires: [
        'Ext.grid.View',
        'Ext.grid.column.Column',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.plugin.CellEditing'
    ],

    localiserId: 'optionsGrid',
    height: 250,
    id: 'optionsLCGrid',
    margin: '20 0 0 0',
    autoScroll: true,
    title: 'Options',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    localiserId: 'valueCol',
                    dataIndex: 'valeur',
                    text: 'Valeur',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    localiserId: 'nameCol',
                    dataIndex: 'nom',
                    text: 'Nom',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            localiserId: 'addBtn',
                            iconCls: 'add',
                            text: 'Ajouter',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            localiserId: 'removeBtn',
                            iconCls: 'close',
                            text: 'Supprimer',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {

                })
            ]
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        button.up().up().getComponent(0).getStore().add({valeur : 'valeur', nom : 'nom'});
    },

    onButtonClick1: function(button, e, eOpts) {
        button.up().up().getComponent(0).getStore().remove(button.up().up().getComponent(0).getSelectionModel().getLastSelected());
    }

});