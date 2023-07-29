var fullproof = fullproof || {};
fullproof.normalizer = fullproof.normalizer || {};

	//
	// Normalizing functions take a word and return another word.
	// If the word is cancelled by a function, it gets replaced
	// by the boolean value false, otherwise it returns and/or
	// sends forward the callback chain the new normalized form
	// for the word (or the unchanged form, if the normalizer
	// doesn't perform any transformation).
	//

/**
 * Converts a word into a canonical Unicode decomposed and lowercased form.
 * @param word a token to transform
 * @param callback a function called with the converted word (optional)
 * @return the result of the callback function, or the converted word is there is no callback.
 */
fullproof.normalizer.to_lowercase_decomp = function(word, callback) {
    word = word?net.kornr.unicode.lowercase(word):word;
    return callback?callback(word):word;
};

/**
 * Convertes a word to lowercase and remove all its diacritical marks.
 * @param word a token to transform
 * @param callback a function called with the converted word (optional)
 * @return the result of the callback function, or the converted word is there is no callback.
 */
fullproof.normalizer.to_lowercase_nomark = function(word, callback) {
    word = word?net.kornr.unicode.lowercase_nomark(word):word;
    return callback?callback(word):word;
};

/**
 * Remove all the duplicate letters in a word. For instance TESSTT is converted to TEST, CHEESE is converted to CHESE.
 * @param word a token to transform
 * @param callback a function called with the converted word (optional)
 * @return the result of the callback function, or the converted word is there is no callback.
 */
fullproof.normalizer.remove_duplicate_letters = function(word, callback) {
    var res = word?"":false;
    var last = false;
    if (word) {
        for (var i=0,max=word.length; i<max; ++i) {
            if (last) {
                if (last != word[i]) {
                    res +=last;
                }
            }
            last = word[i];
        }
        res += last?last:"";
    }
    return callback?callback(res):res;
};

/**
 *
 * @param word
 * @param array
 * @param callback
 * @return {*}
 */
fullproof.normalizer.filter_in_object = function(word, array, callback) {
    if (array[word]) {
        return callback?callback(false):false;
    }
    return callback?callback(word):word;
};
