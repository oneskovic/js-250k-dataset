'use strict';

var agent = require('superagent');
var apigeetool = require('apigeetool');
var assert = require('assert');
var childProcess = require('child_process');
var path = require('path');

var testConfig = require('../../testconfig/testconfig-apigee');
var config = testConfig.config;

var TEST_ENVIRONMENT = 'test';
var PROXY_NAME = 'volostests';
var LONG_TIMEOUT = 120000;

describe('Apigee Server Tests', function() {
  var deployedRevision;

  before(function() {
    if (!config.testUriBase) {
      throw new Error('Configuration is missing the "testUriBase" parameter');
    }
  });

/* Doesn't seem to work at all
  describe('Cache via remote Express', function() {
    var test = require('../../cache/test/verifycache.js');
    test.verify(config.testUriBase + '/volostests-apigeecache');
  });
  */

  describe('Cache SPI from inside Apigee', function() {
    it('SPI test', function(done) {
      this.timeout(10000);
      remoteMochaTest(config.testUriBase + '/volostests-mocha/cache', done);
    });
  });

  describe('Quota via remote Express', function() {
    var test = require('../../quota/test/verifyquota.js');
    test.verify(config.testUriBase + '/volostests-apigeequota');
  });

  describe('Quota SPI from inside Apigee', function() {
    this.timeout(120000);
    it('SPI test', function(done) {
      remoteMochaTest(config.testUriBase + '/volostests-mocha/quota', done);
    });
  });

  describe('OAuth via remote Express and Argo', function() {
    var test = require('../../oauth/test/rfc6749_common.js');
    test.verifyOauth(testConfig, config.testUriBase + '/volostests-apigeeoauth');
  });

});
function remoteMochaTest(uri, done) {
  agent.post(uri).end(function(err, resp) {
    if (err) {
      console.error('Mocha test error: %j', err);
      done(err);
    } else {
      console.log('Mocha test result: %s', resp.text);
      try {
        assert.equal(resp.text, '0');
        done();
      } catch (e) {
        done(e);
      }
    }
  });
}
