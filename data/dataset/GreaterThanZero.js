define(["Tone/core/Tone", "Tone/signal/Signal", "Tone/signal/Multiply", "Tone/signal/WaveShaper"], 
function(Tone){

	"use strict";

	
	Tone.GreaterThanZero = function(){
		
		/**
		 *  @type {Tone.WaveShaper}
		 *  @private
		 */
		this._thresh = this.output = new Tone.WaveShaper(function(val){
			if (val <= 0){
				return 0;
			} else {
				return 1;
			}
		});

		/**
		 *  scale the first thresholded signal by a large value.
		 *  this will help with values which are very close to 0
		 *  @type {Tone.Multiply}
		 *  @private
		 */
		this._scale = this.input = new Tone.Multiply(10000);

		//connections
		this._scale.connect(this._thresh);
	};

	Tone.extend(Tone.GreaterThanZero, Tone.SignalBase);

	/**
	 *  dispose method
	 *  @returns {Tone.GreaterThanZero} `this`
	 */
	Tone.GreaterThanZero.prototype.dispose = function(){
		Tone.prototype.dispose.call(this);
		this._scale.dispose();
		this._scale = null;
		this._thresh.dispose();
		this._thresh = null;
		return this;
	};

	return Tone.GreaterThanZero;
});