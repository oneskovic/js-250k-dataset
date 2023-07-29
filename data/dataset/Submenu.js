(function (enyo, scope) {

	
	enyo.kind(
		/** @lends  onyx.Submenu.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.Submenu',

		/**
		* @private
		*/
		defaultKind: 'onyx.MenuItem',

		/**
		* @private
		*/
		initComponents: function () {
			this.createChrome([
				{
					name: 'label',
					kind: 'enyo.Control',
					classes: 'onyx-menu-item',
					content: this.content || this.name,
					isChrome: true,
					ontap: 'toggleOpen'
				},
				{kind: 'onyx.Drawer', name: 'client', classes: 'client onyx-submenu', isChrome: true, open: false}
			]);

			this.inherited(arguments);
		},

		/**
		* Toggles the submenu's open/closed state.
		*
		* @public
		*/
		toggleOpen: function () {
			this.setOpen(!this.getOpen());
		},

		/**
		* Opens or closes the submenu.
		*
		* @param {Boolean} open - `true` to open the submenu; `false` to close it.
		* @public
		*/
		setOpen: function (open) {
			this.$.client.setOpen(open);
		},

		/**
		* Determines whether the submenu is currently open.
		*
		* @return {Boolean} - `true` if submenu is currently open; otherwise, `false`.
		* @public
		*/
		getOpen: function () {
			return this.$.client.getOpen();
		}
	});

})(enyo, this);