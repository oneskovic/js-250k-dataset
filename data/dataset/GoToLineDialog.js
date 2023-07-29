/**
 * @constructor
 * @extends {WebInspector.DialogDelegate}
 */
WebInspector.GoToLineDialog = function(view)
{
    WebInspector.DialogDelegate.call(this);
    
    this.element = document.createElement("div");
    this.element.className = "go-to-line-dialog";

    this.element.createChild("label").textContent = WebInspector.UIString("Go to line: ");

    this._input = this.element.createChild("input");
    this._input.setAttribute("type", "text");
    this._input.setAttribute("size", 6);

    this._goButton = this.element.createChild("button");
    this._goButton.textContent = WebInspector.UIString("Go");
    this._goButton.addEventListener("click", this._onGoClick.bind(this), false);

    this._view = view;
}

/**
 * @param {WebInspector.Panel} panel
 */
WebInspector.GoToLineDialog.install = function(panel, viewGetter)
{
    function showGoToLineDialog()
    {
         var view = viewGetter();
         if (view)
             WebInspector.GoToLineDialog._show(view);
    }

    var goToLineShortcut = WebInspector.GoToLineDialog.createShortcut();
    panel.registerShortcut(goToLineShortcut.key, showGoToLineDialog);
}

WebInspector.GoToLineDialog._show = function(sourceView)
{
    if (!sourceView || !sourceView.canHighlightLine())
        return;
    WebInspector.Dialog.show(sourceView.element, new WebInspector.GoToLineDialog(sourceView));
}

WebInspector.GoToLineDialog.createShortcut = function()
{
    var isMac = WebInspector.isMac();
    var shortcut;
    if (isMac)
        return WebInspector.KeyboardShortcut.makeDescriptor("l", WebInspector.KeyboardShortcut.Modifiers.Meta);
    return WebInspector.KeyboardShortcut.makeDescriptor("g", WebInspector.KeyboardShortcut.Modifiers.Ctrl);
}

WebInspector.GoToLineDialog.prototype = {
    focus: function()
    {
        WebInspector.setCurrentFocusElement(this._input);
        this._input.select();
    },
    
    _onGoClick: function()
    {
        this._applyLineNumber();
        WebInspector.Dialog.hide();
    },
    
    _applyLineNumber: function()
    {
        var value = this._input.value;
        var lineNumber = parseInt(value, 10) - 1;
        if (!isNaN(lineNumber) && lineNumber >= 0)
            this._view.highlightLine(lineNumber);
    },
    
    onEnter: function()
    {
        this._applyLineNumber();
    }
}

WebInspector.GoToLineDialog.prototype.__proto__ = WebInspector.DialogDelegate.prototype;
