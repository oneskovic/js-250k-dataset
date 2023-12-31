goog.provide('gf.net.PacketHandler');
goog.provide('gf.net.PacketSwitch');

goog.require('gf');
goog.require('gf.net.PacketReader');
goog.require('goog.asserts');


/**
 * Function that receives a packet instance to handle.
 * @typedef {function(!gf.net.Packet, number, !gf.net.PacketReader):(boolean)}
 */
gf.net.PacketHandler;



/**
 * Packet switching helper.
 * Dispatches packets to registered handlers.
 *
 * @constructor
 */
gf.net.PacketSwitch = function() {
  /**
   * Handlers for each packet type, indexed by packet type ID.
   * @private
   * @type {!Array.<gf.net.PacketHandler>}
   */
  this.handlers_ = new Array(256);
};


/**
 * Registers a new handler.
 * @param {number} packetType Packet ID.
 * @param {gf.net.PacketHandler} handler Packet handler function.
 * @param {Object=} opt_scope Scope to execute the handler in.
 */
gf.net.PacketSwitch.prototype.register = function(packetType, handler,
    opt_scope) {
  goog.asserts.assert(!this.handlers_[packetType]);
  handler = opt_scope ? goog.bind(handler, opt_scope) : handler;
  this.handlers_[packetType] = handler;
};


/**
 * Dispatches a packet to a handler.
 * @param {!gf.net.Packet} packet Incoming packet.
 * @return {boolean} True if the packet was handled successfully.
 */
gf.net.PacketSwitch.prototype.dispatch = function(packet) {
  var reader = gf.net.PacketReader.getSharedReader();
  reader.begin(packet.data, 0);
  if (!reader.hasBytes(1)) {
    return false;
  }
  var packetType = reader.readUint8();
  var handler = this.handlers_[packetType];
  if (handler) {
    return handler(packet, packetType, reader);
  }
  if (!gf.NODE) {
    goog.asserts.fail('no handler registered for packet type');
  }
  return false;
};
