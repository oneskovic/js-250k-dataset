Ext.define('chw.view.addIllness', {
    extend: 'Ext.Panel',
    alias: 'widget.addIllness',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        scrollable: true,
        items: [{
            xtype: 'titlebar',
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.newIllness'),
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
            xtype: 'container',
            padding: '10px',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%'
                },
                items: [{
                    xtype: 'textfield',
                    label: 'Patient Id',
                    itemId: 'patientIdField',
                    disabled: true
                }, {
                    xtype: 'selectfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.type'),
                    required: true,
                    itemId: 'illnessNameField',
                    store: 'illnesses',
                    displayField: 'illnessName'
                }, {
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    itemId: 'illnessStartDate',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.startDate'),
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
                }, {
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    itemId: 'illnessEndDate',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.endDate'),
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
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
            }, {
                xclass: 'chw.view.okCancel'
            }]
        }]
    }
})