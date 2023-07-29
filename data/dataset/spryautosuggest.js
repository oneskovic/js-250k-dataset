var Spry; if (!Spry) Spry = {}; if (!Spry.Widget) Spry.Widget = {};

Spry.Widget.AutoSuggest = function(textElement, suggestRegion, queryFunc)
{
	this.textElement = Spry.$(textElement);
	this.region = Spry.$(suggestRegion);
	this.queryFunc = queryFunc;
	this.timerID = 0;
	var self = this;

	this.addEventListener(this.textElement, "keyup", function(e) { self.handleKeyUp(e); }, false);

	// Set up an observer so we can attach our cilck behaviors whenever
	// the region is regenerated.

	var regionID = this.getElementID(suggestRegion);
	Spry.Data.Region.addObserver(regionID, { onPostUpdate: function(notifier, data) {
			self.attachClickBehaviors();
	}});

	// Try and attach the behaviors now, just in case the region
	// is ready.

	this.attachClickBehaviors();
};

Spry.Widget.AutoSuggest.prototype.getElementID = function(ele)
{
	if (ele && typeof ele == "string")
		return ele;
	return ele.getAttribute("id");
};

Spry.Widget.AutoSuggest.prototype.getValue = function()
{
	if (!this.textElement)
		return "";
	return this.textElement.value;
}

Spry.Widget.AutoSuggest.prototype.setValue = function(str)
{
	if (!this.textElement)
		return;
	this.textElement.value = str;
	this.showSuggestions(false);
}

Spry.Widget.AutoSuggest.prototype.focus = function()
{
	if (!this.textElement)
		return;
	this.textElement.focus();
}

Spry.Widget.AutoSuggest.prototype.showSuggestions = function(doShow)
{
	if (this.region)
		this.region.style.display = (doShow ? "block" : "none");
};

Spry.Widget.AutoSuggest.KEY_ESC = 27;

Spry.Widget.AutoSuggest.prototype.handleKeyUp = function(e)
{
	if (this.timerID)
	{
		clearTimeout(this.timerID);
		this.timerID = null;
	}

	// If the user hit the escape key, hide the auto suggest menu!
	if (e.keyCode == Spry.Widget.AutoSuggest.KEY_ESC || !this.getValue())
	{
		this.showSuggestions(false);
		return;
	}

	var self = this;
	this.timerID = setTimeout(function() { self.timerID = null; self.queryFunc(self, self.getValue()); }, 100);
};

Spry.Widget.AutoSuggest.prototype.addEventListener = function(element, eventType, handler, capture)
{
	try
	{
		if (element.addEventListener)
			element.addEventListener(eventType, handler, capture);
		else if (element.attachEvent)
			element.attachEvent("on" + eventType, handler);
	}
	catch (e) {}
};

Spry.Widget.AutoSuggest.prototype.addClickListener =  function(node, suggestionValue)
{
	var self = this;
	this.addEventListener(node, "click", function(e) { self.setValue(suggestionValue); self.focus(); }, false);
};

Spry.Widget.AutoSuggest.prototype.attachClickBehaviors =  function()
{
	var self = this;
	var valNodes = Spry.Utils.getNodesByFunc(this.region, function(node) {
		if (node.nodeType == 1 /* Node.ELEMENT_NODE */)
		{
			var attr = node.attributes.getNamedItem("spry:suggestion");
			if (attr)
				self.addClickListener(node, attr.value);
		}
		return false;
	});
};
