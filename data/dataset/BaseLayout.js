(function (enyo, scope) {
	
	enyo.kind(
		/** @lends enyo.BaseLayout.prototype */ {

		/**
		* @private
		*/
		name: 'enyo.BaseLayout',

		/**
		* @private
		*/
		kind: 'enyo.Layout',

		/**
		* The name of the class to apply to components that are being positioned by a 
		* [layout]{@glossary layout} strategy.
		* 
		* @type {String}
		* @default 'enyo-positioned'
		* @public
		*/
		layoutClass: 'enyo-positioned',

		/**
		* Adds or removes the `enyo-fit` class for [components]{@link enyo.Component} whose 
		* [fit]{@link enyo.Component#fit} property has been set.
		* 
		* @public
		*/
		reflow: function () {
			enyo.forEach(this.container.children, function(c) {
				if (c.fit !== null) {
					c.addRemoveClass('enyo-fit', c.fit);
				}
			}, this);
		}
	});

	//enyo.Control.prototype.layoutKind = "enyo.BaseLayout";

})(enyo, this);
