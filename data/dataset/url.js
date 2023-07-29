/**
 * @fileoverview Definitions for node's url module.
 * @see http://nodejs.org/api/url.html
 * @see https://github.com/joyent/node/blob/master/lib/url.js
 */

/**
 * @const
 */
var url = {};

/**
 * @typedef {{href: ?string, protocol: ?string, host: ?string, auth: ?string, hostname: ?string, port: ?string, pathname: ?string, search: ?string, path: ?string, query: ?string, hash: ?string}}
 */
var URL;

/**
 * @param {string} urlStr
 * @param {boolean=} parseQueryString
 * @param {boolean=} slashesDenoteHost
 * @return {URL}
 * @nosideeffects
 */
url.parse;

/**
 * @param {URL} urlObj
 * @return {string}
 * @nosideeffects
 */
url.format;

/**
 * @param {string} from
 * @param {string} to
 * @return {string}
 * @nosideeffects
 */
url.resolve;

module.exports = url;
