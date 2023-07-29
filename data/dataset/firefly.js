goog.provide('firefly.init');
goog.provide('firefly.ffURL');
// goog.provide('firefly.getToken');

// goog.require('firefly.Dashboard');


firefly.init = function(dataServers, urlPathPrefix, dashboardContainer, isEmbedded) {

	var makeURL = function(path) {
		return urlPathPrefix + path;
	}

	var dashboard = new firefly.Dashboard(dataServers, makeURL, dashboardContainer, isEmbedded);
	d=dashboard;
};



(function($){
	$.fn.compare = function(t) {
		if (this.length !== t.length) {
			return false;
		}
		for (var i=0; t[i]; i++) {
			if (this[i] !== t[i]) {
				return false;
			}
		}
		return true;
	};

	$.fn.unchosen = function () {
		$(this).show().removeClass('chzn-done').removeAttr('id');
		$(this).next().remove()
		return $(this);
	};

	$.fn.inDOM = function() { return !!$(this).parents('html').length; };
}(jQuery));
