if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.PM) == 'undefined') { Clipperz.PM = {}; }
if (typeof(Clipperz.PM.DataModel) == 'undefined') { Clipperz.PM.DataModel = {}; }


//#############################################################################

Clipperz.PM.DataModel.DirectLoginFormValue = function(aDirectLogin, args) {
	args = args || {};

	this._directLogin = aDirectLogin|| Clipperz.Base.exception.raise('MandatoryParameter');

	this._key			= args.key			|| Clipperz.Base.exception.raise('MandatoryParameter');
	this._fieldOptions	= args.fieldOptions	|| Clipperz.Base.exception.raise('MandatoryParameter');
	this._value			= args.value		|| null;
	
	return this;
}

Clipperz.PM.DataModel.DirectLoginFormValue.prototype = MochiKit.Base.update(null, {

	'toString': function() {
		return "DirectLoginFormValue (" + this.key() + ", " + this.value() + ")";
	},

	//-------------------------------------------------------------------------

	'directLogin': function () {
		return this._directLogin;
	},

	//-------------------------------------------------------------------------

	'key': function() {
		return this._key;
	},

	//-------------------------------------------------------------------------

	'fieldOptions': function() {
		return this._fieldOptions;
	},

	//-------------------------------------------------------------------------

	'type': function () {
		return this.fieldOptions()['type'];
	},
	
	//-------------------------------------------------------------------------

	'value': function() {
		var	result;
		
		result = this._value;
		
//		if ((result == null) && (this.type() == 'checkbox')) {
//			result = false;
//		};
		
		return result;
	},
	
	'setValue': function (aValue) {
		this._value = aValue;
		return this.directLogin().setValue('formValues' + '.' + this.key(), aValue);
	},

	//-------------------------------------------------------------------------
/*
	'serializedData': function() {
		return this.value();
	},
*/
	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"
});

