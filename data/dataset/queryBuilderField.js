Ext.define('Rubedo.view.queryBuilderField', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.queryBuilderField',

    anchor: '90%',
    lastQuery: '',
    style: 'float: left;',
    fieldLabel: 'Label',
    editable: false,
    displayField: 'name',
    forceSelection: true,
    queryMode: 'local',
    queryParam: 'specificItem',
    store: 'QueriesStore',
    valueField: 'id',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                added: {
                    fn: me.onComboboxAdded,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onComboboxAdded: function(component, container, pos, eOpts) {
        component.getStore().load();
        var companion = Ext.widget("queryFieldComponent");

        companion.getComponent("addBtn").on("click", function(){
            var myWin = Ext.widget("queryTypeChooseWindow");
            myWin.isProductQuery=component.isProductQuery;
            myWin.mainFieldId=component.getId();
            myWin.show();
        });
        companion.getComponent("removeBtn").on("click", function(){
            component.setValue(null);
        });
        companion.getComponent("editBtn").on("click", function(){
            var theRec=component.getStore().findRecord("id", component.getValue());
            var initialQuery = Ext.clone(theRec.get("query"));
            var returnedFields = Ext.clone(theRec.get("returnedFields"));
            var recId = Ext.clone(theRec.get("id"));
            if (theRec.get("type")=="advanced") {
                Ext.widget("assistantRequetage",{isProductQuery:component.isProductQuery,editorMode:true, recId:recId, initialQuery:initialQuery, directToCombo:true, mainFieldId:component.getId()}).show();
            } else if (theRec.get("type")=="simple"){
                Ext.widget("assistantRequetage",{isProductQuery:component.isProductQuery,editorMode:true, simpleMode:true, recId:recId, initialQuery:initialQuery, directToCombo:true, mainFieldId:component.getId()}).show();

            } else if (theRec.get("type")=="manual"){

                Ext.widget("manualQueryInterface", {isProductQuery:component.isProductQuery,returnedFields:returnedFields, editorMode:true, recId:recId, initialQuery:initialQuery}).show();
            }

        });
        companion.getComponent("previewBtn").on("click", function(){
            Ext.widget("QuerySimWindow",{queryId:component.getValue()}).show();
        });
        component.on("change", function(a,newValue,oldValue){


            if (!Ext.isEmpty(oldValue)){
                var theRec=component.getStore().findRecord("id", oldValue);

                if ((!Ext.isEmpty(theRec))&&(theRec.get("type")!="advanced")) {
                    component.getStore().remove(theRec);
                }
            }
            if (Ext.isEmpty(newValue)){
                companion.getComponent("editBtn").hide();
                companion.getComponent("removeBtn").hide();
                companion.getComponent("previewBtn").hide();
                component.getStore().filterBy(function(rec){
                    if ((rec.get("type")=="advanced")) {
                        return(true);
                    }
                    else {
                        return(false);
                    }
                });
            } else {
                companion.getComponent("editBtn").show();
                companion.getComponent("removeBtn").show();
                companion.getComponent("previewBtn").show();
                component.getStore().filterBy(function(rec){
                    if ((rec.get("type")=="advanced")||(rec.get("id")==newValue)) {
                        return(true);
                    }
                    else {
                        return(false);
                    }
                });
            }

        });
        //var task2 = new Ext.util.DelayedTask(function(){
        //  component.fireEvent("change",component, component.getValue());
        //});
        component.addListener("focus",function(){
            component.fireEvent("change",component, component.getValue());
        },this,{single:true});
        component.up().add(companion);
        //task2.delay(1600);
    }

});