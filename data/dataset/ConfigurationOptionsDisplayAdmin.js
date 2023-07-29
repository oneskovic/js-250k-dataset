Ext.define('Ssp.view.admin.forms.config.ConfigurationOptionsDisplayAdmin', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.configurationoptionsdisplayadmin',
    title: 'Configuration Options Admin',
    mixins: ['Deft.mixin.Injectable', 'Deft.mixin.Controllable'],
    controller: 'Ssp.controller.admin.config.ConfigurationOptionsDisplayAdminViewController',
    inject: {
        apiProperties: 'apiProperties',
        authenticatedPerson: 'authenticatedPerson',
        columnRendererUtils: 'columnRendererUtils'
    },
    height: '100%',
    width: '100%',
    
    initComponent: function(){
        var me = this;
        
        var cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });
        
        Ext.apply(me, {
            viewConfig: {},
            autoScroll: true,
            plugins: cellEditor,
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
            }, {
                header: 'Value',
                dataIndex: 'value',
                flex: 1,
                field: {
                    xtype: 'textareafield',
					grow      : true
                }
            }],
            
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                pageSize: me.apiProperties.getPagingSize()
            }, {
                xtype: 'toolbar',
                items: [{
                    text: 'Save',
                    iconCls: 'icon-add',
                    xtype: 'button',
                    hidden: !me.authenticatedPerson.hasAccess('ABSTRACT_REFERENCE_ADMIN_ADD_BUTTON'),
                    itemId: 'saveButton'
                }, '-', {
                    text: 'Cancel',
                    iconCls: 'icon-edit',
                    xtype: 'button',
                    itemId: 'cancelButton'
                }]
            }, {
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'label',
                    text: 'Click on the value to update.'
                }]
            }]
        });
        
        return me.callParent(arguments);
    }
});
