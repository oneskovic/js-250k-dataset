var util = require('util');
var events = require('events');

function Perform() {
  events.EventEmitter.call(this);
}

util.inherits(Perform, events.EventEmitter);

Perform.prototype.command = function(callback) {
  var self = this;
  var doneCallback;
  if (callback.length === 0) {
    callback.call(self, self.client.api);
    doneCallback = function() {
      self.emit('complete');
    };
  } else {
    doneCallback = function() {
      callback.call(self, self.client.api, function() {
        self.emit('complete');
      });
    };
  }

  process.nextTick(doneCallback);

  return this;
};

module.exports = Perform;
