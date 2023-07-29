 
var app_pkg = lib_require("app_pkg");
var Firebase;

exports.info = {
	auth: "user"
}

exports.init = function(done){
	app_pkg.require("firebase","2.2.0",
		function(mod){
			Firebase = mod;
			done();
		}
	);

}

exports.create = function(typeInfo, user, transportDesc, callback){
	var dataRef = new Firebase('wss://developer-api.nest.com');
	dataRef.authWithCustomToken(transportDesc.token, 
		function(error, authData){
			callback(error, 
				new NestTransport(transportDesc.token, user, dataRef));
		}
	);
}

function NestTransport(token, user, dataRef){
	this.token = token;
	this.user = user;
	this.dataRef = dataRef;
}
 
NestTransport.prototype.onData = function(callback){
	this.callback = callback;
	var transport = this;
	this.dataRef.on('value', function (snapshot) {
		var data = snapshot.val();	
		var structure = firstChild(data.structures);
		var thermostat = data.devices.thermostats
								[structure.thermostats[0]];
		// TAH-361, device_id does not match the device's path ID
		thermostat.device_id = structure.thermostats[0];
		//console.log("Got nest thermostat data: " , thermostat);
		var msg = {$data:{thermostat: thermostat}};
		callback(null, msg, transport.user);
	});
}

function firstChild(object) {
	for(var key in object) {
		return object[key];
	}
}
 