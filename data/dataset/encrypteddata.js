/**
 * @fileoverview Encrypted Data packet. Parent class for
 *   Symmetrically Encrypted Data Packet (Tag 9) and
 *   Symmetrically Encrypted Integrity Protected Data Packet (Tag 18).
 * @author adhintz@google.com (Drew Hintz)
 */

goog.provide('e2e.openpgp.packet.EncryptedData');

goog.require('e2e.openpgp.packet.Data');



/**
 * Representation of an Encrypted Data Packet.
 * @param {!e2e.ByteArray} encryptedData The encrypted data.
 * @extends {e2e.openpgp.packet.Data}
 * @constructor
 */
e2e.openpgp.packet.EncryptedData = function(
    encryptedData) {
  goog.base(this);

  /**
   * The encrypted data.
   * @type {!e2e.ByteArray}
   * @protected
   */
  this.encryptedData = encryptedData;

  /** @inheritDoc */
  this.data = [];
};
goog.inherits(e2e.openpgp.packet.EncryptedData,
    e2e.openpgp.packet.Data);


/**
 * Decrypts the encryptedData and populates this.data.
 * @param {e2e.cipher.Algorithm} algorithm The encryption algorithm.
 * @param {e2e.cipher.key.Key=} opt_keyObj The key object
 *     to decrypt the data.
 */
e2e.openpgp.packet.EncryptedData.prototype.decrypt =
    goog.abstractMethod;
