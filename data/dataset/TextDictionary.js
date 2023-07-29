/**
 * @constructor
 */
WebInspector.TextDictionary = function()
{
    this._words = {};
}

WebInspector.TextDictionary.prototype = {
    /**
     * @param {string} word
     */
    addWord: function(word)
    {
        if (!this._words[word])
            this._words[word] = 1;
        else
            ++this._words[word];
    },

    /**
     * @param {string} word
     */
    removeWord: function(word)
    {
        if (!this._words[word])
            return;
        if (this._words[word] === 1)
            delete this._words[word];
        else
            --this._words[word];
    },

    /**
     * @param {string} prefix
     * @return {!Array.<string>}
     */
    wordsWithPrefix: function(prefix)
    {
        var words = [];
        for(var i in this._words) {
            if (i.startsWith(prefix))
                words.push(i);
        }
        return words;
    },

    /**
     * @param {string} word
     * @return {boolean}
     */
    hasWord: function(word)
    {
        return !!this._words[word];
    },

    /**
     * @param {string} word
     * @return {number}
     */
    wordCount: function(word)
    {
        return this._words[word] ? this._words[word] : 0;
    },

    reset: function()
    {
        this._words = {};
    }
}
