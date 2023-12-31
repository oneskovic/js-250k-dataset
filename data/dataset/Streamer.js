dojo.provide("dojo.lang.timing.Streamer");
dojo.require("dojo.lang.timing.Timer");

dojo.lang.timing.Streamer = function(
	input, 
	output, 
	/* int */interval, 
	/* int */minimum,
	/* array */initialData
){
	//	summary
	//	Streamer will take an inputthat pushes N datapoints into a
	//		queue, and will pass the next point in that queue out to an
	//		outputat the passed interval; this way you can emulate
	//		a constant buffered stream of data.
	//	input: theexecuted when the internal queue reaches minimumSize
	//	output: theexecuted on internal tick
	//	interval: the interval in ms at which the outputis fired.
	//	minimum: the minimum number of elements in the internal queue.

	var self = this;
	var queue = [];

	//	public properties
	this.interval = interval || 1000;
	this.minimumSize = minimum || 10;	//	latency usually == interval * minimumSize
	this.inputFunction = input || function(q){ };
	this.outputFunction = output || function(point){ };

	//	more setup
	var timer = new dojo.lang.timing.Timer(this.interval);
	var tick = function(){
		self.onTick(self);

		if(queue.length < self.minimumSize){
			self.inputFunction(queue);
		}

		var obj = queue.shift();
		while(typeof(obj) == "undefined" && queue.length > 0){
			obj = queue.shift();
		}
		
		//	check to see if the inputneeds to be fired
		//	stop before firing the output function
		//	TODO: relegate this to the output function?
		if(typeof(obj) == "undefined"){
			self.stop();
			return;
		}

		//	call the output function.
		self.outputFunction(obj);
	};

	this.setInterval = function(/* int */ms){
		//	summary
		//	sets the interval in milliseconds of the internal timer
		this.interval = ms;
		timer.setInterval(ms);
	};

	this.onTick = function(/* dojo.lang.timing.Streamer */obj){ };
	// wrap the timer functions so that we can connect to them if needed.
	this.start = function(){
		//	summary
		//	starts the Streamer
		if(typeof(this.inputFunction) == "function" && typeof(this.outputFunction) == "function"){
			timer.start();
			return;
		}
		dojo.raise("You cannot start a Streamer without an input and an output function.");
	};
	this.onStart = function(){ };
	this.stop = function(){
		//	summary
		//	stops the Streamer
		timer.stop();
	};
	this.onStop = function(){ };

	//	finish initialization
	timer.onTick = this.tick;
	timer.onStart = this.onStart;
	timer.onStop = this.onStop;
	if(initialData){
		queue.concat(initialData);
	}
};
