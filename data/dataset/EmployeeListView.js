/**
 * The list of employees view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("CafeTownsend.view.extjs.EmployeeListView", {
    extend: "Ext.Panel",
    alias: "widget.employeeListView",
    controller: "CafeTownsend.mediator.extjs.EmployeeListMediator",
    header: false,

    requires: [
        "Ext.data.*",
        "Ext.util.*",
        "Ext.view.View",
        "CafeTownsend.view.extjs.component.LiveSearchGridPanel",
        "nineam.locale.LocaleManager"
    ],

    layout: {
        type: "fit"
    },

    items: [
        {
            xtype: "toolbar",
            width: 400,

            items: [
                {
                    itemId: "logoutButton",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeList.logOff"
                        }
                    ]
                },
                {
                    xtype: "tbfill"
                },
                {
                    xtype: "label",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeList.title"
                        }
                    ]

                },
                {
                    xtype: "tbfill"
                },
                {
                    itemId: "newEmployeeButton",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeList.new"
                        }
                    ]
                }
            ]
        },
        {
            xtype: "livesearchgridpanel",
            store: null,
            itemId: "list",
            forceFit: true,
            autoScroll: true,
            height: 300,
            viewConfig: {
                stripeRows: true
            },
            columns: [
                {
                    dataIndex:  "firstName",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeList.firstName"
                        }
                    ]
                },
                {
                    dataIndex:  "lastName",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeList.lastName"
                        }
                    ]
                }
            ],
            plugins: [
                {
                    ptype: "localization",
                    method: "setTitle",
                    key: "employeeList.search"
                }
            ]
        }
    ]
});
