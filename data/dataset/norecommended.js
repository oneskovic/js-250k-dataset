XKit.extensions.norecommended = new Object({

	running: false,

	run: function() {
		this.running = true;
		XKit.post_listener.add("norecommended", XKit.extensions.norecommended.do);
		XKit.extensions.norecommended.do();
	},

	do: function() {

		var doResize = false;

		$(".post").not(".norecommended-done").each(function() {

			$(this).addClass(".norecommended-done");

			if ($(this).hasClass("is_recommended") || $(this).find(".post_info_recommended").length > 0) {
				$(this).remove();
				doResize = true;
			}

		});

		if (doResize) {
			XKit.extensions.norecommended.call_tumblr_resize();
		}

	},

	call_tumblr_resize: function() {

		XKit.tools.add_function(function() {
			Tumblr.Events.trigger("DOMEventor:updateRect");
		}, true, "");

	},

	destroy: function() {
		this.running = false;
	}

});