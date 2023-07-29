(function (enyo, scope) {
	
	enyo.kind(
		/** @lends moon.ToggleText.prototype */ {

		/**
		* @private
		*/
		name: 'moon.ToggleText',

		/**
		* @private
		*/
		kind: 'moon.Checkbox',

		/**
		* @private
		* @lends moon.ToggleText.prototype
		*/
		published: {
			/**
			* Text label for the 'on' state.
			*
			* @type {String}
			* @default 'moon.$L('on')'
			* @public
			*/
			onContent: moon.$L('on'),   // i18n 'ON' label in moon.ToggleText widget

			/**
			* Text label for the 'off' state.
			*
			* @type {String}
			* @default 'moon.$L('off')'
			* @public
			*/
			offContent: moon.$L('off'), // i18n 'OFF' label in moon.ToggleText widget

			/**
			* When `true`, the content will have locale-safe uppercasing applied.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			uppercase: true
		},

		/**
		* @private
		*/
		icon: null,

		/**
		* @private
		*/
		src: null,

		/**
		* @private
		*/
		classes: 'moon-toggle-text',

		/**
		* @private
		*/
		components: [
			{name: 'label', classes: 'moon-toggle-text-text'}
		],

		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			this.checkedChanged();
		},

		/**
		* @private
		*/
		checkedChanged: function () {
			this.inherited(arguments);
			this.$.label.setContent(this.getChecked() ? this.onContent : this.offContent);
		},

		/**
		 * src is not supported
		 *
		 * @private
		 */
		srcChanged: function () {},

		/**
		 * icon is not supported
		 *
		 * @private
		 */
		iconChanged: function () {},

		/**
		* @private
		*/
		uppercaseChanged: function () {
			this.checkedChanged();
		}
	});

})(enyo, this);
