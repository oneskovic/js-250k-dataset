/**
 *
 * @fileoverview TransferablePublicKey block.
 *
 */

goog.provide('e2e.openpgp.block.TransferablePublicKey');

goog.require('e2e.openpgp.block.TransferableKey');
goog.require('e2e.openpgp.packet.Key');
goog.require('e2e.openpgp.packet.PublicKey');



/**
 * Transferable Public Key Block.
 * @constructor
 * @extends {e2e.openpgp.block.TransferableKey}
 */
e2e.openpgp.block.TransferablePublicKey = function() {
  goog.base(this, e2e.openpgp.packet.PublicKey);
};
goog.inherits(e2e.openpgp.block.TransferablePublicKey,
    e2e.openpgp.block.TransferableKey);


/** @override */
e2e.openpgp.block.TransferablePublicKey.prototype.SERIALIZE_IN_KEY_OBJECT =
    true;


/** @override */
e2e.openpgp.block.TransferablePublicKey.prototype.getKeyToEncrypt =
    function() {
  return this.getKeyTo(
      e2e.openpgp.packet.Key.Usage.ENCRYPT,
      e2e.openpgp.packet.PublicKey,
      true); // Prefer one of subkeys to main key.
};


/** @inheritDoc */
e2e.openpgp.block.TransferablePublicKey.prototype.header =
    'PUBLIC KEY BLOCK';
