if (typeof cordova !== "undefined") {
	var LocalNotification = function() {};

	LocalNotification.prototype.add = function(options) {
		var defaults = {
			date: false,
			message: '',
			hasAction: true,
			action: 'View',
			badge: 0,
			id: 0,
			sound: '',
			background: '',
			foreground: ''
		};
		for (var key in defaults) {
			if (typeof options[key] !== "undefined") defaults[key] = options[key];
		}
		if (typeof defaults.date == 'object') {
			defaults.date = Math.round(defaults.date.getTime() / 1000);
		}
		cordova.exec(null, null, "LocalNotification", "addNotification", [defaults]);
	};

	LocalNotification.prototype.cancel = function(id) {
		cordova.exec("LocalNotification.cancelNotification", id);
	};

	LocalNotification.prototype.cancelAll = function(id) {
		cordova.exec("LocalNotification.cancelAllNotifications");
	};

	cordova.addConstructor(function() {
		if (!window.plugins) {
			window.plugins = {};
		}
		window.plugins.localNotification = new LocalNotification();
	});
}