goog.provide('thin.core.FontStyle');


/**
 * @constructor
 */
thin.core.FontStyle = function() {};


/**
 * @type {Array.<string>}
 */
thin.core.FontStyle.FONTSIZE_LIST = [
  '8', '9', '10', '11', '12', '14', '16', '18',
  '20', '22', '24', '26', '28', '36', '48', '72'
];


/**
 * @type {number}
 */
thin.core.FontStyle.prototype.size;


/**
 * @type {string}
 */
thin.core.FontStyle.prototype.family;


/**
 * @type {boolean}
 */
thin.core.FontStyle.prototype.bold = false;


/**
 * @type {boolean}
 */
thin.core.FontStyle.prototype.italic = false;


/**
 * @type {boolean}
 */
thin.core.FontStyle.prototype.underline = false;


/**
 * @type {boolean}
 */
thin.core.FontStyle.prototype.linethrough = false;


/**
 * @type {string}
 */
thin.core.FontStyle.prototype.decoration;