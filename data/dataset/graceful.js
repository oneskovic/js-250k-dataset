var fs = require('fs');
var graceful = function(gjs) { };

graceful.push = function(socket) {
	socket.gfId = graceful.sockets.push(socket);
	socket.inUse = false;
	
	graceful.stats.diffuse([
		{
			name: 'gracefulActiveConnections',
			action: graceful.stats.action.add,
			value: 1
		},
		{
			name: 'gracefulAccepts',
			action: graceful.stats.action.add,
			value: 1
		},
	]);
}

graceful.release = function(socket) {
	graceful.sockets.splice(socket.gdId, 1);
	graceful.stats.diffuse(
		'gracefulActiveConnections',
		graceful.stats.action.sub,
		1
	);
}

graceful.loader = function(gjs) { 
	graceful.gjs = gjs;
	graceful.stats = gjs.lib.core.stats;
	graceful.sockets = [];
	
	function gracefulAgentControler() {
		if(graceful.sockets.length == 0) {
// 			console.log('Process #'+process.pid+' graceful completed');
			process.exit(0);
		}
		
// 		console.log('Graceful agent controler has '+graceful.sockets.length+' sockets in queue');
		process.title = 'gate.js Graceful '+graceful.sockets.length+' sockets remaining';
		for(var a in graceful.sockets) {
			var s = graceful.sockets[a];
			if(s.inUse != true) {
				graceful.stats.diffuse(
					'gracefulActiveConnections',
					graceful.stats.action.sub,
					1
				);
				s.destroy();
			}
// 			else
// 				console.log(
// 					'Waiting for connection to be destroyed '+
// 					s._peername.address+':'+s._peername.port+
// 					' in process '+process.pid);
		}
	}
	
	gjs.lib.core.ipc.on('system:graceful:process', function() {
		gjs.lib.core.ipc.removeListener('system:graceful:process', this);
		setInterval(gracefulAgentControler, 1000);
	});
	
	gjs.lib.core.ipc.on('system:graceful:force', function() {
		process.exit(0);
	});
	
}

module.exports = graceful;


