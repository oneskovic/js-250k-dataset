/**
 * @fileoverview This class listens on a message channel for logger commands and
 * logs them on the local page. This is useful when dealing with message
 * channels to contexts that don't have access to their own logging facilities.
 *
 */

goog.provide('goog.messaging.LoggerServer');

goog.require('goog.Disposable');
goog.require('goog.log');



/**
 * Creates a logger server that logs messages on behalf of the remote end of a
 * message channel. The remote end of the channel should use a
 * {goog.messaging.LoggerClient} with the same service name.
 *
 * @param {!goog.messaging.MessageChannel} channel The channel that is sending
 *     the log messages.
 * @param {string} serviceName The name of the logging service to listen for.
 * @param {string=} opt_channelName The name of this channel. Used to help
 *     distinguish this client's messages.
 * @constructor
 * @extends {goog.Disposable}
 */
goog.messaging.LoggerServer = function(channel, serviceName, opt_channelName) {
  goog.base(this);

  /**
   * The channel that is sending the log messages.
   * @type {!goog.messaging.MessageChannel}
   * @private
   */
  this.channel_ = channel;

  /**
   * The name of the logging service to listen for.
   * @type {string}
   * @private
   */
  this.serviceName_ = serviceName;

  /**
   * The name of the channel.
   * @type {string}
   * @private
   */
  this.channelName_ = opt_channelName || 'remote logger';

  this.channel_.registerService(
      this.serviceName_, goog.bind(this.log_, this), true /* opt_json */);
};
goog.inherits(goog.messaging.LoggerServer, goog.Disposable);


/**
 * Handles logging messages from the client.
 * @param {!Object|string} message
 *     The logging information from the client.
 * @private
 */
goog.messaging.LoggerServer.prototype.log_ = function(message) {
  var args =
      /**
       * @type {!{level: number, message: string,
       *           name: string, exception: Object}}
       */ (message);
  var level = goog.log.Level.getPredefinedLevelByValue(args['level']);
  if (level) {
    var msg = '[' + this.channelName_ + '] ' + args['message'];
    goog.log.getLogger(args['name'])
        .log(level, msg, args['exception']);
  }
};


/** @override */
goog.messaging.LoggerServer.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.channel_.registerService(this.serviceName_, goog.nullFunction, true);
  delete this.channel_;
};
