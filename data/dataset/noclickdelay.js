function NoClickDelay(el, callback) {
	this.element = typeof el === 'object' ? el : document.getElementById(el);
	this.callback = callback;
	this.element.addEventListener('touchstart', this, false);
	this.element.addEventListener('click', this, false);
}

NoClickDelay.prototype = {
	handleEvent: function(e) {
		switch(e.type) {
			case 'touchstart': this.onTouchStart(e); break;
			case 'touchmove': this.onTouchMove(e); break;
			case 'touchend': this.onTouchEnd(e); break;
			case 'click': this.onClick(e); break;
		}
	},

	onTouchStart: function(e) {
		e.preventDefault();
		e.stopPropagation();
		this.moved = false;

		this.theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
		if(this.theTarget.nodeType === 3) {
			this.theTarget = this.theTarget.parentNode;
		}
		
		this.theTarget.className+= ' pressed';

		this.element.addEventListener('touchmove', this, false);
		this.element.addEventListener('touchend', this, false);
	},

	onTouchMove: function(e) {
		this.moved = true;
		this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
	},

	onTouchEnd: function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);

		if( !this.moved && this.theTarget ) {
			this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
			this.callback(this.theTarget);
		}

		this.theTarget = undefined;
	},
	
	onClick: function(e) {
		e.stopPropagation();
		e.preventDefault();
		return false;
	}
	
};