/**
 * @fileoverview A scheme for using different sources (e.g., webcrypto, JS) to
 * encrypt with ecdh.
 */
goog.require('e2e.openpgp.error.UnsupportedError');
goog.require('e2e.scheme.EncryptionScheme');

goog.provide('e2e.scheme.Ecdh');



/**
 * Provides functions that e2e.scheme.Scheme will call.
 * @param {e2e.cipher.Cipher} cipher
 * @constructor
 * @extends {e2e.scheme.EncryptionScheme}
 */
e2e.scheme.Ecdh = function(cipher) {
  // This isn't actually implemented in Chrome yet...
  this.algorithmIdentifier = {
    'name': 'ECDH',
    'namedCurve': 'P-256'
  };
  goog.base(this, cipher);
};
goog.inherits(e2e.scheme.Ecdh, e2e.scheme.EncryptionScheme);


/** @override */
e2e.scheme.Ecdh.prototype.encryptWebCrypto = function(plaintext) {
  throw new e2e.openpgp.error.UnsupportedError(
      "Chrome doesn't support ecdh yet!");
};


/** @override */
e2e.scheme.Ecdh.prototype.decryptWebCrypto = function(ciphertext) {
  throw new e2e.openpgp.error.UnsupportedError(
      "Chrome doesn't support ecdh yet!");
};


/** @override */
e2e.scheme.Ecdh.prototype.encryptJavaScript = function(plaintext) {
  return this.cipher.encrypt(plaintext);
};


/** @override */
e2e.scheme.Ecdh.prototype.decryptJavaScript = function(ciphertext) {
  return this.cipher.decrypt(ciphertext);
};


/** @override */
e2e.scheme.Ecdh.prototype.decryptHardware = function(ciphertext) {
  throw new e2e.openpgp.error.UnsupportedError(
      "Hardware API doesn't exist yet");
};

