/**
 * @constructor
 * @param {string=} title
 * @param {string=} message
 * @extends {WebInspector.HelpScreen}
 */
WebInspector.HelpScreenUntilReload = function(title, message)
{
    WebInspector.HelpScreen.call(this, title);
    var p = this.helpContentElement.createChild("p");
    p.classList.add("help-section");
    p.textContent = message;
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.GlobalObjectCleared, this.hide, this);
}

WebInspector.HelpScreenUntilReload.prototype = {
    /**
     * @override
     */
    willHide: function()
    {
        WebInspector.debuggerModel.removeEventListener(WebInspector.DebuggerModel.Events.GlobalObjectCleared, this.hide, this);
        WebInspector.HelpScreen.prototype.willHide.call(this);
    },

    __proto__: WebInspector.HelpScreen.prototype
}
