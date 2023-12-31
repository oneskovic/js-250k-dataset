var util = require('util');
var net = require('net');
var Parser = require('parser').Parser;
var ClientRequest = require('http').ClientRequest;
var ServerResponse = require('http').ServerResponse;

var debug;
if (process.env.NODE_DEBUG && /fastcgi/.test(process.env.NODE_DEBUG)) {
    debug = function (x) { console.error('FASTCGI: %s', x); };
} else {
    debug = function () { };
}

function connectionListener(socket) {
    var self = this;

    var incoming = [];
    var outgoing = [];

    debug('SERVER new fastcgi connection');

    socket.setTimeout(2 * 60 * 1000);

    var parser = new Parser(socket);

    parser.onError = function (error) {
        console.log('error');
        console.log(error);
    };

    parser.onHeadersComplete = function (recordId, records) {
        debug('completed request ' + recordId);
        debug('got ' + records.length + ' records');
        
        var incoming = new ClientRequest(parser.socket);
        var keepAlive = false;

        for (var i=0; i< records.length; i++) {
            if (records[i].header.type == parser.FCGI_PARAMS) {
                for (key in records[i].body.params) {
                    var param = key.toLowerCase().replace('_','-');
                    var value = records[i].body.params[key];

                    if (param == 'server-protocol') {
                        var version = value.split('/',2);
                        incoming.httpVersionMajor = version[0];
                        incoming.httpVersionMinor = version[1];
                        incoming.httpVersion = version[0] + '.' + version[1];
                    } else if (param == 'document-uri') {
                        incoming.url =  value;
                    } else if (param == 'request-method') {
                        incoming.method = value;
                    } else if (param == 'http-connection') {
                        keepAlive = value.search('keep-alive') > 0;
                    }

                    incoming._addHeaderLine(param, value);
                }
            }
        }

        parser.onIncoming(incoming, keepAlive);
    }


    parser.onIncoming = function (req, keepAlive) {
        var res = new ServerResponse(req);
        res.shouldKeepAlive = keepAlive;
        var socket = parser._socket;
        res.assignSocket(parser.socket);
        res.pipe(process.stdout);
        res.on('finish', function () {
            res.detachSocket(parser.socket);
            parser.socket.destroySoon();
        });

        self.emit('request', req, res);
    }

    socket.ondata = function (d, start, end) {
        debug('SERVER ondata');
        var ret = parser.execute(d, start, end - start);
        if (ret instanceof Error) {
            debug('SERVER parse error');
            socket.destroy(ret);
        }
    };

    socket.onend = function () {
        debug('SERVER onend');
        socket.destroy();
    }

    socket.addListener('timeout', function () {
        socket.destroy();
    });

    socket.addListener('error', function (e) {
        this.emit('clientError', e);
    });

    socket.addListener('close', function () {
        debug('SERVER close');
    });
}

function Server(requestListener) {
    if (!(this instanceof Server)) {
        return new Server(requestListener);
    }

    if (requestListener) {
        this.addListener('request', requestListener);
    }

    this.addListener('connection', connectionListener);
}

util.inherits(Server, net.Server);

exports.Server = Server;

exports.createServer = function (requestListener) {
    return new Server(requestListener);
}

