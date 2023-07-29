var unicodeChars = require('../utils/unicodeChars'),
    ErrorHandler = require('../utils/ErrorHandler.js');

module.exports = function elementIdValue (id, value) {

    /*!
     * make sure that callback contains chainit callback
     */
    var callback = arguments[arguments.length - 1];

    if(typeof id !== 'string' && typeof id !== 'number') {
        return callback(new ErrorHandler.ProtocolError('number or type of arguments don\'t agree with elementIdValue protocol command'));
    }

    var path = '/session/:sessionId/element/:id/value',
        data = {},
        key = [];

    path = path.replace(/:id/gi, id);

    if(typeof value === 'string') {

        // replace key with corresponding unicode character
        key = checkUnicode(value);

    } else if(value instanceof Array) {

        value.forEach(function(charSet) {
            key = key.concat(checkUnicode(charSet));
        });

    } else {
        return callback(new ErrorHandler.ProtocolError('number or type of arguments don\'t agree with elementIdValue protocol command'));
    }

    data = {'value': key};

    this.requestHandler.create(path, data, callback);

};

/*!
 * check for unicode character or split string into literals
 * @param  {String} value  text
 * @return {Array}         set of characters or unicode symbols
 */
function checkUnicode(value) {
    return unicodeChars.hasOwnProperty(value) ? [unicodeChars[value]] : value.split('');
}