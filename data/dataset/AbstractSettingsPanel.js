
 Ext.define("Common.view.AbstractSettingsPanel", {
    extend: "Ext.panel.Panel",
    alias: "widget.commonabstractsettingspanel",
    bodyPadding: "0 0 0 15px",
    preventHeader: true,
    constructor: function (config) {
        this.controls = [];
        this.callParent(arguments);
        this.initConfig(config);
        return this;
    },
    initComponent: function () {
        var me = this;
        this.initialHeight = this.height;
        me.callParent(arguments);
    },
    SuspendEvents: function () {
        for (var i = 0; i < this.controls.length; i++) {
            this.controls[i].suspendEvents(false);
        }
    },
    ResumeEvents: function () {
        for (var i = 0; i < this.controls.length; i++) {
            this.controls[i].resumeEvents();
        }
    }
});