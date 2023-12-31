var Adaptor = function(opts) {
  opts = opts || {};
  this.subReqs = {};
  this.publishRoute = opts.publishRoute;
  this.subscribeRoute = opts.subscribeRoute;
};

module.exports = Adaptor;

Adaptor.prototype.onPublish = function(client, packet) {
  var route = this.publishRoute;

  if(!route) {
    throw new Error('unspecified publish route.');
  }

  var payload = packet.payload;
  if(payload instanceof Buffer) {
    payload = payload.toString('utf8');
  }

  var req = {
    id: packet.messageId,
    route: route,
    body: packet
  };

  client.emit('message', req);

  if(packet.qos === 1) {
    client.socket.puback({messageId: packet.messageId});
  }
};

Adaptor.prototype.onSubscribe = function(client, packet) {
  var route = this.subscribeRoute;

  if(!route) {
    throw new Error('unspecified subscribe route.');
  }

  var req = {
    id: packet.messageId,
    route: route,
    body: {
      subscriptions: packet.subscriptions
    }
  };

  this.subReqs[packet.messageId] = packet;

  client.emit('message', req);
};

Adaptor.prototype.onPubAck = function(client, packet) {
  var req = {
    id: packet.messageId,
    route: 'connector.mqttHandler.pubAck',
    body: {
      mid: packet.messageId
    }
  };

  this.subReqs[packet.messageId] = packet;

  client.emit('message', req);
};


Adaptor.prototype.publish = function(client, packet) {
  var mid = packet.id;
  var subreq = this.subReqs[mid];
  if(subreq) {
    // is suback
    client.socket.suback({messageId: mid, granted: packet.body});
    delete this.subReqs[mid];
    return;
  }

  client.socket.publish(packet.body);
};
