var dependency = require("find-dependencies")(__dirname);
var util = dependency.global.require(dependency.global.util.location);
var logger = util.webinosLogging(__filename) || console;

var PzhWebTLSCommunicator = exports;
var connection = "";
var callbackStorage = {};

PzhWebTLSCommunicator.init = function (config, webOptions, handler, cb) {
    "use strict";
    var tls = require('tls');
    webOptions.rejectUnauthorized = false;
    connection = tls.connect(config.userPref.ports.provider,
        config.metaData.serverName,
        webOptions, function () {
            if (connection.authorized) {
                logger.log("Connected to the PZH TLS server");
                cb(true, connection);
            } else {
                logger.error("connection failed " + connection.authorizationError)
            }
        });

    //connection.setEncoding("utf8");

    connection.on("data", function (_buffer) {
        util.webinosMsgProcessing.readJson(this, _buffer, function (obj) {
            var userid = obj.user.identifier || obj.user;
            if (userid in callbackStorage && callbackStorage[userid][obj.payload.type]) {
                callbackStorage[userid][obj.payload.type].success(obj.payload);
                delete callbackStorage[userid][obj.payload.type];
            }
        });
    });

    connection.on("error", function (err) {
        logger.error(err.message);
        cb(false, err);
    });

    connection.on("end", function () {
        cb(false, "Connection ended");
    });
};

PzhWebTLSCommunicator.send = function (user, message, callback) {
    "use strict";
    try {
        var jsonString, buf, realMsg = {
            user:user,
            message:message
        };
        jsonString = JSON.stringify(realMsg);
        buf = util.webinosMsgProcessing.jsonStr2Buffer(jsonString);
        connection.pause();
        connection.write(buf);
        connection.resume();
        var userid = user.identifier || user;
        if (callback && userid && realMsg.message.type) {
          if (!(userid in callbackStorage)) {
            callbackStorage[userid] = {};
          }
          callbackStorage[userid][realMsg.message.type] = callback;
        }
    } catch (err) {
        logger.error("Failed to send a message to the PZH TLS Server: " + err);
        callback.err("Failed to send a message to the PZH TLS Server");
    }
};


