var nodeHttp = require('http');
var util = require('util');

var httpAgent = function() {
	var lThis = this;
	var t = new nodeHttp.Agent;
	for(var a in t)
		this[a] = t[a];
	
	this.tproxy = function() {
		this.createConnection = createTproxyConnection;
	}
	
};

function createTproxyConnection() {
	var args = normalizeConnectArgs(arguments);
	
	//console.log("DEBUG: MONIP", arguments[0].localAddress);
	var fd = tproxy.newTproxyClientFD(arguments[0].localAddress, 0);
	
	arguments[0].localAddress = undefined;
	
	var s = new net.Socket({fd: fd});
	
	//var s = new net.Socket(args[0]);
	return net.Socket.prototype.connect.apply(s, args);
};

// Returns an array [options] or [options, cb]
// It is the same as the argument of Socket.prototype.connect().
function normalizeConnectArgs(args) {
	var options = {};
	if(typeof args[0] === 'object') {
		// connect(options, [cb])
		options = args[0];
	} 
	else if (isPipeName(args[0])) {
		// connect(path, [cb]);
		options.path = args[0];
	} 
	else {
		// connect(port, [host], [cb])
		options.port = args[0];
		if (typeof args[1] === 'string') {
			options.host = args[1];
		}
	}

	var cb = args[args.length - 1];
	return (typeof cb === 'function') ? [options, cb] : [options];
}

httpAgent.loader = function(gjs) { }

module.exports = httpAgent;
