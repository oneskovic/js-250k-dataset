/**
 * @fileoverview Simple wrapper for a cipher and EME PKCS1 v1.5.
 */

goog.require('e2e.pkcs.eme.Pkcs1');
goog.require('e2e.scheme.EncryptionScheme');

goog.provide('e2e.scheme.Eme');



/**
 * JavaScript implementation of EME PKCS1 v1.5.
 * @param {e2e.cipher.Cipher} cipher
 * @constructor
 * @extends {e2e.scheme.EncryptionScheme}
 */
e2e.scheme.Eme = function(cipher) {
  goog.base(this, cipher);
  this.cipher = cipher;
};
goog.inherits(e2e.scheme.Eme, e2e.scheme.EncryptionScheme);


/** @override */
e2e.scheme.Eme.prototype.encryptJavaScript = function(plaintext) {
  return this.cipher.encrypt(
      new e2e.pkcs.eme.Pkcs1().encode(
          this.cipher.keySize, plaintext));
};


/** @override */
e2e.scheme.Eme.prototype.decryptJavaScript = function(ciphertext) {
  return this.cipher.decrypt(ciphertext).addCallback(function(m) {
    return new e2e.pkcs.eme.Pkcs1().decode(m);
  });
};
