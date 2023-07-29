
 Ext.define("SSE.view.CreateFile", {
    extend: "Ext.panel.Panel",
    alias: "widget.ssecreatenew",
    cls: "sse-file-createnew",
    layout: {
        type: "vbox",
        align: "stretch"
    },
    requires: ["Ext.container.Container", "Ext.data.Model", "Ext.data.Store", "Ext.view.View", "Ext.XTemplate", "Common.plugin.DataViewScrollPane"],
    constructor: function (config) {
        this.initConfig(config);
        this.callParent(arguments);
        return this;
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;
        me.add({
            xtype: "container",
            html: "<h3>" + me.fromBlankText + "</h3>" + "<hr noshade>" + '<div class="blank-document">' + '<div id="id-create-blank-document" class="btn-blank-document"></div>' + '<div class="blank-document-info">' + "<h3>" + me.newDocumentText + "</h3>" + me.newDescriptionText + "</div>" + "</div>" + '<div style="clear: both;"></div>' + "<h3>" + me.fromTemplateText + "</h3>" + "<hr noshade>"
        },
        {
            xtype: "container",
            flex: 1,
            layout: "fit",
            cls: "container-template-list",
            items: [{
                xtype: "dataview",
                store: "FileTemplates",
                tpl: Ext.create("Ext.XTemplate", '<tpl for=".">', '<div class="thumb-wrap">', '<tpl if="this.isEmptyIcon(icon)">', '<div class="thumb"></div>', "</tpl>", '<tpl if="this.isEmptyIcon(icon) == false">', '<div class="thumb" style="background-image: url(' + "'{icon}'" + ');"></div>', "</tpl>", '<div class="title">{name:htmlEncode}</div>', "</div>", "</tpl>", {
                    isEmptyIcon: function (icon) {
                        return icon == "";
                    }
                }),
                singleSelect: true,
                trackOver: true,
                autoScroll: true,
                overItemCls: "x-item-over",
                itemSelector: "div.thumb-wrap",
                cls: "x-view-context",
                plugins: [{
                    ptype: "dataviewscrollpane",
                    pluginId: "scrollpane",
                    areaSelector: ".x-view-context",
                    settings: {
                        enableKeyboardNavigation: true
                    }
                }]
            }]
        });
    },
    fromBlankText: "From Blank",
    newDocumentText: "New Text Document",
    newDescriptionText: "Create a new blank text document which you will be able to style and format after it is created during the editing. Or choose one of the templates to start a document of a certain type or purpose where some styles have already been pre-applied.",
    fromTemplateText: "From Template"
});