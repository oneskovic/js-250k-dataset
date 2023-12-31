(function (enyo, scope) {
	

	enyo.kind(
		/** @lends moon.GridListImageItem.prototype */ {

		/**
		* @private
		*/
		name: 'moon.GridListImageItem',

		/**
		* @private
		*/
		kind: 'enyo.GridListImageItem',

		/**
		* @private
		*/
		mixins: ['moon.MarqueeSupport'],

		/**
		* @private
		*/
		spotlight: true,

		/**
		* @private
		*/
		centered: true,

		/**
		* @private
		*/
		classes: 'moon-gridlist-imageitem',

		/**
		* @private
		*/
		componentOverrides: {
			caption: {kind:'moon.MarqueeText'},
			subCaption: {kind:'moon.MarqueeText'}
		},

		/**
		* @private
		*/
		bindings: [
			{from: '.allowHtml', to: '.$.caption.allowHtml'},
			{from: '.allowHtml', to: '.$.subCaption.allowHtml'}
		],

		/**
		* @private
		*/
		handlers: {
			onSpotlightFocus: 'focused'
		},

		/**
		* @fires moon.Scroller#onRequestScrollIntoView
		* @private
		*/
		focused: function (inSender, inEvent) {
			if (inEvent.originator === this) {
				this.bubble('onRequestScrollIntoView');
			}
		}
	});

})(enyo, this);
