
 Ext.define("Common.view.ComboFonts", {
    extend: "Ext.form.field.ComboBox",
    alias: "widget.commoncombofonts",
    queryMode: "local",
    matchFieldWidth: false,
    displayField: "name",
    showlastused: false,
    constructor: function (config) {
        var me = this;
        var iconWidth = 302,
        iconHeight = FONT_THUMBNAIL_HEIGHT;
        this.addEvents("createpicker");
        var thumbCanvas = document.createElement("canvas");
        thumbCanvas.height = iconHeight;
        thumbCanvas.width = iconWidth;
        var thumbContext = thumbCanvas.getContext("2d");
        var item_tpl = Ext.create("Ext.XTemplate", '<tpl for=".">', '<a class="font-item" style="display: block;">', '<img id="{[Ext.id()]}" src="{[this.getImageUri(values)]}" width="{[this.getImageWidth()]}" height="{[this.getImageHeight()]}" style="vertical-align: middle;margin: 0 0 0 -10px;">', "</a>", "</tpl>", {
            getImageUri: function (opts) {
                if (opts.cloneid) {
                    return me.picker.listEl.down("#" + opts.cloneid).dom.src;
                }
                thumbContext.clearRect(0, 0, iconWidth, iconHeight);
                thumbContext.drawImage(me.spriteThumbs, 0, -FONT_THUMBNAIL_HEIGHT * opts.imgidx);
                return thumbCanvas.toDataURL();
            },
            getImageWidth: function () {
                return iconWidth;
            },
            getImageHeight: function () {
                return iconHeight;
            }
        });
        Ext.apply(config, {
            listConfig: {
                id: "combo-fonts-list",
                emptyText: "no fonts found",
                mode: "local",
                width: 326,
                maxHeight: 468,
                height: 468,
                minHeight: 150,
                itemTpl: item_tpl,
                blockRefresh: true,
                listeners: {
                    viewready: function (cmp) {
                        me.spriteThumbs = undefined;
                    }
                }
            }
        });
        this.initConfig(config);
        this.callParent(arguments);
        return this;
    },
    initComponent: function () {
        this.addListener("beforequery", this._beforeQuery, this);
        this.callParent(arguments);
    },
    onRender: function (cmp) {
        this.callParent(arguments);
        this.el.set({
            "data-qtip": this.tooltip
        });
        this.validate();
    },
    createPicker: function () {
        this.callParent(arguments);
        if (this.showlastused) {
            this.fireEvent("createpicker", this, this.picker);
        }
        return this.picker;
    },
    fillFonts: function (arr, select) {
        this._loadSprite();
        this.getStore().loadData(arr);
        if (select && this.getStore().getCount()) {
            var rec = this.getStore().findRecord("name", "Arial");
            if (rec) {
                this.select(rec);
            } else {
                this.select(this.getStore().getAt(0));
            }
        }
    },
    _loadSprite: function () {
        var me = this;
        me.spriteThumbs = new Image();
        me.spriteThumbs.src = window.g_standart_fonts_thumbnail;
    },
    _beforeQuery: function (qe) {
        qe.forceAll = true;
        qe.cancel = true;
        if (qe.combo) {
            qe.combo.expand();
            var picker = qe.combo.getPicker();
            var index = qe.combo.store.find("name", qe.query);
            if (! (index < 0)) {
                var node = picker.getNode(qe.combo.store.getAt(index));
                if (node) {
                    picker.highlightItem(node);
                    var pos_h = picker.listEl.getHeight() / 2 - 30;
                    var list_t = picker.listEl.getTop();
                    var offset_y = Ext.get(node).getY() - list_t - pos_h;
                    if (Math.abs(offset_y) > pos_h) {
                        var jsp = $("#" + picker.listEl.id).data("jsp");
                        if (jsp) {
                            jsp.scrollByY(offset_y, true);
                        }
                    }
                }
            } else {
                $("#" + picker.id + " ." + picker.overItemCls).removeClass(picker.overItemCls);
            }
        }
    }
});