
 Ext.define("Common.component.SynchronizeTip", {
    extend: "Ext.container.Container",
    alias: "widget.commonsynchronizetip",
    cls: "asc-synchronizetip",
    requires: ["Ext.button.Button", "Ext.form.Label"],
    layout: {
        type: "vbox",
        align: "stretch"
    },
    width: 240,
    height: 95,
    hideMode: "visibility",
    constructor: function (config) {
        this.initConfig(config);
        this.callParent(arguments);
        return this;
    },
    initComponent: function () {
        var me = this;
        me.addEvents("dontshowclick");
        me.addEvents("closeclick");
        var btnClose = Ext.widget("button", {
            cls: "btn-close-tip",
            iconCls: "icon-close-tip",
            listeners: {
                click: function () {
                    me.fireEvent("closeclick", me);
                }
            }
        });
        me.items = [{
            xtype: "container",
            html: '<div class="tip-arrow"></div>'
        },
        {
            xtype: "container",
            flex: 1,
            style: "padding-left: 15px;",
            layout: {
                type: "hbox",
                align: "stretch"
            },
            items: [{
                xtype: "container",
                flex: 1,
                style: "margin-top: 15px;line-height: 1.2;",
                html: "<div>" + me.textSynchronize + "</div>"
            },
            btnClose]
        },
        {
            xtype: "container",
            cls: "show-link",
            items: [{
                xtype: "label",
                text: me.textDontShow,
                listeners: {
                    afterrender: function (cmp) {
                        cmp.getEl().on("click", function (event, node) {
                            me.fireEvent("dontshowclick", me);
                        });
                    },
                    scope: this
                }
            }]
        }];
        me.callParent(arguments);
    },
    textDontShow: "Don't show this message again",
    textSynchronize: "The document has changed. <br/>Refresh the document to see the updates."
});