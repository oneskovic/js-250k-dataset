'use strict';

var zlib = require('zlib');

module.exports = {
  
  encode : function (data, callback) {
    zlib.deflate(JSON.stringify(data), function (err, raw) {
      if (err) return callback(err);

      return callback(null, raw.toString('base64'));
    });
  },

  /**
   * zlib works with streams, so this must be used asynchronously.
   *
   * Base64 decode a string, decompress it, and then turn the
   * results back into a JavaScript object.
   *
   * @param {string} encoded The encoded data.
   * @param {Function} callback The callback to take the results,
   *                            1st parameter is any errors from
   *                            decoding, 2nd parameter is the
   *                            decoded data object.
   */
  decode : function (encoded, callback) {
    zlib.inflate(new Buffer(encoded, 'base64'), function (err, raw) {
      if (err) return callback(err);

      try {
        return callback(null, JSON.parse(raw));
      }
      catch (error) {
        return callback(error);
      }
    });
  }
};
