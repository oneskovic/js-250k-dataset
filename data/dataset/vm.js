/**
 * @fileoverview Definitions for node's vm module.
 * @see http://nodejs.org/api/vm.html
 * @see https://github.com/joyent/node/blob/master/lib/vm.js
 */

/**
 * @const
 */
var vm = {};

/**
 * @constructor
 */
vm.Context = function() {}; // Does not really exist

/**
 * @param {string} code
 * @param {string=} filename
 */
vm.runInThisContext;

/**
 * @param {string} code
 * @param {Object.<string,*>=} sandbox
 * @param {string=} filename
 * @return {void}
 */
vm.runInNewContext;

/**
 * @param {string} code
 * @param {vm.Context} context
 * @param {string=} filename
 * @return {void}
 */
vm.runInContext;

/**
 * @param {Object.<string,*>=} initSandbox
 * @return {vm.Context}
 * @nosideeffects
 */
vm.createContext;

/**
 * @constructor
 */
vm.Script = function() {};

/**
 * @param {string} code
 * @param {string=} filename
 * @return {vm.Script}
 * @nosideeffects
 */
vm.createScript;

/**
 * @return {void}
 */
vm.Script.prototype.runInThisContext;

/**
 * @param {Object.<string,*>=} sandbox
 * @return {void}
 */
vm.Script.prototype.runInNewContext;

module.exports = vm;
