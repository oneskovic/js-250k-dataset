Ext.define('chw.view.illnessDetails', {
    extend: 'Ext.Panel',
    requires: 'chw.view.userToolbar',
    alias: 'widget.illnessDetails',
    id: 'illnessDetails',
    config: {
        hidden: false,
        height: '100%',
        ui: 'neutral',
        scrollable: true,
        items: [{
            xtype: 'titlebar',
            itemId: 'illnessDetailsTitleLabel',
            title: 'Illness Details',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.back'),
                action: 'goback'
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }, {
            xtype: 'label',
            itemId: 'illnessImageLabel',
            html: '<center><img src="resources/circle.png"/></center>',
            height: '20%',
            width: '100%',
            padding: '10px'
        }, {
            xtype: 'container',
            padding: '10px',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%',
                    disabled: true
                },
                items: [{
                    xtype: 'textfield',
                    label: 'Patient Id',
                    itemId: 'patientIdField'
                }, {
                    xtype: 'textfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.type'),
                    itemId: 'illnessNameField'
                }, {
                    xtype: 'textfield',
                    itemId: 'illnessStartDate',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.startDate')
                }, {
                    xtype: 'textfield',
                    itemId: 'illnessEndDate',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.endDate')
                }, {
                    xtype: 'textareafield',
                    itemId: 'illnessTreatmentField',
                    label: 'Treatment',
                    labelAlign: 'top'
                }, {
                    xtype: 'textareafield',
                    itemId: 'illnessNotesField',
                    label: 'Notes',
                    labelAlign: 'top'
                }]
            }]
        }]
    }
})