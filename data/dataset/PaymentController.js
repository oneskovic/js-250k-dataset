Clipperz.Base.module('Clipperz.PM.UI.Web.Controllers');

Clipperz.PM.UI.Web.Controllers.PaymentController = function(args) {
	Clipperz.PM.UI.Web.Controllers.PaymentController.superclass.constructor.apply(this, arguments);

	this._delegate = args['delegate'];
	this._referenceElement = null;
	this._paymentComponent = null;

	return this;
}

//MochiKit.Base.update(Clipperz.PM.UI.Web.Controllers.AppController.prototype, {
Clipperz.Base.extend(Clipperz.PM.UI.Web.Controllers.PaymentController, Object, {

	'toString': function() {
		return "Clipperz.PM.UI.Web.Controllers.PaymentController";
	},

	'delegate': function () {
		return this._delegate;
	},
	
	//-------------------------------------------------------------------------

	'referenceElement': function () {
		return this._referenceElement;
	},

	'setReferenceElement': function (anElement) {
		this._referenceElement = anElement;
 	},

	//-------------------------------------------------------------------------

	'paymentComponent': function () {
		if (this._paymentComponent == null) {
			var	paymentComponent = new Clipperz.PM.UI.Web.Components.PaymentComponent();

			MochiKit.Signal.connect(paymentComponent, 'cancel',		this, 'handleCancel');
			MochiKit.Signal.connect(paymentComponent, 'pay',		this, 'handlePaymentRequest');

			this._paymentComponent = paymentComponent;
		}
		
		return this._paymentComponent;
	},

	//-------------------------------------------------------------------------

	'run': function (anElement) {
		var	deferredResult;

		this.setReferenceElement(anElement);

		deferredResult = new Clipperz.Async.Deferred("PaymentController.run", {trace:false});
		deferredResult.addMethod(this.paymentComponent(), 'deferredShowModal', {openFromElement:this.referenceElement()});
		deferredResult.addMethod(this.delegate(), 'subscriptionOptions');
		deferredResult.addMethod(this.paymentComponent(), 'setSubscriptionOptions');
		deferredResult.callback();
		
		return deferredResult;
	},

	//=============================================================================

	'handlePaymentRequest': function (someOptions) {
console.log("PaymentController - handlePaymentRequest", someOptions['currency'], someOptions['type']);
		var	deferredResult;

		deferredResult = new Clipperz.Async.Deferred("PaymentController.handlePaymentRequest", {trace:false});
		deferredResult.addMethod(this.delegate(), 'getPaymentSubscriptionInfo');
		deferredResult.addCallback(function (subscriptionOptions) { return subscriptionOptions['subscription']});
		deferredResult.addMethod(this.delegate(), 'getPaymentAddress', someOptions['currency'], someOptions['type']);
		deferredResult.addMethod(this.paymentComponent(), 'showQrCode');
//		deferredResult.addCallback(function (subscriptionInfo) { console.log("SUBSCRIPTION INFO", subscriptionInfo); });
		deferredResult.callback();

		return deferredResult;
	},

	'handleCancel': function (anEvent) {
console.log("PaymentController - handleCancel");
	},
	
	//=============================================================================
	__syntaxFix__: "syntax fix"
});
