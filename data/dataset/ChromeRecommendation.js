
 Ext.define("DE.view.ChromeRecommendation", {
    extend: "Ext.window.Window",
    alias: "widget.dechromerecommendation",
    requires: ["Ext.window.Window"],
    modal: true,
    closable: true,
    resizable: false,
    plain: true,
    width: 375,
    height: 185,
    layout: {
        type: "border"
    },
    onEsc: function () {
        this.close();
    },
    initComponent: function () {
        this.addEvents("onmodalresult");
        this.items = [{
            xtype: "container",
            region: "center",
            layout: {
                type: "vbox",
                align: "center"
            },
            items: [{
                xtype: "box",
                padding: "15px 0 0 0",
                html: '<p style="width: 320px; text-align: center; font-size: 8pt; font-family: Arial; color: #636363; padding-top: 10px;">' + this.useChromeMessage + "</p>"
            }]
        },
        {
            xtype: "container",
            region: "south",
            height: 58,
            style: "border-top: 1px solid #E5E5E5",
            padding: "16px 0 0 0",
            layout: {
                type: "hbox",
                align: "center",
                pack: "center"
            },
            items: [{
                xtype: "button",
                cls: "asc-blue-button",
                width: 85,
                text: Ext.Msg.buttonText["ok"],
                margin: "0 5px 0 0",
                listeners: {
                    click: function (btn) {
                        this.fireEvent("onmodalresult", this, 0);
                        this.close();
                    },
                    scope: this
                }
            },
            {
                xtype: "button",
                cls: "asc-darkgray-button",
                text: this.dontShowButtonText,
                autoSize: true,
                listeners: {
                    click: function (btn) {
                        this.fireEvent("onmodalresult", this, 1);
                        this.close();
                    },
                    scope: this
                }
            }]
        }];
        this.callParent(arguments);
    },
    dontShowButtonText: "Don't show again",
    useChromeMessage: "We recommend that you use one of the latest versions of the Google Chrome web browser to speed up your work at documents."
});