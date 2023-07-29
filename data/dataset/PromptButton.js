/** 
 * @class MAF.control.PromptButton
 * @classdesc Displays a {@link MAF.dialogs.Alert} dialog with the options of this component when selected by a user.
 * @extends MAF.control.InputButton
 */
/**
 * @cfg {String} title Title used in the dialog.
 * @memberof MAF.control.PromptButton
 */
/**
 * @cfg {String} message Message used in the dialog.
 * @memberof MAF.control.PromptButton
 */
define('MAF.control.PromptButton', function () {
	return new MAF.Class({
		ClassName: 'ControlPromptButton',

		Extends: MAF.control.InputButton,

		config: {
			title: '',
			message: 'Please select an option:'
		},

		changeValue: function (callback, value) {
			var btn = this;
			var changer = function (result) {
					callback(result.selected.value);
					btn.fire('onOptionSelected', result.selected || {});
				},
				buttons = this.getOptions().map(function (b) {
					b.callback = changer;
					return b;
				});
			new MAF.dialogs.Alert({
				title: this.config.title || this.config.label,
				message: this.config.message,
				buttons: buttons,
				focusOnCompletion: this
			}).show();
		}
	});
}, {
	ControlPromptButton: 'ControlButton',
	ControlPromptButtonSubline: 'ControlInputButtonSubline'
});
