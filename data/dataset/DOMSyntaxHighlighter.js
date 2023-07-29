WebInspector.DOMSyntaxHighlighter = function(mimeType)
{
    this._tokenizer = WebInspector.SourceTokenizer.Registry.getInstance().getTokenizer(mimeType);
}

WebInspector.DOMSyntaxHighlighter.prototype = {
    createSpan: function(content, className)
    {
        var span = document.createElement("span");
        span.className = "webkit-" + className;
        span.appendChild(document.createTextNode(content));
        return span;
    },

    syntaxHighlightNode: function(node)
    {
        this._tokenizer.condition = this._tokenizer.initialCondition;
        var lines = node.textContent.split("\n");
        node.removeChildren();

        for (var i = lines[0].length ? 0 : 1; i < lines.length; ++i) {
            var line = lines[i];
            var plainTextStart = 0;
            this._tokenizer.line = line;
            var column = 0;
            do {
                var newColumn = this._tokenizer.nextToken(column);
                var tokenType = this._tokenizer.tokenType;
                if (tokenType) {
                    if (column > plainTextStart) {
                        var plainText = line.substring(plainTextStart, column);
                        node.appendChild(document.createTextNode(plainText));
                    }
                    var token = line.substring(column, newColumn);
                    node.appendChild(this.createSpan(token, tokenType));
                    plainTextStart = newColumn;
                }
                column = newColumn;
           } while (column < line.length)

           if (plainTextStart < line.length) {
               var plainText = line.substring(plainTextStart, line.length);
               node.appendChild(document.createTextNode(plainText));
           }
           if (i < lines.length - 1)
               node.appendChild(document.createElement("br"));
        }
    }
}
