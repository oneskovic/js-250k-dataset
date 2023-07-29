if (typeof(window) !== 'undefined') {
    throw new Error('"worker.js can only be loaded in a web worker. Use the ' +
        '"worker_manager" plugin to instantiate web workers.');
}

var messageQueue = [];
var target = null;

if (typeof(bespin) === 'undefined') {
    bespin = {};
}

function pump() {
    if (messageQueue.length === 0) {
        return;
    }

    var msg = messageQueue[0];
    switch (msg.op) {
    case 'load':
        var base = msg.base;
        bespin.base = base;
        if (!bespin.hasOwnProperty('tiki')) {
            importScripts(base + "tiki.js");
        }
        if (!bespin.bootLoaded) {
            importScripts(base + "plugin/register/boot");
            bespin.bootLoaded = true;
        }

        var require = bespin.tiki.require;
        require.loader.sources[0].xhr = true;
        require.ensurePackage('::bespin', function() {
            var catalog = require('bespin:plugins').catalog;
            var Promise = require('bespin:promise').Promise;

            var pr;
            if (!bespin.hasOwnProperty('metadata')) {
                pr = catalog.loadMetadataFromURL("plugin/register/worker");
            } else {
                catalog.registerMetadata(bespin.metadata);
                pr = new Promise();
                pr.resolve();
            }

            pr.then(function() {
                require.ensurePackage(msg.pkg, function() {
                    var module = require(msg.module);
                    target = module[msg.target];
                    messageQueue.shift();
                    pump();
                });
            });
        });
        break;

    case 'invoke':
        function finish(result) {
            var resp = { op: 'finish', id: msg.id, result: result };
            postMessage(JSON.stringify(resp));
            messageQueue.shift();
            pump();
        }

        if (!target.hasOwnProperty(msg.method)) {
            throw new Error("No such method: " + msg.method);
        }

        var rv = target[msg.method].apply(target, msg.args);
        if (typeof(rv) === 'object' && rv.isPromise) {
            rv.then(finish, function(e) { throw e; });
        } else {
            finish(rv);
        }

        break;
    }
}

onmessage = function(ev) {
    messageQueue.push(JSON.parse(ev.data));
    if (messageQueue.length === 1) {
        pump();
    }
};

