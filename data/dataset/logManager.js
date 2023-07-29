WebInspector.LogManager = function()
{
    WebInspector.Object.call(this);

    WebInspector.Frame.addEventListener(WebInspector.Frame.Event.MainResourceDidChange, this._mainResourceDidChange, this);
}

WebInspector.LogManager.Event = {
    SessionStarted: "log-manager-session-was-started",
    Cleared: "log-manager-cleared",
    MessageAdded: "log-manager-message-added",
    ActiveLogCleared: "log-manager-current-log-cleared",
    PreviousMessageRepeatCountUpdated: "log-manager-previous-message-repeat-count-updated"
};

WebInspector.LogManager.prototype = {
    constructor: WebInspector.LogManager,

    // Public

    messageWasAdded: function(source, level, text, type, url, line, column, repeatCount, parameters, stackTrace, requestId)
    {
        // Called from WebInspector.ConsoleObserver.

        // FIXME: Pass a request. We need a way to get it from the request ID.
        var consoleMessage = WebInspector.ConsoleMessage.create(source, level, text, type, url, line, column, repeatCount, parameters, stackTrace, null);

        this.dispatchEventToListeners(WebInspector.LogManager.Event.MessageAdded, {message: consoleMessage});

        console.assert(!consoleMessage._element || !consoleMessage._element.parentNode, "This console message shouldn't be added to a view. To add it you need to use clone().");
    },

    messagesCleared: function()
    {
        // Called from WebInspector.ConsoleObserver.

        // We don't want to clear messages on reloads. We can't determine that easily right now.
        // FIXME: <rdar://problem/13767079> Console.messagesCleared should include a reason
        this._shouldClearMessages = true;
        setTimeout(function() {
            if (this._shouldClearMessages)
                this.dispatchEventToListeners(WebInspector.LogManager.Event.ActiveLogCleared);
            delete this._shouldClearMessages;
        }.bind(this), 0);
    },

    messageRepeatCountUpdated: function(count)
    {
        // Called from WebInspector.ConsoleObserver.

        this.dispatchEventToListeners(WebInspector.LogManager.Event.PreviousMessageRepeatCountUpdated, {count: count});
    },

    requestClearMessages: function()
    {
        ConsoleAgent.clearMessages();
    },

    // Private

    _mainResourceDidChange: function(event)
    {
        console.assert(event.target instanceof WebInspector.Frame);

        if (!event.target.isMainFrame())
            return;

        var oldMainResource = event.data.oldMainResource;
        var newMainResource = event.target.mainResource;
        if (oldMainResource.url !== newMainResource.url)
            this.dispatchEventToListeners(WebInspector.LogManager.Event.Cleared);
        else
            this.dispatchEventToListeners(WebInspector.LogManager.Event.SessionStarted);

        delete this._shouldClearMessages;
    }
};

WebInspector.LogManager.prototype.__proto__ = WebInspector.Object.prototype;
