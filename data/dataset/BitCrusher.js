define(["Tone/core/Tone", "Tone/effect/Effect", "Tone/signal/Subtract", "Tone/signal/Modulo"], 
function(Tone){

	"use strict";

	
	Tone.BitCrusher = function(){

		var options = this.optionsObject(arguments, ["bits"], Tone.BitCrusher.defaults);
		Tone.Effect.call(this, options);

		var invStepSize = 1 / Math.pow(2, options.bits - 1);

		/**
		 *  Subtract the input signal and the modulus of the input signal
		 *  @type {Tone.Subtract}
		 *  @private
		 */
		this._subtract = new Tone.Subtract();

		/**
		 *  The mod function
		 *  @type  {Tone.Modulo}
		 *  @private
		 */
		this._modulo = new Tone.Modulo(invStepSize);

		/**
		 *  keeps track of the bits
		 *  @type {number}
		 *  @private
		 */
		this._bits = options.bits;

		//connect it up
		this.effectSend.fan(this._subtract, this._modulo);
		this._modulo.connect(this._subtract, 0, 1);
		this._subtract.connect(this.effectReturn);
	};

	Tone.extend(Tone.BitCrusher, Tone.Effect);

	/**
	 *  the default values
	 *  @static
	 *  @type {Object}
	 */
	Tone.BitCrusher.defaults = {
		"bits" : 4
	};

	/**
	 * The bit depth of the BitCrusher
	 * @memberOf Tone.BitCrusher#
	 * @type {number}
	 * @name bits
	 */
	Object.defineProperty(Tone.BitCrusher.prototype, "bits", {
		get : function(){
			return this._bits;
		},
		set : function(bits){
			this._bits = bits;
			var invStepSize = 1 / Math.pow(2, bits - 1);
			this._modulo.value = invStepSize;
		}
	});

	/**
	 *  clean up
	 *  @returns {Tone.BitCrusher} `this`
	 */
	Tone.BitCrusher.prototype.dispose = function(){
		Tone.Effect.prototype.dispose.call(this);
		this._subtract.dispose();
		this._subtract = null;
		this._modulo.dispose();
		this._modulo = null;
		return this;
	}; 

	return Tone.BitCrusher;
});