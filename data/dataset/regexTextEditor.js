if (!ORYX.Plugins) 
    ORYX.Plugins = new Object();


ORYX.Plugins.RegexTextEditor = Clazz.extend({
    
    construct: function(facade){
        this.facade = facade;
        ORYX.FieldEditors["regex"] = new ORYX.Plugins.RegexTextEditor.EditorFactory();
    }
}); 


ORYX.Plugins.RegexTextEditor.EditorFactory = Clazz.extend({
    construct: function(){
        
    },          
    /**
     * This function gets executed by propertyWindow in its own context,
     * so this = propertyWindow
     */
    init: function(){
        //arguments: key, pair, icons, index
        var key = arguments[0];
        var pair = arguments[1];
        var editorTextArea = new Ext.form.TextArea({
            alignment: "tl-tl", 
            allowBlank: pair.optional(),  
            msgTarget:'title', 
            maxLength:pair.length(),
            regex: pair._jsonProp.regex,
            regexText: pair._jsonProp.invalidText
        });
        
        editorTextArea.on('keyup', function(textArea, event) {
            if (editorTextArea.validate()){
                this.editDirectly(key, textArea.getValue());
            }
        }.bind(this));								

        return new Ext.Editor(editorTextArea);
    }        
});