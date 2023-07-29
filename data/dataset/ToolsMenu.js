kimios.menu.ToolsMenu = Ext.extend(Ext.Button, {
    constructor: function (config) {
        this.id = 'kimios-tools';
        this.text = kimios.lang('Tools');
        this.iconCls = 'configure';
        this.simpleUser = true;
        this.menu = new Ext.menu.Menu({
            showSeparator: false,
            enableScrolling: true,
            shadow: false
        });

        kimios.menu.ToolsMenu.superclass.constructor.call(this, config);
        this.build();
    },

    build: function () {
        var rights = kimios.explorer.getViewport().rights;
        var simpleUser = true;

        this.adminItem = new Ext.menu.Item({
            text: kimios.lang('Administration'),
            iconCls: 'owner',
            handler: function () {
                Admin.getWindow().show();
            }
        });

        this.studioItem = new Ext.menu.Item({
            text: kimios.lang('Studio'),
            iconCls: 'studio',
            handler: function () {
                Studio.getWindow().show();
            }
        });

        this.rulesItem = new Ext.menu.Item({
            text: kimios.lang('Rules'),
            iconCls: 'configure',
            handler: function () {
                //TODO Rules planned
            }
        });

        this.reportingItem = new Ext.menu.Item({
            text: kimios.lang('Reporting'),
            iconCls: 'reporting',
            handler: function () {
                Reporting.getWindow().show();
            }
        });

        if (rights.isAdmin == true) {
            this.menu.add(this.adminItem);
            simpleUser = false;
        }
        if (rights.isStudioUser == true) {
            this.menu.add(this.studioItem);
            simpleUser = false;
        }
        if (rights.isRulesUser == true) {
            this.menu.add(this.rulesItem);
            simpleUser = false;
        }
        if (rights.isReportingUser == true) {
            this.menu.add(this.reportingItem);
            simpleUser = false;
        }
        this.simpleUser = simpleUser;
    },

    refresh: function () {
        kimios.explorer.getViewport().rightsStore.reload({
            scope: this,
            callback: function (records, options, success) {
                kimios.explorer.getViewport().rights = new kimios.security.Rights({
                    isWorkspaceCreator: records[0].data.canCreateWorkspace,
                    isAdmin: records[0].data.isAdmin,
                    isStudioUser: records[0].data.isStudioUser,
                    isRulesUser: records[0].data.isRulesUser,
                    isReportingUser: records[0].data.isReportingUser
                });
                this.menu.removeAll();
                this.build();
            }
        });
    },

    refreshLanguage: function () {
        this.setText(kimios.lang('Tools'));
        this.adminItem.setText(kimios.lang('Administration'));
        this.studioItem.setText(kimios.lang('Studio'));
        this.rulesItem.setText(kimios.lang('Rules'));
        this.reportingItem.setText(kimios.lang('Reporting'));
    }
});
