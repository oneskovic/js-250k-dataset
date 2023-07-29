WebInspector.CodeMirrorColorEditingController = function(codeMirror, marker)
{
    WebInspector.CodeMirrorEditingController.call(this, codeMirror, marker);
}

WebInspector.CodeMirrorColorEditingController.prototype = {
    constructor: WebInspector.CodeMirrorColorEditingController,
    __proto__: WebInspector.CodeMirrorEditingController.prototype,
    
    // Public

    get initialValue()
    {
        return WebInspector.Color.fromString(this.text);
    },

    get cssClassName()
    {
        return "color";
    },

    popoverWillPresent: function(popover)
    {
        this._colorPicker = new WebInspector.ColorPicker;
        this._colorPicker.addEventListener(WebInspector.ColorPicker.Event.ColorChanged, this._colorPickerColorChanged, this);
        popover.content = this._colorPicker.element;
    },

    popoverDidPresent: function(popover)
    {
        this._colorPicker.color = this._value;
    },

    // Private
    
    _colorPickerColorChanged: function(event)
    {
        this.value = event.target.color;
    }    
}
