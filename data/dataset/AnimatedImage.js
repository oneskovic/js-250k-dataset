enyo.kind({
	name: "enyo.AnimatedImage",
	kind: enyo.Control,
	published: {
		imageCount: 0,
		imageHeight: 32,
		repeat: -1,
		easingFunc: enyo.easing.linear
	},
	//* @protected
	// flyweight safe animation
	playAnimation: function() {
		//this.log();
		if (this.hasNode()) {
			this.stop();
			//
			var a = this.createComponent({
				kind: "Animator",
				repeat: this.repeat,
				easingFunc: this.easingFunc,
				onAnimate: "stepAnimation",
				onStop: "stopAnimation",
				node: this.node,
				style: this.node.style
			});
			a.play();
			this.node.animation = a;
		}
	},
	stopAnimation: function(inSender) {
		inSender.node.animation = null;
		inSender.destroy();
	},
	stepAnimation: function(inSender, inValue, inProgress) {
		var i = Math.round(inProgress * (this.imageCount-1));
		var ypos = -i * this.imageHeight;
		var v = "0px " + ypos + "px";
		var ds = this.domStyles;
		ds["background-position"] = inSender.style.backgroundPosition = v;
	},
	//* @public
	//* Start the animation
	start: function() {
		this.playAnimation();
	},
	//* Stop the animation
	stop: function() {
		if (this.hasNode()) {
			var a = this.node.animation;
			if (a) {
				a.stop();
			}
		}
	}
});
