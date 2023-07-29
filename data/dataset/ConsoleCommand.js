WebInspector.ConsoleCommand = function(command)
{
    WebInspector.Object.call(this);

    this.command = command;
};

WebInspector.ConsoleCommand.prototype = {
    constructor: WebInspector.ConsoleCommand,

    // Public

    clearHighlight: function()
    {
        var highlightedMessage = this._formattedCommand;
        delete this._formattedCommand;
        this._formatCommand();
        this._element.replaceChild(this._formattedCommand, highlightedMessage);
    },

    highlightSearchResults: function(regexObject)
    {
        regexObject.lastIndex = 0;
        var text = this.command;
        var match = regexObject.exec(text);
        var offset = 0;
        var matchRanges = [];
        while (match) {
            matchRanges.push({ offset: match.index, length: match[0].length });
            match = regexObject.exec(text);
        }
        highlightSearchResults(this._formattedCommand, matchRanges);
        this._element.scrollIntoViewIfNeeded();
    },

    matchesRegex: function(regexObject)
    {
        return regexObject.test(this.command);
    },

    toMessageElement: function()
    {
        if (!this._element) {
            this._element = document.createElement("div");
            this._element.command = this;
            this._element.className = "console-user-command";
            this._element.setAttribute("data-labelprefix", WebInspector.UIString("Input: "));

            this._formatCommand();
            this._element.appendChild(this._formattedCommand);
        }
        return this._element;
    },

    // Private

    _formatCommand: function()
    {
        this._formattedCommand = document.createElement("span");
        this._formattedCommand.className = "console-message-text source-code";
        this._formattedCommand.textContent = this.command;
    },
    
    toClipboardString: function(isPrefixOptional)
    {
        return (isPrefixOptional ? "" : "> ") + this.command;
    }
};

WebInspector.ConsoleCommand.prototype.__proto__ = WebInspector.Object.prototype;
