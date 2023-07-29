"use strict";

var testbench = require('../TestBench');

var capsela = require('../../');

var Session = capsela.Session;
var SessionStore = capsela.SessionStore;

// save the originals
var originals = {
    datenow: Date.now,
    setInterval: setInterval
};

module.exports = {

    tearDown: function(cb) {

        setInterval = originals.setInterval;
        Date.now = originals.datenow;
        cb();
    },

//    "test init": function(test) {
//
//        test.expect(1);
//
//        // make sure a timer is installed pointing to the cleanup function
//
//        setInterval = function(cb, delay) {
//            test.equal(delay, global.config.session.cleanup_interval * 1000);
//        };
//
//        var sm = new SessionStore();
//        test.done();
//    },

    "test save": function(test) {

        var store = new SessionStore();

        Date.now = function() {return 72000;};
        var session = new Session();

        test.equal(session.store, null);
        test.equal(session.getLastSaveTime(), 72000);

        Date.now = function() {return 73000;};

        store.save(session).then(
            function() {
                test.equal(session.getLastSaveTime(), 73000);
                test.equal(session.store, store);
                test.done();
            });
    },

    "test load session not found": function(test) {

        var store = new SessionStore();

        store.load('mickey').then(
            function(err, session) {
                test.done();
            });
    },

    "test save/load/destroy": function(test) {

        test.expect(3);

        var store = new SessionStore();
        var session = new Session();

        session.monkeys = 7;

        // try saving
        store.save(session)
        .then(
            function(foundSession) {
                test.equal(foundSession.monkeys, 7);
                return store.load(session.getId());
            }
        ).then(
            function(foundSession) {
                test.equal(foundSession.monkeys, 7);

                // try destroying
                return store.destroy(foundSession);
            }
        ).then(
            function() {
                return store.load(session.getId());
            }
        ).then(
            function(foundSession) {
                test.equals(foundSession, undefined);
                test.done();
            });
    }
};