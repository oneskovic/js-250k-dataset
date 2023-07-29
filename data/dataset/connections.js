var VoltClient = require('../../lib/client');
var VoltConfiguration = require('../../lib/configuration');
var util = require('util');
var testCase = require('nodeunit');

function goodConfig() {
  return config('localhost');
}

function badConfig() {
  return config('idontexist');
}

function config(host) {
  console.log('this config got called');
  var config = new VoltConfiguration();
  config.host = host;
  var configs = [];
  configs.push(config);
  return configs;
}

exports.connections = {

  setUp : function(callback) {
    console.log('connections setup called');
    callback();
  },
  tearDown : function(callback) {
    console.log('connections teardown called');
    callback();
  },
  'Bad connection results' : function(test) {
    console.log('running bad connection test');
    var client = new VoltClient(badConfig())
    client.connect(function startup(code, event, results) {
      console.log('bad connection test');
      test.expect(1);
      test.notEqual(code, null, 'There should not be a host named idontexists');
      test.done();
    });
  },
  'Good connection results' : function(test) {
    console.log('running good connection test');
    var client = new VoltClient(goodConfig())
    client.connect(function startup(code, event, results) {
      test.expect(1);
      test.equal(code, null, 'Should have been able to connect, is Volt running on localhost?');
      test.done();
    });
  }
};
