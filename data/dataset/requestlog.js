var Logger = require('./logger');

var crypto = require('crypto');

exports.formatTimestamp = Logger.formatTimestamp;
exports.levelNames = Logger.levelNames;

function randomString() {
    return crypto.pseudoRandomBytes(12).toString('base64');
}

var stackRegex = new RegExp("Error.+?\t.+?\t.+?\t +?at (.+?)\t.+");

var extractCalledFromStack = function () {
  var stack = new Error().stack;
  stack = stack.replace(/\n/g, "\t");

  var r = stackRegex.exec(stack);

  if (r == null) {
    return "";
  }
  return r[1];
};


var logMessage = function (level, req, msg) {

  var line = extractCalledFromStack();

  req.log.writer(level, req.log.id, line, msg);
};


exports.factory = function (writer) {
  return function (req, res, next) {

    var id = randomString();

    req.log = {
      log:function () {
        logMessage(Logger.Logger.LOG_DEBUG, req, Logger.format.apply(this, arguments));
      },
      info:function () {
        logMessage(Logger.Logger.LOG_INFO, req, Logger.format.apply(this, arguments));
      },
      warn:function () {
        logMessage(Logger.Logger.LOG_WARNING, req, Logger.format.apply(this, arguments));
      },
      error:function () {
        logMessage(Logger.Logger.LOG_ERROR, req, Logger.format.apply(this, arguments));
      },
      critical:function () {
        logMessage(Logger.Logger.LOG_CRITICAL, req, Logger.format.apply(this, arguments));
      },
      id:id,
      writer:writer
    };

    next();
  };

};


