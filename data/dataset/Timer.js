dojo.provide("dojo.lang.timing.Timer");
dojo.require("dojo.lang.func");

dojo.lang.timing.Timer = function( erval){
	// summary: Timer object executes an "onTick()" method repeatedly at a specified erval. 
	//			repeatedly at a given erval.
	// erval: Interval between function calls, in milliseconds.
	this.timer = null;
	this.isRunning = false;
	this.erval = erval;

	this.onStart = null;
	this.onStop = null;
};

dojo.extend(dojo.lang.timing.Timer, {
	onTick : function(){
		// summary: Method called every time the erval passes.  Override to do something useful.
	},
		
	setInterval : function(erval){
		// summary: Reset the erval of a timer, whether running or not.
		// erval: New erval, in milliseconds.
		if (this.isRunning){
			dj_global.clearInterval(this.timer);
		}
		this.erval = erval;
		if (this.isRunning){
			this.timer = dj_global.setInterval(dojo.lang.hitch(this, "onTick"), this.erval);
		}
	},
	
	start : function(){
		// summary: Start the timer ticking.
		// description: Calls the "onStart()" handler, if defined.
		// 				Note that the onTick() function is not called right away, 
		//				only after first erval passes.
		if (typeof this.onStart == "function"){
			this.onStart();
		}
		this.isRunning = true;
		this.timer = dj_global.setInterval(dojo.lang.hitch(this, "onTick"), this.erval);
	},
	
	stop : function(){
		// summary: Stop the timer.
		// description: Calls the "onStop()" handler, if defined.
		if (typeof this.onStop == "function"){
			this.onStop();
		}
		this.isRunning = false;
		dj_global.clearInterval(this.timer);
	}
});
