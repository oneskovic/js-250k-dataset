Ext.define('Ssp.view.tools.profile.EvaluatedSuccessIndicatorGroups', {
    extend: 'Ext.Container',
    alias: 'widget.evaluatedsuccessindicatorgroups',
    mixins: ['Deft.mixin.Injectable', 'Deft.mixin.Controllable'],
    controller: 'Ssp.controller.tool.profile.EvaluatedSuccessIndicatorGroupsController',

    initComponent: function(){
        var me = this;
        Ext.apply(me, {
            margin: '20 0 0 0',
            items: [{
                xtype: 'fieldset',
                title: 'Student Indicators',
                flex: 1,
                items: [{
                    xtype: 'evaluatedsuccessindicatorgroup',
                    itemId: 'studentSuccessIndicatorGroup',
                    maxHeight: 340,
                    overflowY: 'auto',
                    flex: 1
                }]
            }, {
                xtype: 'tbspacer',
                width: 10
            }, {
                xtype: 'fieldset',
                title: 'Intervention Indicators',
                flex: 1,
                items: [{
                    xtype: 'evaluatedsuccessindicatorgroup',
                    itemId: 'interventionSuccessIndicatorGroup',
                    maxHeight: 340,
                    overflowY: 'auto',
                    flex: 1
                }]
            }, {
                xtype: 'tbspacer',
                width: 10
            }, {
                xtype: 'fieldset',
                title: 'Risk Indicators',
                flex: 1,
                items: [{
                    xtype: 'evaluatedsuccessindicatorgroup',
                    itemId: 'riskSuccessIndicatorGroup',
                    maxHeight: 340,
                    overflowY: 'auto',
                    flex: 1
                }]
            }]
        });
        return me.callParent(arguments);
    }

});
