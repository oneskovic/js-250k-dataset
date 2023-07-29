enyo.kind({
	name:"enyo.CroppableImage",
	kind:"enyo.ScrollingImage",
	events: {
		onCrop:""
	},
	/**
	Signal the CroppableImage to return crop parameters
	*/
	getCropParams: function() {
		var zoom = this.getZoom();
		var height = this._imageHeight;
		var width = this._imageWidth;
		var bounds = this._scroller.getBounds();
		var top = this._scroller.getScrollTop();
		var left = this._scroller.getScrollLeft();
		var focusX = (left + bounds.width/2) / (width*zoom);
		var focusY = (top + bounds.height/2) / (height*zoom);
		var sizeY = bounds.height / zoom;
		var sizeX = bounds.width / zoom;
		// Keep mojo2 names, for better or for worse
		var outParams = {
			scale: zoom,
			suggestedXtop: Math.max(0,Math.round((width * focusX) - (sizeX / 2))),
			suggestedYtop: Math.max(0,Math.round((height * focusY) - (sizeY / 2))),
			suggestedScale: zoom * 100,
			suggestedXsize: Math.round(sizeX),
			suggestedYsize: Math.round(sizeY),
			sourceWidth: width,
			sourceHeight: height,
			sourceImage: enyo.makeAbsoluteUrl(window,this.src),
			focusX: focusX,
			focusY: focusY
		};
		this.doCrop(outParams);
	},
	//* @protected
	autoSize:true,
	className:"enyo-croppable-image",

});
