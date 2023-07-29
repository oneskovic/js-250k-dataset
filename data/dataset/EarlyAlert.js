Ext.define('Ssp.view.tools.earlyalert.EarlyAlert', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.earlyalert',
    mixins: ['Deft.mixin.Injectable', 'Deft.mixin.Controllable'],
    controller: 'Ssp.controller.tool.earlyalert.EarlyAlertToolViewController',
    inject: {
        appEventsController: 'appEventsController',
        authenticatedPerson: 'authenticatedPerson',
        columnRendererUtils: 'columnRendererUtils',
        model: 'currentEarlyAlert',
        treeStore: 'earlyAlertsTreeStore'
    },
    width: '100%',
    height: '100%',
    initComponent: function(){
        var me = this;
        Ext.apply(me, {
            autoScroll: true,
            title: 'Early Alerts',
            cls: 'early-alert-tree-panel',
            collapsible: false,
            useArrows: true,
            rootVisible: false,
            store: me.treeStore,
            multiSelect: false,
            singleExpand: true,
            
            columns: [{
                text: 'Responses',
                flex: 0.5,
                dataIndex: 'noOfResponses',
                sortable: true
            }, {
                text: 'Created By',
                flex: 1,
                dataIndex: 'createdBy',
                renderer: me.columnRendererUtils.renderCreatedBy,
                sortable: true
            }, {
                text: 'Created Date',
                flex: 1,
                dataIndex: 'createdDate',
                renderer: Ext.util.Format.dateRenderer('Y-m-d g:i A'),
                sortable: true
            }, {
                text: 'Status',
                flex: 0.5,
                sortable: true,
                dataIndex: 'closedDate',
                renderer: me.columnRendererUtils.renderEarlyAlertStatus
            },{
                text: 'Last Response Date',
                flex: 1,
                dataIndex: 'lastResponseDate',
                renderer: Ext.util.Format.dateRenderer('Y-m-d g:i A'),
                sortable: true
            } , {
                text: 'Details',
                flex: 2,
                sortable: true,
                dataIndex: 'gridDisplayDetails'
            }],
            
            viewConfig: {
                markDirty: false
            }
        });
        
        return me.callParent(arguments);
    }
});
