/* global document: true, window: true */
'use strict';

exports.version = '0.2';

exports.module = function(phantomas) {
	phantomas.setMetric('documentWriteCalls'); //@desc number of calls to either document.write or document.writeln @offenders
	phantomas.setMetric('evalCalls'); // @desc number of calls to eval (either direct or via setTimeout / setInterval) @offenders

	// spy calls to eval only when requested (issue #467)
	var spyEval = phantomas.getParam('spy-eval') === true;
	if (!spyEval) {
		phantomas.log('javaScriptBottlenecks: to spy calls to eval() run phantomas with --spy-eval option');
	}

	phantomas.once('init', function() {
		phantomas.evaluate(function(spyEval) {
			(function(phantomas) {
				function report(msg, caller, backtrace, metric) {
					phantomas.log(msg + ': from ' + caller + '!');
					phantomas.log('Backtrace: ' + backtrace);

					phantomas.incrMetric(metric);
					phantomas.addOffender(metric, "%s from %s", msg, caller);
				}

				// spy calls to eval()
				if (spyEval) {
					phantomas.spy(window, 'eval', function(code) {
						report('eval() called directly', phantomas.getCaller(), phantomas.getBacktrace(), 'evalCalls');
						phantomas.log('eval\'ed code: ' + (code || '').substring(0, 150) + '(...)');
					});
				}

				// spy calls to setTimeout / setInterval with string passed instead of a function
				phantomas.spy(window, 'setTimeout', function(fn, interval) {
					if (typeof fn !== 'string') return;

					report('eval() called via setTimeout("' + fn + '")', phantomas.getCaller(), phantomas.getBacktrace(), 'evalCalls');
				});

				phantomas.spy(window, 'setInterval', function(fn, interval) {
					if (typeof fn !== 'string') return;

					report('eval() called via setInterval("' + fn + '")', phantomas.getCaller(), phantomas.getBacktrace(), 'evalCalls');
				});

				// spy document.write(ln)
				phantomas.spy(document, 'write', function(arg) {
					report('document.write() used', phantomas.getCaller(), phantomas.getBacktrace(), 'documentWriteCalls');
				});

				phantomas.spy(document, 'writeln', function(arg) {
					report('document.writeln() used', phantomas.getCaller(), phantomas.getBacktrace(), 'documentWriteCalls');
				});
			})(window.__phantomas);
		}, spyEval);
	});
};
