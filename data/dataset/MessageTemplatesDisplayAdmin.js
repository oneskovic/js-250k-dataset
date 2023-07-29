Ext.define('Ssp.view.admin.forms.config.MessageTemplatesDisplayAdmin', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.messagetemplatesdisplayadmin',
    title: '',
    mixins: ['Deft.mixin.Injectable', 'Deft.mixin.Controllable'],
    controller: 'Ssp.controller.admin.config.MessageTemplatesDisplayAdminViewController',
    inject: {
        apiProperties: 'apiProperties',
        authenticatedPerson: 'authenticatedPerson',
        columnRendererUtils: 'columnRendererUtils'
    },
    height: '100%',
    width: '100%',
    
    initComponent: function(){
        var me = this;
      
        
        Ext.apply(me, {
            viewConfig: {},
            autoScroll: true,
            selType: 'rowmodel',
            enableDragDrop: false,
			cls: 'configgrid',
            columns: [{
                header: 'Name',
                dataIndex: 'name',
                flex: 1
            }, {
                header: 'Description',
                dataIndex: 'description',
                flex: 1
            }],
            
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                pageSize: me.apiProperties.getPagingSize()
            }, {
                xtype: 'toolbar',
                items: [{
                    text: 'Edit',
     		                   iconCls: 'icon-edit',
     		                   xtype: 'button',
     		                   action: 'edit',
     		                   itemId: 'editButton'
                }]
            }, {
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'label',
                    text: 'Click on an existing Message to Edit.'
                }]
            }]
        });
        
        return me.callParent(arguments);
    }
});
