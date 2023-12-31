Ext.define('Rubedo.view.pagesLocProps', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pagesLocProps',

    requires: [
        'Rubedo.view.pagesECommerceFieldset',
        'Ext.form.FieldSet',
        'Ext.form.field.TextArea'
    ],

    autoScroll: true,
    bodyPadding: 10,
    header: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    localiserId: 'nameField',
                    anchor: '100%',
                    fieldLabel: 'Nom *',
                    name: 'text',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    localiserId: 'urlField',
                    anchor: '100%',
                    fieldLabel: 'URL ',
                    name: 'pageURL'
                },
                {
                    xtype: 'fieldset',
                    localiserId: 'referencingFieldSEt',
                    title: 'Référencement',
                    items: [
                        {
                            xtype: 'textfield',
                            localiserId: 'titleField',
                            anchor: '100%',
                            fieldLabel: 'Titre *',
                            name: 'title',
                            allowBlank: false
                        },
                        {
                            xtype: 'textareafield',
                            localiserId: 'descriptionField',
                            anchor: '100%',
                            fieldLabel: 'Description ',
                            name: 'description',
                            maxLength: 250
                        }
                    ],
                    listeners: {
                        render: {
                            fn: me.onMainPageAttributeFormRender1,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'pagesECommerceFieldset'
                }
            ]
        });

        me.callParent(arguments);
    },

    onMainPageAttributeFormRender1: function(component, eOpts) {
        var tagPicker = Ext.create("Ext.ux.form.field.BoxSelect", {
            store:[],
            anchor:"100%",
            name:"keywords",
            fieldLabel:Rubedo.RubedoAutomatedElementsLoc.keywordsText,
            localiserId:"keywordsField",
            multiSelect:true,
            forceSelection:false,
            createNewOnEnter:true,
            hideTrigger:true,
            triggerOnClick:false,
            createNewOnBlur:true,
            pinList:false
        });
        component.add(tagPicker);
    }

});