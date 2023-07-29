"use strict";

var events = require('events'),
    Discover = require('../index.js');

var test = module.exports = {};

test["on 'reached' adds the reached contact to the closest KBucket"] = function (test) {
    test.expect(2);
    var fooBase64 = new Buffer("foo").toString("base64");
    var barBase64 = new Buffer("bar").toString("base64");
    var transport = new events.EventEmitter();
    transport.setTransportInfo = function (contact) {
        return contact;
    };    
    var discover = new Discover({
        transport: transport
    });
    discover.register({id: fooBase64});
    // "foo" is the closest (and only) KBucket
    transport.emit('reached', {id: barBase64});
    discover.find(barBase64, function (error, contact) {
        test.ok(!error);
        test.deepEqual(contact, {id: barBase64});
    });
    test.done();
};