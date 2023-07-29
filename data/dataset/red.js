var server = require("./server");
var nodes = require("./nodes");
var library = require("./api/library");
var comms = require("./comms");
var log = require("./log");
var util = require("./util");
var fs = require("fs");
var settings = require("./settings");
var credentials = require("./nodes/credentials");
var auth = require("./api/auth");
var path = require('path');
var events = require("events");

process.env.NODE_RED_HOME = process.env.NODE_RED_HOME || path.resolve(__dirname+"/..");

function checkBuild() {
    var editorFile = path.resolve(path.join(__dirname,"..","public","red","red.min.js"));
    try {
        var stats = fs.statSync(editorFile);
    } catch(err) {
        var e = new Error("Node-RED not built");
        e.code = "not_built";
        throw e;
    }
}

var RED = {
    init: function(httpServer,userSettings) {
        checkBuild();
        userSettings.version = this.version();
        log.init(userSettings);
        settings.init(userSettings);
        server.init(httpServer,settings);
        return server.app;
    },
    start: server.start,
    stop: server.stop,
    nodes: nodes,
    library: { register: library.register },
    credentials: credentials,
    events: events,
    log: log,
    comms: comms,
    settings:settings,
    util: util,
    auth: {
        needsPermission: auth.needsPermission
    },
    version: function () {
        var p = require(path.join(process.env.NODE_RED_HOME,"package.json")).version;
        /* istanbul ignore else */
        if (fs.existsSync(path.join(process.env.NODE_RED_HOME,".git"))) {
            p += ".git";
        }
        return p;
    },
    get app() { console.log("Deprecated use of RED.app - use RED.httpAdmin instead"); return server.app },
    get httpAdmin() { return server.app },
    get httpNode() { return server.nodeApp },
    get server() { return server.server }
};
module.exports = RED;
