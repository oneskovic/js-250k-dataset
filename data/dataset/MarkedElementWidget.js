Ext.define('LIME.view.widgets.MarkedElementWidget', {
    extend: 'Ext.form.Panel',
    
    alias: 'widget.markedElementWidget',
    
    collapsible : true,
    frame : true,
    fieldDefaults : {
        msgTarget : 'side',
        labelWidth : 30
    },
    defaults : {
        anchor : '100%'
    }
    
});
