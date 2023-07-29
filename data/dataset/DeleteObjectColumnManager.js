Clipperz.Base.module('Clipperz.PM.UI.Web.Components');

//#############################################################################

Clipperz.PM.UI.Web.Components.DeleteObjectColumnManager = function(args) {
	args = args || {};
	Clipperz.PM.UI.Web.Components.DeleteObjectColumnManager.superclass.constructor.call(this, args);

	return this;
}

//=============================================================================

Clipperz.Base.extend(Clipperz.PM.UI.Web.Components.DeleteObjectColumnManager, Clipperz.PM.UI.Web.Components.LinkColumnManager, {

	'toString': function () {
		return "Clipperz.PM.UI.Web.Components.DeleteObjectColumnManager component";
	},

	//-------------------------------------------------------------------------

	'renderCell': function(aRowElement, anObject) {
		var tdElement;
		var linkElement;
		
		tdElement = Clipperz.DOM.Helper.append(aRowElement, {tag:'td', cls:this.cssClass(), children:[
			{tag:'div', cls:'delete', children:[
				{tag:'span', children:[
					{tag:'a', href:'delete', html:"delete"}
				]}
			]}
		]});

		linkElement = MochiKit.DOM.getFirstElementByTagAndClassName('a', null, tdElement);
//		MochiKit.Signal.connect(linkElement, 'onclick', MochiKit.Base.method(this, 'handleLinkClick', anObject['_rowObject']));
		this.connectEvent(linkElement, 'onclick', MochiKit.Base.method(this, 'handleLinkClick', anObject['_rowObject']));
	},

	//-----------------------------------------------------
	'__syntax_fix__' : 'syntax fix'
});

