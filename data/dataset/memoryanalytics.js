'use strict';

var Analytics = require('volos-analytics-common');
var onResponse = require('on-response');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

// events: makeRecord, flush
var create = function(options) {
  var spi = new MemoryAnalyticsSpi(options);
  return new Analytics(spi, options);
};
module.exports.create = create;

var MemoryAnalyticsSpi = function(options) {
  EventEmitter.call(this);
};
util.inherits(MemoryAnalyticsSpi, EventEmitter);

MemoryAnalyticsSpi.prototype.flush = function(recordsQueue, cb) {
  this.emit('flush', recordsQueue);
  cb();
};

MemoryAnalyticsSpi.prototype.makeRecord = function(req, resp, cb) {
  var record = {};
  record['client_received_start_timestamp'] = Date.now();
  record['recordType']   = 'APIAnalytics';
  record['request_uri']  = req.protocol + '://' + req.headers.host + req.url;
  record['request_path'] = req.url.split('?')[0];
  record['request_verb'] = req.method;
  record['client_ip']    = req.connection.remoteAddress;
  record['useragent']    = req.headers['user-agent'];

  var self = this;
  onResponse(req, resp, function(err, summary) {
    record['response_status_code'] = resp.statusCode;
    record['client_sent_end_timestamp'] = Date.now();
    cb(undefined, record);
    self.emit('makeRecord', record);
  });
};
