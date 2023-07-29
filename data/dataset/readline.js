/**
 * @fileoverview Definitions for node's readline module. Depends on the events module.
 * @see http://nodejs.org/api/readline.html
 */

var events = require('events');
var stream = require('stream');

/**
 * @const
 */
var readline = {};

/**
 * @param {{input: stream.ReadableStream, output: stream.WritableStream, completer: function(string, function(*, Array)=), terminal: boolean}} options
 * @return {readline.Interface}
 */
readline.createInterface;

/**
 * @constructor
 * @extends events.EventEmitter
 */
readline.Interface = function() {};

/**
 * @param {string} prompt
 * @param {number} length
 * @return {void}
 */
readline.Interface.prototype.setPrompt;

/**
 * @param {boolean=} preserveCursor
 * @return {void}
 */
readline.Interface.prototype.prompt;

/**
 * @param {string} query
 * @param {function(string)} callback
 * @return {void}
 */
readline.Interface.prototype.question;

/**
 * @return {void}
 */
readline.Interface.prototype.pause;

/**
 * @return {void}
 */
readline.Interface.prototype.resume;

/**
 * @return {void}
 */
readline.Interface.prototype.close;

/**
 * @param {string} data
 * @param {Object.<string,*>=} key
 * @return {void}
 */
readline.Interface.prototype.write;

module.exports = readline;
