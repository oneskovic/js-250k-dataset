(function (enyo, scope) {

	
	enyo.kind(
		/** @lends onyx.Groupbox.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.Groupbox',

		/**
		* @private
		*/
		classes: 'onyx-groupbox'
	});

	/**
	* {@link onyx.GroupboxHeader} is a control designed to be placed inside an
	* {@link onyx.Groupbox}. When a header is desired, make a GroupboxHeader the
	* first control inside the Groupbox.
	*
	* ```
	* {kind: 'onyx.Groupbox', components: [
	* 	{kind: 'onyx.GroupboxHeader', content: 'Sounds'},
	* 	{content: 'Yawn'},
	* 	{content: 'Beep'}
	* ]}
	* ```
	*
	* @class  onyx.GroupboxHeader
	* @extends enyo.Control
	* @ui
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.GroupboxHeader.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.GroupboxHeader',

		/**
		* @private
		*/
		classes: 'onyx-groupbox-header'
	});

})(enyo, this);