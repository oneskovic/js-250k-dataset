var Spry; if (!Spry) Spry = {}; if (!Spry.Widget) Spry.Widget = {};

Spry.Widget.ImageViewer = function(ele, options)
{
	Spry.Utils.Notifier.call(this);

	this.element = Spry.$(ele);
	this.imageSelector = "img";
	this.elementToResizeSelector = "*";
	
	this.currentEffect = null;
	this.currentLoader = null;
};

Spry.Widget.ImageViewer.prototype = new Spry.Utils.Notifier();
Spry.Widget.ImageViewer.prototype.constructor = Spry.Widget.ImageViewer;

Spry.Widget.ImageViewer.prototype.killLoader = function()
{
	if (this.currentLoader)
	{
		this.currentLoader.onload = null;
		this.currentLoader = null;
	}
};

Spry.Widget.ImageViewer.prototype.setImage = function(url)
{
	var img = Spry.$$(this.imageSelector, this.element)[0];
	if (!img) return;

	if (this.currentEffect)
	{
		this.currentEffect.stop();
		this.currentEffect = null;
	}

	this.killLoader();
	var loader = this.currentLoader = new Image;
	var self = this;

	this.notifyObservers("onPreUpdate", url);

	this.currentEffect = new Spry.Effect.Opacity(img, Spry.Effect.getOpacity(img), 0, { duration: 400,
		finish: function()
		{
			// Use an image loader to make sure we only fade in the new image after
			// it is completely loaded.
			loader.onload = function()
			{
				var w = loader.width;
				var h = loader.height;

				var eleToResize = img;
				if (self.elementToResizeSelector)
					eleToResize = Spry.Utils.getAncestor(img, self.elementToResizeSelector);

				self.currentEffect = new Spry.Effect.Size(eleToResize, Spry.Effect.getDimensions(eleToResize), { width: w, height: h, units:"px"}, {duration: 400, finish: function()
				{
					img.src = loader.src;
					loader = null;
					self.currentEffect = new Spry.Effect.Opacity(img, 0, 1, { duration: 400,
						finish: function()
						{
							self.currentEffect = null;
							
							// Our new image is fully visible now. Remove any opacity related
							// style properties on the img to workaround the IE bug that creates
							// white dots/holes in the images. Removing the properties forces
							// IE to re-render the image correctly.

							img.style.opacity = "";
							img.style.filter = "";

							// If the slide show is on, fire off the timer for the next image.

							self.notifyObservers("onPostUpdate", url);
						}});
					self.currentEffect.start();					
				}});
				self.currentEffect.start();
			};
			loader.src = url;
		}
	});
	this.currentEffect.start();
};
