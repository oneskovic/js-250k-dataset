Selectize.define('drag_drop', function(options) {
	if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
	if (this.settings.mode !== 'multi') return;
	var self = this;

	self.lock = (function() {
		var original = self.lock;
		return function() {
			var sortable = self.$control.data('sortable');
			if (sortable) sortable.disable();
			return original.apply(self, arguments);
		};
	})();

	self.unlock = (function() {
		var original = self.unlock;
		return function() {
			var sortable = self.$control.data('sortable');
			if (sortable) sortable.enable();
			return original.apply(self, arguments);
		};
	})();

	self.setup = (function() {
		var original = self.setup;
		return function() {
			original.apply(this, arguments);

			var $control = self.$control.sortable({
				items: '[data-value]',
				forcePlaceholderSize: true,
				disabled: self.isLocked,
				start: function(e, ui) {
					ui.placeholder.css('width', ui.helper.css('width'));
					$control.css({overflow: 'visible'});
				},
				stop: function() {
					$control.css({overflow: 'hidden'});
					var active = self.$activeItems ? self.$activeItems.slice() : null;
					var values = [];
					$control.children('[data-value]').each(function() {
						values.push($(this).attr('data-value'));
					});
					self.setValue(values);
					self.setActiveItem(active);
				}
			});
		};
	})();

});