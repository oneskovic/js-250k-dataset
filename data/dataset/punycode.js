/**
 * @fileoverview Definitions for node's punycode module.
 * @see http://nodejs.org/api/punycode.html
 * @see https://github.com/joyent/node/blob/master/lib/punycode.js
 */

/**
 * @const
 */
var punycode = {};

/**
 * @param {string} string
 * @return {string}
 */
punycode.decode;

/**
 * @param {string} string
 * @return {string}
 */
punycode.encode;

/**
 * @param {string} domain
 * @return {string}
 */
punycode.toUnicode;

/**
 * @param {string} domain
 * @return {string}
 */
punycode.toASCII;

/**
 * @type {Object.<string,*>}
 */
punycode.ucs2 = {};

/**
 * @param {string} string
 * @return {Array.<number>}
 */
punycode.ucs2.decode;

/**
 * @param {Array.<number>} codePoints
 * @return {string}
 */
punycode.ucs2.encode;

/**
 * @type {string}
 */
punycode.version;

module.exports = punycode;
