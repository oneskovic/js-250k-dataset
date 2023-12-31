dojo.provide("dojox.charting.action2d.Magnify");

dojo.require("dojox.charting.action2d.Base");
dojo.require("dojox.gfx.matrix");
dojo.require("dojo.fx");


(function(){
	var DEFAULT_SCALE = 2,
		m = dojox.gfx.matrix,
		gf = dojox.gfx.fx;

	dojo.declare("dojox.charting.action2d.Magnify", dojox.charting.action2d.Base, {
		//	summary:
		//		Create an action that magnifies the object the action is applied to.

		// the data description block for the widget parser
		defaultParams: {
			duration: 400,	// duration of the action in ms
			easing:   dojo.fx.easing.backOut,	// easing for the action
			scale:    DEFAULT_SCALE	// scale of magnification
		},
		optionalParams: {},	// no optional parameters

		constructor: function(chart, plot, kwArgs){
			//	summary:
			//		Create the magnifying action.
			//	chart: dojox.charting.Chart2D
			//		The chart this action belongs to.
			//	plot: String?
			//		The plot to apply the action to. If not passed, "default" is assumed.
			//	kwArgs: dojox.charting.action2d.__MagnifyCtorArgs?
			//		Optional keyword arguments for this action.

			// process optional named parameters
			this.scale = kwArgs && typeof kwArgs.scale == "number" ? kwArgs.scale : DEFAULT_SCALE;

			this.connect();
		},

		process: function(o){
			//	summary:
			//		Process the action on the given object.
			//	o: dojox.gfx.Shape
			//		The object on which to process the magnifying action.
			if(!o.shape || !(o.type in this.overOutEvents) ||
				!("cx" in o) || !("cy" in o)){ return; }

			var runName = o.run.name, index = o.index, vector = [], anim, init, scale;

			if(runName in this.anim){
				anim = this.anim[runName][index];
			}else{
				this.anim[runName] = {};
			}

			if(anim){
				anim.action.stop(true);
			}else{
				this.anim[runName][index] = anim = {};
			}

			if(o.type == "onmouseover"){
				init  = m.identity;
				scale = this.scale;
			}else{
				init  = m.scaleAt(this.scale, o.cx, o.cy);
				scale = 1 / this.scale;
			}

			var kwArgs = {
				shape:    o.shape,
				duration: this.duration,
				easing:   this.easing,
				transform: [
					{name: "scaleAt", start: [1, o.cx, o.cy], end: [scale, o.cx, o.cy]},
					init
				]
			};
			if(o.shape){
				vector.push(gf.animateTransform(kwArgs));
			}
			if(o.oultine){
				kwArgs.shape = o.outline;
				vector.push(gf.animateTransform(kwArgs));
			}
			if(o.shadow){
				kwArgs.shape = o.shadow;
				vector.push(gf.animateTransform(kwArgs));
			}

			if(!vector.length){
				delete this.anim[runName][index];
				return;
			}

			anim.action = dojo.fx.combine(vector);
			if(o.type == "onmouseout"){
				dojo.connect(anim.action, "onEnd", this, function(){
					if(this.anim[runName]){
						delete this.anim[runName][index];
					}
				});
			}
			anim.action.play();
		}
	});
})();
