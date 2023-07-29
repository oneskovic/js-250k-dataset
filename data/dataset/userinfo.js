goog.provide('gf.net.UserInfo');

goog.require('gf.net.AuthType');
goog.require('goog.string');



/**
 * User information.
 * Contains generally immutable user information, such as identification and
 * authentication values.
 *
 * @constructor
 */
gf.net.UserInfo = function() {
  /**
   * Authentication type.
   * @type {gf.net.AuthType}
   */
  this.authType = gf.net.AuthType.NONE;

  /**
   * Authentication service-specific ID, such as FBID.
   * @type {string}
   */
  this.authId = '0';

  /**
   * Displayed name of the user.
   * @type {string}
   */
  this.displayName = 'User';
};


/**
 * Deep-clones the object.
 * @return {!gf.net.UserInfo} Cloned object.
 */
gf.net.UserInfo.prototype.clone = function() {
  var clone = new gf.net.UserInfo();
  clone.authType = this.authType;
  clone.authId = this.authId;
  clone.displayName = this.displayName;
  return clone;
};


/**
 * Converts the object to a human-readable string.
 * @return {string} Human-readable string representation.
 */
gf.net.UserInfo.prototype.toString = function() {
  return '[user]';
};


/**
 * Sanitizes an input user name.
 * @param {string} value User name.
 * @return {string} Sanitized user name.
 */
gf.net.UserInfo.sanitizeDisplayName = function(value) {
  value = goog.string.normalizeSpaces(goog.string.normalizeWhitespace(
      goog.string.trim(value)));
  if (!value.length) {
    return 'User';
  }
  return value;
};
