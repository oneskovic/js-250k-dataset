"use strict";

var capsela = require('../../');
var Service = capsela.Service;
var mp = require('capsela-util').MonkeyPatcher;
var Log = require('capsela-util').Log;
var Q = require('q');

exports.basics = {

    "test init/start/stop": function(test) {

        var started = false;
        var stopped = false;

        var service = new Service('testing', function() {

            started = true;

            return Q.delay('ok', 10);

        }, function() {
            
            stopped = true;

            return Q.delay('ok', 10);
        });

        test.equal(service.name, 'testing');
        test.equal(service.isRunning(), false);

        Q.when(service.start(),
            function() {

                test.equal(service.isRunning(), true);
                test.ok(started);

                return service.stop();
            }
        ).then(
            function() {

                test.equal(service.isRunning(), false);
                test.ok(stopped);

                test.done();
            }
        ).done();
    },

    "test start/stop w/out functions": function(test) {

        var service = new Service('testing');

        return Q.when(service.start(), function() {
            return service.stop();
        });
    }
};