Ext.define('Rubedo.view.ACEField', {
    extend: 'Ext.form.field.Hidden',
    alias: 'widget.ACEField',

    queryMode: true,
    geoQueryMode: false,
    fieldLabel: 'Label',
    labelSeparator: ' ',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                render: {
                    fn: me.onHiddenfieldRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onHiddenfieldRender: function(component, eOpts) {
        Ext.require("resources/ace/src/ace");
        var myComponent = Ext.widget("ACEFieldComponent");
        myComponent.setFieldLabel(component.fieldLabel+" ");
        component.on("change", function(a,newValue){
            if (Ext.isEmpty(newValue)){
                myComponent.getComponent("addBtn").show();
                myComponent.getComponent("editBtn").hide();
                myComponent.getComponent("removeBtn").hide();
            } else {
                myComponent.getComponent("addBtn").hide();
                myComponent.getComponent("editBtn").show();
                myComponent.getComponent("removeBtn").show();
            }
        });
        myComponent.getComponent("removeBtn").on("click", function(){
            component.setValue(null);
        });
        myComponent.getComponent("addBtn").on("click", function(){
            var myEditor = Ext.widget("aceEditorWindow");
            myEditor.targetedId=component.getId();
            myEditor.twigMode=component.twigMode;
            if (component.defaultTemplateUrl){
                Ext.Ajax.request({
                    url: '/components/webtales/rubedo-frontoffice/templates/'+component.defaultTemplateUrl,
                    params: {
                    },
                    success: function(response){
                        myEditor.initialValue=response.responseText;
                        myEditor.show();
                    },
                    failure:function(response){
                        myEditor.initialValue=component.getValue();
                        myEditor.show();
                    }
                });
            } else {
                myEditor.initialValue=component.getValue();
                myEditor.show();
            }

        });

        myComponent.getComponent("editBtn").on("click", function(){
            var myEditor = Ext.widget("aceEditorWindow");

            myEditor.targetedId=component.getId();
            myEditor.initialValue=component.getValue();
            myEditor.twigMode=component.twigMode;
            myEditor.show();


        });
        component.up().add(myComponent);
        component.fireEvent("change",component, component.getValue());

    }

});