/**
* The Easel Javascript library provides a retained graphics mode for canvas
* including a full, hierarchical display list, a core interaction model, and
* helper classes to make working with Canvas much easier.
* @module EaselJS
**/

(function(window) {

/**
* A stage is the root level Container for a display list. Each time its tick method is called, it will render its display
* list to its target canvas.
* @class Stage
* @extends Container
* @constructor
* @param {HTMLCanvasElement} canvas The canvas the stage will render to.
**/
var RendererDOMMtxStr = function(root, surface) {
  this.initialize(root, surface);
}
var p = RendererDOMMtxStr.prototype = new Renderer();

// static properties:

// public properties:
	p.snapToPixel = true;
	p._tmpZ = 0;

// constructor:

// public methods:

	p.getSurface = function(width, height) {
		if (this.surface == null) {
			this.surface = document.createElement("div");
			this.surface.style.overflow = "hidden";
			this.surface.style.position = "absolute";
		}
		if (width) { this.surface.style.pixelWidth = width; }
		if (height) { this.surface.style.pixelHeight = height; }
		return this.surface;
	}

	/**
	* Clears the target canvas. Useful if autoClear is set to false.
	* @method clear
	**/
	p.clear = function() {
		if (!this.surface) { return; }
		this.surface.innerHTML = "";
	}

	p.render = function(displayObject, surface) {
		displayObject = displayObject || this.root;
		surface = surface || this.surface;
		this._tmpZ = 0;
		if (displayObject && surface) {
			surface.innerHTML += this._render(displayObject);
		}
	}

	p._render = function(o,mtx) {
		if (!o.isVisible()) { return ""; }

		if (mtx) {
			o._matrix.reinitialize(mtx.a,mtx.b,mtx.c,mtx.d,mtx.tx,mtx.ty,mtx.alpha,mtx.shadow,mtx.compositeOperation);
		} else {
			o._matrix.reinitialize(1,0,0,1,0,0);
		}
		mtx = o._matrix;
		mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);

		var style = "position:absolute;z-index:"+(this._tmpZ++)+";";
		style += "-webkit-transform:matrix("+mtx.a+","+mtx.b+","+mtx.c+","+mtx.d+","+mtx.tx+","+mtx.ty+") translateZ(0);";
		if (o.alpha != 1) { style += "opacity:"+o.alpha+";" }

		// render the element:
		var tag = "";
		if (o.cacheCanvas) {
			// not really possible when using strings.
		} else if (o instanceof Bitmap) {
			tag = "<img src='"+o.image.src+"' style='"+style+"'></image>";
		} else if (o instanceof Container) {
			var list = o.children.slice(0);
			for (var i=0,l=list.length; i<l; i++) {
				tag += "\n\t"+this._render(list[i],mtx);
			}
		} else if (o instanceof BitmapAnimation) {
			var frame = o.spriteSheet.getFrame(o.currentFrame);
			if (frame) {
				var rect = frame.rect;
				tag = "<div style='"+style+"background-image:url(\""+frame.image.src+"\");" +
						  "background-position:"+(-rect.x)+"px "+(-rect.y)+"px;" +
						  "width:"+rect.width+"px;height:"+rect.height+"px;'/></div>";
			}
		}
		return tag;

	}

window.RendererDOMMtxStr = RendererDOMMtxStr;
}(window));