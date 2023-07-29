"use strict";

var testbench = require(__dirname + '/../TestBench');

var capsela = require('../../');
var Browser = capsela.Browser;
var Request = capsela.Request;
var Response = capsela.Response;
var HttpClientRig = capsela.rigs.HttpClientRig;
var Stage = capsela.Stage;

module.exports["basics"] = {

    setUp: function(cb) {
        HttpClientRig.setUp();

        HttpClientRig.addStage('http', 'www.example.com', 80, new Stage(
            function(request) {
            }
        ));

        cb();
    },

    tearDown: function(cb) {
        HttpClientRig.tearDown();
        cb();
    },

    "test dispatch": function(test) {

        var b = new Browser();
        var request = new Request();

        b.dispatch('www.example.com', request).then(
            function(response) {
                test.done();
            }
        ).done();

        request.bodyStream.end();
    }
};