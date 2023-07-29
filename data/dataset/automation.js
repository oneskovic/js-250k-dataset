/**
 * OpenHAB Admin Console HABmin
 *
 * @author Chris Jackson
 */

Ext.define('openHAB.automation.automation', {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    icon: 'images/compass.png',
    id: 'maintabAutomation',
    cls: 'empty',
    autoDestroy: true,

    initComponent: function () {
        this.title = language.mainTab_Automation;
        this.tooltip = language.mainTab_AutomationTip;

        var ruleList = Ext.create('openHAB.automation.ruleList');
        var ruleLibrary = Ext.create('openHAB.automation.ruleLibrary');
        var ruleModelList = Ext.create('openHAB.automation.ruleFileList');
        var notificationList = Ext.create('openHAB.automation.notificationList');

        var accordion = Ext.create('Ext.Panel', {
            split: true,
            border: false,
            region: 'west',
            width: 600,
            stateId: 'automationWindowSizer',
            stateful: true,
            layout: {
                type: 'accordion',
                hideCollapseTool: true
            },
            items: [ruleList, ruleLibrary, ruleModelList, notificationList]
        });

        var propertyContainer = Ext.create('Ext.panel.Panel', {
            region: 'center',
            id: 'automationPropertyContainer',
            header: false,
            border: false,
            layout: 'fit',
            setNewProperty: function (newProperties) {
                // Remove the current editor
                this.removeAll(true);

                // Display the property sheet
                this.add(newProperties);
            },
            removeProperty: function () {
                // Remove the current editor
                this.removeAll(true);
            }
        });

        this.items = [accordion, propertyContainer];

        this.callParent();
    }
})
;