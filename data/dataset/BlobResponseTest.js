"use strict";

var testbench = require(__dirname + '/../TestBench');
var Pipe = require('capsela-util').Pipe;

var BlobResponse = require('../../').BlobResponse;

module.exports["basics"] = {

    "test init": function(test) {

        var source = new Pipe();
        var bodyBuffer = new Pipe();

        var blob = {

            getType: function() {
                return 'image/jpeg'
            },

            getSize: function() {
                return 4732;
            },

            getLastModified: function() {
                return new Date(72146);
            },

            getStream: function() {
                return source;
            }
        };

        var response = new BlobResponse(blob);

        test.equal(response.getContentType(), 'image/jpeg');
        test.equal(response.getHeader('content-length'), 4732);
        test.equal(response.getHeader('last-modified'), new Date(72146).toUTCString());

        bodyBuffer.getData().then(
            function(data) {
                test.equal(data.toString(), 'goodbye dolly.');
                test.done();
            }
        );

        response.sendBody(bodyBuffer);

        source.end(new Buffer('goodbye dolly.'));
    },
    
    "test zero size": function(test) {

        var source = new Pipe();
        var blob = {

            getType: function() {
                return 'text/plain'
            },

            getSize: function() {
                return 0;
            },

            getLastModified: function() {
                return new Date(72146);
            },

            getStream: function() {
                return source;
            }
        }

        var response = new BlobResponse(blob);

        test.equal(response.getContentType(), 'text/plain');
        test.equal(response.getHeader('content-length'), 0);
        test.equal(response.getHeader('last-modified'), new Date(72146).toUTCString());
        test.done();
    }
};