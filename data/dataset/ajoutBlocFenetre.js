Ext.define('Rubedo.view.ajoutBlocFenetre', {
    extend: 'Ext.window.Window',
    alias: 'widget.ajoutBlocFenetre',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Column',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    localiserId: 'addBlockWindow',
    draggable: false,
    height: 346,
    id: 'ajoutBlocFenetre',
    width: 533,
    resizable: false,
    constrainHeader: true,
    title: 'Ajouter un bloc',
    modal: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'BlocsSelectGrid',
                    title: '',
                    store: 'BlocsDataStore',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            localiserId: 'addBlockTypeColumn',
                            dataIndex: 'type',
                            text: 'Type',
                            flex: 1
                        }
                    ],
                    features: [
                        {
                            ftype: 'grouping',
                            groupHeaderTpl: [
                                '{name}'
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1.3,
                    id: 'PaneauBlocsDetail',
                    tpl: [
                        '{description}'
                    ],
                    autoScroll: true,
                    bodyPadding: 10,
                    bodyStyle: '{text-align: justify;}',
                    title: ''
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'addBtn',
                            id: 'boutonAjouterBloc',
                            iconCls: 'add',
                            text: 'Ajouter'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'addBtn',
                            hidden: true,
                            id: 'addPageBlocBtn',
                            iconCls: 'add',
                            text: 'Ajouter'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});