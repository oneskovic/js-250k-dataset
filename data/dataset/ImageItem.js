(function (enyo, scope) {
	

	enyo.kind(
		/** @lends moon.ImageItem.prototype */ {

		/**
		* @private
		*/
		name: 'moon.ImageItem',

		/**
		* @private
		*/
		classes: 'moon-imageitem',

		/**
		* @private
		*/
		kind: 'moon.Item',

		/**
		* @private
		*/
		components:[
			{name: 'image', kind: 'enyo.Image'},
			{name: 'textItem', kind: 'moon.LabeledTextItem', spotlight: false}
		],

		/**
		* @private
		* @lends moon.ImageItem.prototype
		*/
		published: {

			/**
			* The absolute URL path to the image.
			*
			* @type {String|moon.ri.selectSrc~src}
			* @default ''
			* @public
			*/
			source: '',

			/**
			* The label to be displayed along with the text.
			*
			* @type {String}
			* @default ''
			* @public
			*/
			label: '',

			/**
			* The text to be displayed in the item.
			*
			* @type {String}
			* @default ''
			* @public
			*/
			text: '',

			/**
			* Set to `true` to align image to right of text.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			imageAlignRight: false
		},

		/**
		* @private
		*/
		bindings: [
			{from: '.allowHtml', to: '.$.textItem.allowHtml'}
		],

		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			this.sourceChanged();
			this.labelChanged();
			this.textChanged();
			this.imageAlignRightChanged();
		},

		/**
		* @private
		*/
		sourceChanged: function () {
			if (!this.source || this.source === '') {
				return;
			}
			this.$.image.setAttribute('src', enyo.path.rewrite(this.source));
		},

		/**
		* @private
		*/
		labelChanged: function () {
			this.$.textItem.setLabel(this.label);
		},

		/**
		* @private
		*/
		textChanged: function () {
			this.$.textItem.setText(this.text);
		},

		/**
		* @private
		*/
		imageAlignRightChanged: function () {
			this.addRemoveClass('align-right', this.imageAlignRight);
		}
	});

})(enyo, this);
