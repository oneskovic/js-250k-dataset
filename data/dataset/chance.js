module.exports = function(queen){
	function onHttpServerReady(){
		var numberToFind = 42,
			maxNumber = 10000;

		var workforce = queen({
			run: ['http://localhost:9300'],
			populate: "continuous",
			killOnStop: false,
			uniqueness: function(browser){
				return browser.family;
			},
			handler: workerHandler
		});

		function workerHandler(worker){
			worker(maxNumber);
			
			worker.on("message", function(guessedNumber){
				console.log(guessedNumber + " \t guessed by " + worker.provider.attributes.name);
				if(guessedNumber === numberToFind){
					workforce.kill();	
					console.log("Done! The winner was " + worker.provider.attributes.name);
					queen.kill();
				}
			});
		}
	};

	// This spawns a basic http server which just serves the client-side script.
	// This is done just to keep everything in the example inside one file,
	// in real life, you should serve your scripts out of a more respectable server.
	var theClientScript = "" +
	"	queenSocket.onMessage = function(maxNumber){				"+
	"		setInterval(function(){									"+
	"			var guess = Math.floor(Math.random() * maxNumber);	"+
	"			queenSocket(guess);									"+
	"		}, 100);												"+
	"	};															";

	var http = require('http');

	var server = http.createServer(function(request, response){
		response.end(theClientScript);
	}).listen(9300, onHttpServerReady);
};
