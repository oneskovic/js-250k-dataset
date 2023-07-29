/**
 * @constructor
 * @implements {WebInspector.SearchScope}
 * @param {WebInspector.UISourceCodeProvider} uiSourceCodeProvider
 */
WebInspector.ScriptsSearchScope = function(uiSourceCodeProvider)
{
    // FIXME: Add title once it is used by search controller.
    WebInspector.SearchScope.call(this)
    this._searchId = 0;
    this._uiSourceCodeProvider = uiSourceCodeProvider;
}

WebInspector.ScriptsSearchScope.prototype = {
    /**
     * @param {WebInspector.SearchConfig} searchConfig
     * @param {function(WebInspector.FileBasedSearchResultsPane.SearchResult)} searchResultCallback
     * @param {function(boolean)} searchFinishedCallback
     */
    performSearch: function(searchConfig, searchResultCallback, searchFinishedCallback)
    {
        this.stopSearch();
        
        var uiSourceCodes = this._sortedUISourceCodes();
        var uiSourceCodeIndex = 0;
        
        function filterOutContentScripts(uiSourceCode)
        {
            return !uiSourceCode.isContentScript;
        }
        
        if (!WebInspector.settings.searchInContentScripts.get())
            uiSourceCodes = uiSourceCodes.filter(filterOutContentScripts);

        function continueSearch()
        {
            // FIXME: Enable support for counting matches for incremental search.
            // FIXME: Enable support for bounding search results/matches number to keep inspector responsive.
            if (uiSourceCodeIndex < uiSourceCodes.length) {
                var uiSourceCode = uiSourceCodes[uiSourceCodeIndex++];
                uiSourceCode.searchInContent(searchConfig.query, !searchConfig.ignoreCase, searchConfig.isRegex, searchCallbackWrapper.bind(this, this._searchId, uiSourceCode));
            } else 
                searchFinishedCallback(true);
        }

        function searchCallbackWrapper(searchId, uiSourceCode, searchMatches)
        {
            if (searchId !== this._searchId) {
                searchFinishedCallback(false);
                return;
            }
                
            var searchResult = new WebInspector.FileBasedSearchResultsPane.SearchResult(uiSourceCode, searchMatches);
            searchResultCallback(searchResult);
            continueSearch.call(this);
        }
        
        continueSearch.call(this);
        return uiSourceCodes.length;
    },

    stopSearch: function()
    {
        ++this._searchId;
    },

    /**
     * @param {WebInspector.SearchConfig} searchConfig
     */
    createSearchResultsPane: function(searchConfig)
    {
        return new WebInspector.FileBasedSearchResultsPane(searchConfig);
    },

    /**
     * @return {Array.<WebInspector.UISourceCode>}
     */
    _sortedUISourceCodes: function()
    {
        function filterOutAnonymous(uiSourceCode)
        {
            return !!uiSourceCode.url;
        }
        
        function comparator(a, b)
        {
            return a.url.localeCompare(b.url);   
        }
        
        var uiSourceCodes = this._uiSourceCodeProvider.uiSourceCodes();
        
        uiSourceCodes = uiSourceCodes.filter(filterOutAnonymous);
        uiSourceCodes.sort(comparator);
        
        return uiSourceCodes;
    }
}

WebInspector.ScriptsSearchScope.prototype.__proto__ = WebInspector.SearchScope.prototype;

WebInspector.settings.searchInContentScripts = WebInspector.settings.createSetting("searchInContentScripts", false);
