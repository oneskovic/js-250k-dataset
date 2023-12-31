var EventEmitter = require('events').EventEmitter;
var util         = require('util');
var Amount       = require('./amount').Amount;
var extend       = require('extend');


function PathFind(remote, src_account, dst_account, dst_amount, src_currencies) {
  EventEmitter.call(this);

  this.remote = remote;

  this.src_account    = src_account;
  this.dst_account    = dst_account;
  this.dst_amount     = dst_amount;
  this.src_currencies = src_currencies;
};

util.inherits(PathFind, EventEmitter);

/**
 * Submits a path_find_create request to the network.
 *
 * This starts a path find request, superceding all previous path finds.
 *
 * This will be called automatically by Remote when this object is instantiated,
 * so you should only have to call it if the path find was closed or superceded
 * and you wish to restart it.
 */
PathFind.prototype.create = function () {
  var self = this;

  var req = this.remote.request_path_find_create(
    this.src_account,
    this.dst_account,
    this.dst_amount,
    this.src_currencies);

  req.once('error', function(err) {
    self.emit('error', err);
  });
  req.once('success', function(msg) {
    self.notify_update(msg);
  });

  // XXX We should add ourselves to prepare_subscribe or a similar mechanism so
  // that we can resubscribe after a reconnection.

  req.broadcast().request();
};

PathFind.prototype.close = function () {
  this.remote.request_path_find_close().broadcast().request();
  this.emit('end');
  this.emit('close');
};

PathFind.prototype.notify_update = function (message) {
  var src_account = message.source_account;
  var dst_account = message.destination_account;
  var dst_amount  = Amount.from_json(message.destination_amount);

  // Only pass the event along if this path find response matches what we were
  // looking for.
  if (this.src_account === src_account &&
      this.dst_account === dst_account &&
      this.dst_amount.equals(dst_amount)) {
    this.emit('update', message);
  }
};

PathFind.prototype.notify_superceded = function () {
  // XXX If we're set to re-subscribe whenever we connect to a new server, then
  // we should cancel that behavior here. See PathFind#create.

  this.emit('end');
  this.emit('superceded');
};

exports.PathFind = PathFind;
