Ext.define('Ssp.view.tools.profile.SpecialServiceGroups', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.profilespecialservicegroups',
    mixins: ['Deft.mixin.Injectable'],
    inject: {
        store: 'profileSpecialServiceGroupsStore'
    },
    width: '100%',
    height: '100%',
    initComponent: function(){
        var me = this;
        Ext.apply(me, {
            title: 'Service Groups',
            hideHeaders: true,
            queryMode:'local',
            store: me.store,
            autoScroll: true,
            tools: [{
                xtype: 'button',
                itemId: 'serviceGroupEdit',
                width: 20,
                height: 20,
                cls: 'editPencilIcon',
                text:'',
                tooltip: 'Edit'
            }],
            columns: [{
                header: 'Group',
                dataIndex: 'name',
                flex: 1
            }]
        });
        
        return me.callParent(arguments);
    }
});
