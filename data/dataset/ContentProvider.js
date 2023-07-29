/**
 * @interface
 */
WebInspector.ContentProvider = function() { }

WebInspector.ContentProvider.prototype = {
    /**
     * @return {string}
     */
    contentURL: function() { },

    /**
     * @return {!WebInspector.ResourceType}
     */
    contentType: function() { },

    /**
     * @param {function(?string)} callback
     */
    requestContent: function(callback) { },

    /**
     * @param {string} query
     * @param {boolean} caseSensitive
     * @param {boolean} isRegex
     * @param {function(!Array.<!WebInspector.ContentProvider.SearchMatch>)} callback
     */
    searchInContent: function(query, caseSensitive, isRegex, callback) { }
}

/**
 * @constructor
 * @param {number} lineNumber
 * @param {string} lineContent
 */
WebInspector.ContentProvider.SearchMatch = function(lineNumber, lineContent) {
    this.lineNumber = lineNumber;
    this.lineContent = lineContent;
}

/**
 * @param {string} content
 * @param {string} query
 * @param {boolean} caseSensitive
 * @param {boolean} isRegex
 * @return {!Array.<!WebInspector.ContentProvider.SearchMatch>}
 */
WebInspector.ContentProvider.performSearchInContent = function(content, query, caseSensitive, isRegex)
{
    var regex = createSearchRegex(query, caseSensitive, isRegex);

    var contentString = new String(content);
    var result = [];
    for (var i = 0; i < contentString.lineCount(); ++i) {
        var lineContent = contentString.lineAt(i);
        regex.lastIndex = 0;
        if (regex.exec(lineContent))
            result.push(new WebInspector.ContentProvider.SearchMatch(i, lineContent));
    }
    return result;
}
