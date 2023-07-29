(function (enyo, scope) {
	
	moon.SelectionOverlaySupport = {

		/**
		* @private
		*/
		name: 'moon.SelectionOverlaySupport',

		/**
		* @private
		*/
		classes: 'moon-selection-overlay-support',

		/**
		* URL for icon to be used in place of default icon.
		*
		* @name moon.SelectionOverlaySupport#selectionScrimIcon
		* @type {String}
		* @default undefined
		* @public
		*/

		/**
		* Vertical offset for the overlay icon, expressed as percent from the top. Will default
		* to `50` if undefined.
		*
		* @name moon.SelectionOverlaySupport#selectionOverlayVerticalOffset
		* @type {Number}
		* @default undefined
		* @public
		*/

		/**
		* Horizontal offset for the overlay icon, expressed as percent from the left or right edge.
		* The offset is measured from the left edge in left-to-right locales, and from the right in
		* right-to-left locales.
		*
		* @name moon.SelectionOverlaySupport#selectionOverlayHorizontalOffset
		* @type {Number}
		* @default undefined
		* @public
		*/

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function (sup) {
			return function () {
				sup.apply(this, arguments);
				this.createChrome(this._selectionScrim);
				this.selectionOverlayHorizontalOffset = this.selectionOverlayHorizontalOffset === undefined ? 50 : this.selectionOverlayHorizontalOffset;
				this.selectionOverlayVerticalOffset = this.selectionOverlayVerticalOffset === undefined ? 50 : this.selectionOverlayVerticalOffset;
				this.selectionOverlayHorizontalOffsetChanged();
				this.selectionOverlayVerticalOffsetChanged();
				// Allow the icon to be modified by user
				if (this.selectionScrimIcon) {
					this.$.selectionScrimIcon.set('icon','');
				}
			};
		}),

		/**
		* @private
		*/
		bindings: [
			{from: '.selectionScrimIcon', to: '.$.selectionScrimIcon.src'}
		],

		/**
		* @private
		*/
		_selectionScrim: [
			{classes: 'enyo-fit moon-selection-overlay-support-scrim', components: [
				{name:'selectionScrimIcon', kind: 'moon.Icon', small: false, icon: 'check', spotlight: false}
			]}
		],

		/**
		* @private
		*/
		selectionOverlayVerticalOffsetChanged: function () {
			this.$.selectionScrimIcon.applyStyle('top', this.selectionOverlayVerticalOffset + '%');
		},

		/**
		* @private
		*/
		selectionOverlayHorizontalOffsetChanged: function () {
			this.$.selectionScrimIcon.applyStyle('left', this.selectionOverlayHorizontalOffset + '%');
		}
	};

})(enyo, this);
