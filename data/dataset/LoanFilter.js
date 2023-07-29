Ext.define('Kiva.view.LoanFilter', {
    extend: 'Ext.Container',
    xtype: 'loanfilter',
    requires: [
        'Ext.field.Select',
        'Ext.field.Search',
        'Ext.Toolbar'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                ui   : 'green',
                docked: 'top',
                items: [
                    { xtype: 'spacer', width: 50 },
                    { xtype: 'spacer' },
                    {
                        xtype: 'title',
                        title: 'Kiva'
                    },
                    { xtype: 'spacer' },
                    {
                        xtype: 'button',
                        iconMask: true,
                        iconCls: 'refresh'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'gray',
                items: (Ext.os.deviceType === 'Phone') ? [
                    { xtype: 'searchfield', flex: 1 }
                ] : [
                    {
                        xtype: 'selectfield',
                        name: 'gender',
                        options: [
                            {text: 'Both', value: 'both'},
                            {text: 'Male', value: 'male'},
                            {text: 'Female', value: 'female'}
                        ]
                    },
                    {
                        xtype: 'selectfield',
                        name: 'sector',
                        prependText: 'Sector:',
                        options: [
                            {text: 'All',            value: ''},
                            {text: 'Agriculture',    value: 'agriculture'},
                            {text: 'Transportation', value: 'transportation'},
                            {text: 'Services',       value: 'services'},
                            {text: 'Clothing',       value: 'clothing'},
                            {text: 'Health',         value: 'health'},
                            {text: 'Retail',         value: 'retail'},
                            {text: 'Manufacturing',  value: 'manufacturing'},
                            {text: 'Arts',           value: 'arts'},
                            {text: 'Housing',        value: 'housing'},
                            {text: 'Food',           value: 'food'},
                            {text: 'Wholesale',      value: 'wholesale'},
                            {text: 'Construction',   value: 'construction'},
                            {text: 'Education',      value: 'education'},
                            {text: 'Personal Use',   value: 'personal'},
                            {text: 'Entertainment',  value: 'entertainment'},
                            {text: 'Green',          value: 'green'}
                        ]
                    },
                    // { xtype: 'spacer' },
                    {
                        xtype: 'selectfield',
                        name: 'sort_by',
                        prependText: 'Sort by:',
                        options: [
                            {text: 'Newest',           value: 'newest'},
                            {text: 'Oldest',           value: 'oldest'},
                            {text: 'Expiring',         value: 'expiration'},
                            {text: 'Amount Remaining', value: 'amount_remaining'},
                            {text: 'Popularity',       value: 'popularity'},
                            {text: 'Loan Amount',      value: 'loan_amount'}
                        ]
                    },

                    {xtype: 'spacer'},

                    { xtype: 'searchfield' }
                ]
            }
        ],

        layout: {
            type: 'vbox',
            align: 'stretch'
        }
    },

    /**
     * This is called whenever any of the fields in the form are changed. It simply collects all of the
     * values of the fields and fires the custom 'filter' event.
     */
    onFieldChange : function(comp, value) {
        this.fireAction('filter', this.getValues(), this);
    }
});
