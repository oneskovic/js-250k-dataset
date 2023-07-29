/**
 *
 * @fileoverview Transferable Secret Key Block.
 *
 */

goog.provide('e2e.openpgp.block.TransferableSecretKey');

goog.require('e2e.openpgp.block.TransferableKey');
goog.require('e2e.openpgp.packet.Key');
goog.require('e2e.openpgp.packet.SecretKey');
goog.require('goog.array');



/**
 * Transferable Secret Key Block.
 * @constructor
 * @extends {e2e.openpgp.block.TransferableKey}
 */
e2e.openpgp.block.TransferableSecretKey = function() {
  goog.base(this, e2e.openpgp.packet.SecretKey);
};
goog.inherits(e2e.openpgp.block.TransferableSecretKey,
    e2e.openpgp.block.TransferableKey);


/**
 * Attempts to unlock all key packets with the given passphrase.
 * @param {!e2e.ByteArray=} opt_passphrase The passphrase.
 * @return {boolean} Whether the unlocking was succesful.
 */
e2e.openpgp.block.TransferableSecretKey.prototype.unlock =
    function(opt_passphrase) {
  try {
    this.keyPacket.cipher.unlockKey(opt_passphrase);
    goog.array.forEach(this.subKeys, function(subKey) {
      subKey.cipher.unlockKey(opt_passphrase);
    });
  } catch (e) {
    return false;
  }
  return true;
};


/**
 * Attempts to lock all key packets with the given passphrase.
 * @param {!e2e.ByteArray=} opt_passphrase The passphrase.
 * @return {boolean} Whether the locking was succesful.
 */
e2e.openpgp.block.TransferableSecretKey.prototype.lock =
    function(opt_passphrase) {
  try {
    this.keyPacket.cipher.lockKey(opt_passphrase);
    goog.array.forEach(this.subKeys, function(subKey) {
      subKey.cipher.lockKey(opt_passphrase);
    });
  } catch (e) {
    return false;
  }
  return true;
};


/** @override */
e2e.openpgp.block.TransferableSecretKey.prototype.getKeyToSign =
    function() {
  return this.getKeyTo(
      e2e.openpgp.packet.Key.Usage.SIGN,
      e2e.openpgp.packet.SecretKey,
      false); // Prefer main key to subkeys.
};


/** @inheritDoc */
e2e.openpgp.block.TransferableSecretKey.prototype.header =
    'PRIVATE KEY BLOCK';
