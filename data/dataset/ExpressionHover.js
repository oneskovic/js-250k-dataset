(function() {
	"use strict";

	var ExpressionHover = function(cm, highlighter) {
		this.initialize(cm, highlighter);
	};
	var p = ExpressionHover.prototype;

	p.cm = null;
	p.tooltip = null;
	p.highlighter = null;
	p.token = null;
	p.offset = 0;
	p.isMouseDown = false;

	p.initialize = function(cm, highlighter) {
		this.cm = cm;
		this.highlighter = highlighter;
		this.offset = highlighter.offset;

		this.tooltip = Tooltip.add(cm.display.lineDiv);
		this.tooltip.on("mousemove", this.onMouseMove, this);
		this.tooltip.on("mouseout", this.onMouseOut, this);
		
		cm.on("mousedown", $.bind(this, this.onMouseDown));
	};
	
	p.onMouseDown = function(cm, evt) {
		if (evt.which != 1 && evt.button != 1) { return; }
		this.onMouseMove(); // clear current
		this.isMouseDown = true;
		var _this = this, f, t = window.addEventListener ? window : document;
		t.addEventListener("mouseup", f = function() {
			t.removeEventListener("mouseup", f);
			_this.isMouseDown = false;
		});
	};

	p.onMouseMove = function(evt) {
		if (this.isMouseDown) { return; }
		var index, cm=this.cm, token=this.token, target = null;

		if (evt && token && (index = CMUtils.getCharIndexAt(cm, evt.clientX, evt.clientY+window.pageYOffset)) != null) {
			index -= this.offset;
			while (token) {
				if (index >= token.i && index < token.end) { target = token; break; }
				token = token.next;
			}
		}
		if (target && target.proxy) { target = target.proxy; }
		
		this.highlighter.selectToken(target);
		var rect = (index != null) && CMUtils.getCharRect(cm, index);
		if (rect) { rect.right = rect.left = evt.clientX; }
		this.tooltip.show(Docs.forToken(target), rect);
	};

	p.onMouseOut = function(evt) {
		this.highlighter.selectToken(null);
	};



window.ExpressionHover = ExpressionHover;
})();
