Clipperz.Base.module('Clipperz.PM.UI.Web.Components');

//#############################################################################

Clipperz.PM.UI.Web.Components.ImageColumnManager = function(args) {
	args = args || {};
	Clipperz.PM.UI.Web.Components.ImageColumnManager.superclass.constructor.call(this, args);
	
	return this;
}

//=============================================================================

Clipperz.Base.extend(Clipperz.PM.UI.Web.Components.ImageColumnManager, Clipperz.PM.UI.Web.Components.ColumnManager, {

	'toString': function () {
		return "Clipperz.PM.UI.Web.Components.ImageColumnManager component";
	},
	
	//-------------------------------------------------------------------------

	'renderCell': function(aRowElement, anObject) {
		Clipperz.DOM.Helper.append(aRowElement, {tag:'td', cls:this.cssClass(), children:[
			{tag:'img', src:anObject[this.name()]}
		]});

//		return Clipperz.Async.callbacks("ImageColumnManager.renderCell", [
//			this.selector(),
//			MochiKit.Base.bind(function (aValue) {
//				Clipperz.DOM.Helper.append(aRowElement, {tag:'td', cls:this.cssClass(), children:[
//					{tag:'img', src:aValue}
//				]});
//			}, this)
//		], {trace:false}, anObject);
	},

	//-----------------------------------------------------
	'__syntax_fix__' : 'syntax fix'	
});

