'use strict';

var assert = require('assert'),
    fs = require('fs'),
    util = require('util');

var promise = require('../..').promise,
    isDevMode = require('../../_base').isDevMode(),
    RemoteServer = require('../../remote').SeleniumServer,
    build = require('./build');


var DEV_MODE_JAR_PATH =
    'build/java/server/src/org/openqa/grid/selenium/selenium-standalone.jar';
var SELENIUM_SERVER_JAR_ENV = 'SELENIUM_SERVER_JAR';
var PROD_MODE_JAR_PATH = process.env[SELENIUM_SERVER_JAR_ENV];


function buildServer() {
  if (process.env.SKIP_BUILD) {
    return promise.fulfilled();
  }
  return build.of('selenium-server-standalone').onlyOnce().go();
}


function getProdModeJarPath() {
  assert.ok(!!PROD_MODE_JAR_PATH,
      'You must specify the Selenium server jar to use with the ' +
      SELENIUM_SERVER_JAR_ENV + ' environment variable');
  assert.ok(fs.existsSync(PROD_MODE_JAR_PATH),
      SELENIUM_SERVER_JAR_ENV + ' does not exist: ' + PROD_MODE_JAR_PATH);
  return PROD_MODE_JAR_PATH;
}


/**
 * Manages the life and death of a Selenium server built in the current client.
 * @throws {Error} If not running dev mode and the Selenium server cannot be
 *     found on the PATH.
 * @constructor
 * @extends {RemoteServer}
 */
function Server() {
  var jarPath = isDevMode ? DEV_MODE_JAR_PATH : getProdModeJarPath();
  RemoteServer.call(this, jarPath, {
    port: 0
  });
}
util.inherits(Server, RemoteServer);


/** @override */
Server.prototype.start = function(opt_timeout) {
  var startServer = RemoteServer.prototype.start.bind(this, opt_timeout);
  if (isDevMode) {
    return buildServer().then(startServer);
  }
  return startServer();
};


// PUBLIC API


exports.Server = Server;
