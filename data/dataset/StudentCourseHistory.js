Ext.define('Ssp.view.tools.map.StudentCourseHistory', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.studentcoursehistory',
    mixins: ['Deft.mixin.Injectable', 'Deft.mixin.Controllable'],
    controller: 'Ssp.controller.tool.map.StudentCourseHistoryViewController',
    inject: {
        store: 'studentCourseHistoryStore'
    },
	width: '100%',
	height: '100%',
	minHeight: 615,
    autoScroll: true,
    initComponent: function(){
        var me = this;
        
        Ext.applyIf(me, {
        	queryMode:'local',
            store: me.store,
            columns: [{
                xtype: 'gridcolumn',
                dataIndex: 'termCode',
                text: 'Term',
                flex: 0.10
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'formattedCourse',
                text: 'Course',
                flex: 0.15
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'title',
                text: 'Course Title',
                flex: 0.30
            }, {
                xtype: 'numbercolumn',
                dataIndex: 'creditEarned',
                text: 'Cr Hrs',
                format: '0.00',
                flex: 0.10
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'grade',
                text: 'Grade',
                sortable: 'false',
                flex: 0.20
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'creditType',
                text: 'Credit Type',
                flex: 0.20
            }],
            viewConfig: {
                markDirty: false
            }
        });
        
        me.callParent(arguments);
    }
});
