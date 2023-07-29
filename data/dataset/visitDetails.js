Ext.define('chw.view.visitDetails', {
    extend: 'Ext.Panel',
    requires: 'chw.view.userToolbar',
    alias: 'widget.visitDetails',
    id: 'visitDetailsPanel',
    config: {
        height: '100%',
        ui: 'neutral',
        scrollable: true,
        items: [{
            xtype: 'titlebar',
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.visitDetails'),
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.back'),
                action:'goback'
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }, {
            xtype: 'label',
            itemId: 'illnessImageLabel',
            html: '<center><img src="resources/diarrhea.png" width="100px"/></center>',
            height: '20%',
            width: '100%',
            padding: '10px'
        }, {
            xtype: 'container',
            padding: '10px 20px 0px 20px',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%',
                    disabled: true
                },
                items: [{
                    xtype: 'textfield',
                    disabled: true,
                    label: 'Visit Type',
                    placeHolder: 'Diarrhea check up',
                    labelAlign: 'top'
                }]
            }]
        }, {
            xtype: 'container',
            itemId: 'visitChecklist',
            padding: '10px',
            height: '80%',
            width: '100%',
            items: []
        }]
    }
})