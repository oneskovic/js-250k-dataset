Ext.define('Rubedo.view.DCEField', {
    extend: 'Ext.form.field.Hidden',
    alias: 'widget.DCEField',

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
        var myComponent = Ext.widget("DCEFieldComponent");
        myComponent.setFieldLabel(component.fieldLabel+" ");
        component.on("change", function(a,newValue){
            if (Ext.isEmpty(newValue)){
                myComponent.getComponent("addBtn").show();
                myComponent.getComponent("chooseBtn").show();
                myComponent.getComponent("editBtn").hide();
                myComponent.getComponent("removeBtn").hide();
                myComponent.getComponent("contentTitleBtn").hide();
            } else {
                myComponent.getComponent("addBtn").hide();
                myComponent.getComponent("chooseBtn").show();
                myComponent.getComponent("editBtn").show();
                myComponent.getComponent("removeBtn").show();
                Ext.Ajax.request({
                    url: 'contents/find-one',
                    method:'GET',
                    params: {
                        id: newValue
                    },
                    success: function(response){
                        var answer = Ext.JSON.decode(response.responseText);
                        myComponent.getComponent("contentTitleBtn").setText(answer.data.text);
                        myComponent.getComponent("contentTitleBtn").setTooltip(answer.data.text);
                        myComponent.getComponent("contentTitleBtn").show();
                    },
                    failure:function(){
                        console.log("failed to get content title");
                    }
                });



            }
            if ((component.chooseOnly)||(Ext.isEmpty(component.allowedCT))){
                myComponent.getComponent("addBtn").hide();
            }
            if (component.addOnly){
                myComponent.getComponent("chooseBtn").hide();
            }
            if (component.noEdit){
                myComponent.getComponent("editBtn").hide();
            }

        });

        myComponent.on("afterrender",function(){
            myComponent.getEl().on("click",function(){

                component.getEl().dom.click();
            });
        });
        myComponent.getComponent("removeBtn").on("click", function(){
            component.setValue(null);
        });
        myComponent.getComponent("addBtn").on("click", function(){

            Rubedo.controller.ContributionContenusController.prototype.specialContentCreate(component.allowedCT, component.getId());

        });
        myComponent.getComponent("chooseBtn").on("click", function(){
            var delay = 10;
            var prev = Ext.getCmp("searchResultsWindow");
            if (!Ext.isEmpty(prev)){
                prev.close();
                delay=400;
            }
            var task = new Ext.util.DelayedTask(function(){
                var companion = Ext.widget("searchResultsWindow");
                companion.targetId=component.getId();
                companion.DCEFMode=true;
                companion.allowedCT=component.allowedCT;
                companion.show();
            });
            task.delay(delay);
        });
        myComponent.getComponent("editBtn").on("click", function(){
            Rubedo.controller.ContributionContenusController.prototype.unitaryContentEdit(component.getValue(), !Ext.isEmpty(component.allowedCT), component.getId());
        });
        component.up().add(myComponent);
        component.fireEvent("change",component, component.getValue());
    }

});