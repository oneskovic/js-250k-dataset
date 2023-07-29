Clipperz.Base.module('Clipperz.PM.UI.Web.Components');

//#############################################################################

Clipperz.PM.UI.Web.Components.FaviconColumnManager = function(args) {
	args = args || {};
	Clipperz.PM.UI.Web.Components.FaviconColumnManager.superclass.constructor.call(this, args);
	
	return this;
}

//=============================================================================

Clipperz.Base.extend(Clipperz.PM.UI.Web.Components.FaviconColumnManager, Clipperz.PM.UI.Web.Components.ColumnManager, {

	'toString': function () {
		return "Clipperz.PM.UI.Web.Components.FaviconColumnManager component";
	},
	
	//-------------------------------------------------------------------------

	'renderCell': function(aRowElement, anObject) {
		var	faviconImageElement;
		var faviconUrl;
		
		faviconImageElement = this.getId('favicon');
		faviconUrl = anObject[this.name()];

		if (faviconUrl == null) {
			faviconUrl = Clipperz.PM.Strings.getValue('defaultFaviconUrl');
		}

		Clipperz.DOM.Helper.append(aRowElement, {tag:'td', cls:this.cssClass(), children:[
			{tag:'img', id:faviconImageElement, src:faviconUrl}
		]});

		MochiKit.Signal.connect(faviconImageElement, 'onload',  this, 'handleLoadedFaviconImage');
		MochiKit.Signal.connect(faviconImageElement, 'onerror', this, 'handleMissingFaviconImage');
		MochiKit.Signal.connect(faviconImageElement, 'onabort', this, 'handleMissingFaviconImage');
	},

	//-----------------------------------------------------

	'handleLoadedFaviconImage': function(anEvent) {
		MochiKit.Signal.disconnectAllTo(anEvent.src());
		if (anEvent.src().complete == false) {
			anEvent.src().src = Clipperz.PM.Strings.getValue('defaultFaviconUrl');
		}
	},

	//-----------------------------------------------------

	'handleMissingFaviconImage': function(anEvent) {
		MochiKit.Signal.disconnectAllTo(anEvent.src());
		anEvent.src().src = Clipperz.PM.Strings.getValue('defaultFaviconUrl');
	},

	//-----------------------------------------------------
	'__syntax_fix__' : 'syntax fix'
});

