(function (enyo, scope) {

	
	enyo.kind(
		/** @lends  onyx.PickerDecorator.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.PickerDecorator',

		/**
		* @private
		*/
		kind: 'onyx.MenuDecorator',

		/**
		* @private
		*/
		classes: 'onyx-picker-decorator',

		/**
		* @private
		*/
		defaultKind: 'onyx.PickerButton',

		/**
		* @private
		*/
		handlers: {
			onChange: 'change'
		},

		/**
		* Handles [onChange]{@link onyx.Picker#onChange} event, waterfalling
		* it down to children.
		*
		* @private
		*/
		change: function (sender, event) {
			this.waterfallDown('onChange', event);
		}
	});

})(enyo, this);