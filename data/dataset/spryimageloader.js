var Spry; if (!Spry) Spry = {}; if (!Spry.Utils) Spry.Utils = {};

Spry.Utils.ImageLoader = function()
{
	this.queue = [];
	this.timerID = 0;
	this.currentEntry = null;
};

Spry.Utils.ImageLoader.prototype.start = function()
{
	if (!this.timerID)
	{
		var self = this;
		this.timerID = setTimeout(function()
		{
			self.timerID = 0;
			self.processQueue();
		}, 0);
	}
};

Spry.Utils.ImageLoader.prototype.stop = function()
{
	if (this.currentEntry)
	{
		var entry = this.currentEntry;
		entry.loader.onload = null;
		entry.loader.src = "";
		entry.loader = null;
		this.currentEntry = null;
		this.queue.unshift(entry);
	}

	if (this.timerID)
		clearTimeout(this.timerID);

	this.timerID = 0;
};

Spry.Utils.ImageLoader.prototype.clearQueue = function()
{
	this.stop();
	this.queue.length = 0;
};

Spry.Utils.ImageLoader.prototype.load = function(url, callback, priority)
{
	if (url)
	{
		if (typeof priority == "undefined")
			priority = 0;
		this.queue.push({ url: url, callback: callback, priority: priority });

		// Entries in the queue are sorted by priority. Those entries
		// with a higher priority are at the start of the queue, while
		// those with lower priority are pushed towards the end. If an
		// entry has the same priority as something already in the queue,
		// it gets processed in the order they were received.

		this.queue.sort(function(a,b){ return (a.priority > b.priority) ? -1 : ((a.priority < b.priority) ? 1 : 0); });
		this.start();
	}
};

Spry.Utils.ImageLoader.prototype.processQueue = function()
{
	if (this.queue.length < 1)
		return;

	var entry = this.currentEntry = this.queue.shift();
	var loader = entry.loader = new Image;
	var self = this;

	loader.onload = function()
	{
		self.currentEntry = null;
		if (entry.callback)
			entry.callback(entry.url, entry.loader);
		if (self.queue.length > 0)
			self.start();
	};

	loader.onerror = function()
	{
		// If a load fails, keep the queue going!
		self.currentEntry = null;
		if (self.queue.length > 0)
			self.start();
	};

	this.currentLoader = loader;
	loader.src = entry.url;
};