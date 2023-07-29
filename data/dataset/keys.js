var unicodeChars = require('../utils/unicodeChars'),
    ErrorHandler = require('../utils/ErrorHandler.js');

module.exports = function keys (value) {

    /*!
     * make sure that callback contains chainit callback
     */
    var callback = arguments[arguments.length - 1];

    var key = [],
        data = {};

    if(typeof value === 'string') {

        // replace key with corresponding unicode character
        key = checkUnicode(value);

    } else if(value instanceof Array) {

        value.forEach(function(charSet) {
            key = key.concat(checkUnicode(charSet));
        });

    } else {
        return callback(new ErrorHandler.ProtocolError('number or type of arguments don\'t agree with keys protocol command'));
    }

    data = {'value': key};

    this.requestHandler.create(
        '/session/:sessionId/keys',
        data,
        callback
    );
};

/*!
 * check for unicode character or split string into literals
 * @param  {String} value  text
 * @return {Array}         set of characters or unicode symbols
 */
function checkUnicode(value) {
    return unicodeChars.hasOwnProperty(value) ? [unicodeChars[value]] : value.split('');
}