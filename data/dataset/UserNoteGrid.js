Ext.define('JavisERP.view.UserNoteGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usernotegrid',

    border: 0,
    preventHeader: true,
    title: 'User Notes',
    forceFit: true,
    store: 'UserNoteStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {

            },
            columns: [
                {
                    xtype: 'actioncolumn',
                    items: [
                        {

                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'id',
                    text: 'Id'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'date',
                    text: 'Date'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'author',
                    text: 'Author'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'title',
                    text: 'Title'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'memo',
                    text: 'Memo'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'ui-silk ui-silk-note-add',
                            text: 'New Note'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});