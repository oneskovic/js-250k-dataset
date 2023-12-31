/**
 * @fileoverview A simple dummy class for representing message ports in tests.
 *
 */

goog.provide('goog.testing.messaging.MockMessagePort');

goog.require('goog.events.EventTarget');



/**
 * Class for unit-testing code that uses MessagePorts.
 * @param {*} id An opaque identifier, used because message ports otherwise have
 *     no distinguishing characteristics.
 * @param {goog.testing.MockControl} mockControl The mock control used to create
 *     the method mock for #postMessage.
 * @constructor
 * @extends {goog.events.EventTarget}
 * @final
 */
goog.testing.messaging.MockMessagePort = function(id, mockControl) {
  goog.testing.messaging.MockMessagePort.base(this, 'constructor');

  /**
   * An opaque identifier, used because message ports otherwise have no
   * distinguishing characteristics.
   * @type {*}
   */
  this.id = id;

  /**
   * Whether or not the port has been started.
   * @type {boolean}
   */
  this.started = false;

  /**
   * Whether or not the port has been closed.
   * @type {boolean}
   */
  this.closed = false;

  mockControl.createMethodMock(this, 'postMessage');
};
goog.inherits(goog.testing.messaging.MockMessagePort, goog.events.EventTarget);


/**
 * A mock postMessage funciton. Actually an instance of
 * {@link goog.testing.FunctionMock}.
 * @param {*} message The message to send.
 * @param {Array.<MessagePort>=} opt_ports Ports to send with the message.
 */
goog.testing.messaging.MockMessagePort.prototype.postMessage = function(
    message, opt_ports) {};


/**
 * Starts the port.
 */
goog.testing.messaging.MockMessagePort.prototype.start = function() {
  this.started = true;
};


/**
 * Closes the port.
 */
goog.testing.messaging.MockMessagePort.prototype.close = function() {
  this.closed = true;
};
