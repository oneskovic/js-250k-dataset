(function() {

	if (typeof window == 'undefined' && self.importScripts) {
		// Exit if operative.js is being loaded as worker (no blob support flow);
		return;
	}

	var hasOwn = {}.hasOwnProperty;

	if (typeof define === 'function' && define.amd) {
		define( function () { return operative; });
	} else {
		window.operative = operative;
	}

	operative.pool = function(size, module, dependencies) {
		size = 0 | Math.abs(size) || 1;
		var operatives = [];
		var current = 0;

		for (var i = 0; i < size; ++i) {
			operatives.push(operative(module, dependencies));
		}

		return {
			terminate: function() {
				for (var i = 0; i < size; ++i) {
					operatives[i].destroy();
				}
			},
			next: function() {
				current = current + 1 === size ? 0 : current + 1;
				return operatives[current];
			}
		};
	};

	/**
	 * Exposed operative factory
	 */
	function operative(module, dependencies) {

		var getBase = operative.getBaseURL.bind(this);

		var OperativeContext = operative.hasWorkerSupport ? operative.Operative.BrowserWorker : operative.Operative.Iframe;

		if (typeof module == 'function') {
			// Allow a single function to be passed.
			var o = new OperativeContext({ main: module }, dependencies, getBase);
			var singularOperative = function() {
				return o.api.main.apply(o, arguments);
			};
			singularOperative.transfer = function() {
				return o.api.main.transfer.apply(o, arguments);
			};
			// Copy across exposable API to the returned function:
			for (var i in o.api) {
				if (hasOwn.call(o.api, i)) {
					singularOperative[i] = o.api[i];
				}
			}
			return singularOperative;
		}

		return new OperativeContext(module, dependencies, getBase).api;

	}

	// Indicates whether operatives will run within workers:
	operative.hasWorkerSupport = !!window.Worker;
	operative.hasWorkerViaBlobSupport = false;
	operative.hasTransferSupport = false;

	// Default base URL (to be prepended to relative dependency URLs)
	// is current page's parent dir:
	var baseURL = (
		location.protocol + '//' +
		location.hostname +
		(location.port?':'+location.port:'') +
		location.pathname
	).replace(/[^\/]+$/, '');

	/**
	 * Provide Object.create shim
	 */
	operative.objCreate = Object.create || function(o) {
		function F() {}
		F.prototype = o;
		return new F();
	};

	operative.setSelfURL = function(url) {
		opScriptURL = url;
	};

	operative.setBaseURL = function(base) {
		baseURL = base;
	};

	operative.getBaseURL = function() {
		return baseURL;
	};

}());