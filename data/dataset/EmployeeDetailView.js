/**
 * The employee details view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("CafeTownsend.view.touch.EmployeeDetailView", {
    extend: "Ext.form.Panel",
    alias: "widget.employeeDetailView",
    controller: "CafeTownsend.mediator.touch.EmployeeDetailMediator",

    requires: [
        "Ext.form.FieldSet",
        "Ext.Toolbar"
    ],

    config: {

        items: [
            {
                xtype: "titlebar",
                docked: "top",
                plugins: [
                    {
                        type: "localization",
                        method: "setTitle",
                        key: "employeeDetail.title"
                    }
                ],
                items: [
                    {
                        xtype: "button",
                        itemId: "backButton",
                        align: "left",
                        plugins: [
                            {
                                type: "localization",
                                method: "setText",
                                key: "employeeDetail.back"
                            }
                        ]
                    },
                    {
                        xtype: "button",
                        itemId: "saveEmployeeButton",
                        align: "right",
                        ui: "action",
                        plugins: [
                            {
                                type: "localization",
                                method: "setText",
                                key: "employeeDetail.save"
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "fieldset",
                itemId: "fieldset",
                items: [
                    {
                        xtype: "textfield",
                        itemId: "firstNameTextField",
                        name: "firstName",
                        required: true,
                        plugins: [
                            {
                                type: "localization",
                                method: "setPlaceHolder",
                                key: "employeeDetail.firstName"
                            }
                        ]
                    },
                    {
                        xtype: "textfield",
                        itemId: "lastNameTextField",
                        name: "lastName",
                        required: true,
                        plugins: [
                            {
                                type: "localization",
                                method: "setPlaceHolder",
                                key: "employeeDetail.lastName"
                            }
                        ]
                    },
                    {
                        xtype: "textfield",
                        itemId: "phoneNumberTextField",
                        name: "phoneNumber",
                        required: true,
                        plugins: [
                            {
                                type: "localization",
                                method: "setPlaceHolder",
                                key: "employeeDetail.phoneNumber"
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "button",
                itemId: "deleteButton",
                align: "center",
                ui: "action",
                plugins: [
                    {
                        type: "localization",
                        method: "setText",
                        key: "employeeDetail.delete"
                    }
                ]
            }
        ]
    }
});