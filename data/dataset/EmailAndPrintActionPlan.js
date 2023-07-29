Ext.define('Ssp.view.tools.actionplan.EmailAndPrintActionPlan', {
	extend: 'Ext.container.Container',
	alias : 'widget.emailandprintactionplan',
    mixins: [ 'Deft.mixin.Injectable',
              'Deft.mixin.Controllable'],
    controller: 'Ssp.controller.tool.actionplan.EmailAndPrintActionPlanViewController',
	inject: {
        authenticatedPerson: 'authenticatedPerson'
    },
    height: 35,
    width: 200,
	layout: {
        type: 'hbox'
    },
	initComponent: function() {	
		var me = this;

        Ext.applyIf(me, {
            items: [
			{
					xtype: 'tbspacer',
					width: '30'
			},
			{
                    tooltip: 'Email Action Plan',
                    text: '',
                    width: 30,
                    height: 30,
                    hidden: !me.authenticatedPerson.hasAccess('EMAIL_ACTION_PLAN_BUTTON'),
                    cls: 'emailIcon',
                    xtype: 'button',
                    itemId: 'emailTasksButton'
                }, 
				{
					xtype: 'tbspacer',
					width: '100'
				},{
                    tooltip: 'Print Action Plan',
                    text: '',
                    width: 30,
                    height: 30,
                    hidden: !me.authenticatedPerson.hasAccess('PRINT_ACTION_PLAN_BUTTON'),
                    cls: 'printIcon',
                    xtype: 'button',
                    itemId: 'printTasksButton'
                }
                
            ]
        });

        me.callParent(arguments);
	}
		
});