Clipperz.Base.module('Clipperz.PM.UI.Common.Components');

//#############################################################################


Clipperz.PM.UI.Common.Components.ComponentSlot = function(aComponent, aSlotName) {
	this._component = aComponent;
	this._slotName = aSlotName;

	return this;
}

//=============================================================================

Clipperz.Base.extend(Clipperz.PM.UI.Common.Components.ComponentSlot, Object, {

	//-------------------------------------------------------------------------

	'slotName': function() {
		return this._slotName;
	},

	'component': function() {
		return this._component;
	},

	//-------------------------------------------------------------------------

	'setContent': function(aComponent) {
		this.component().setComponentForSlotNamed(aComponent, this.slotName());
	},

	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
	
});
