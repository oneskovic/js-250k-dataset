/**
 * Module dependencies.
 */

var utils = require('./../utils'),
    sys = require('sys'),
    fs = require('fs');

/**
 * Setup error handler with the given `options`.
 *
 * Options:
 *
 *   - `showStack`       respond with both the error message and stack trace. Defaults to `false`
 *   - `showMessage`     respond with the exception message only. Defaults to `false`
 *   - `dumpExceptions`  dump exceptions to stderr (without terminating the process). Defaults to `false`
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */

module.exports = function errorHandler(options){
    options = options || {};

    // Defaults
    var showStack = options.showStack,
        showMessage = options.showMessage,
        dumpExceptions = options.dumpExceptions;

    // --showErrorStack
    if (process.connectEnv.showErrorStack !== undefined) {
        showStack = utils.toBoolean(process.connectEnv.showErrorStack);
    }

    // --showErrorMessage
    if (process.connectEnv.showErrorMessage !== undefined) {
        showMessage = utils.toBoolean(process.connectEnv.showErrorMessage);
    }

    // --dumpExceptions
    if (process.connectEnv.dumpExceptions !== undefined) {
        dumpExceptions = utils.toBoolean(process.connectEnv.dumpExceptions);
    }

    return function errorHandler(err, req, res, next){
        if (dumpExceptions) {
            sys.error(err.stack);
        }
        if (showStack) {
            var accept = req.headers.accept || '';
            if (accept.indexOf('html') !== -1) {
                fs.readFile(__dirname + '/../public/style.css', function(e, style){
                    style = style.toString('ascii');
                    fs.readFile(__dirname + '/../public/error.html', function(e, html){
                        var stack = err.stack
                            .split('\n').slice(1)
                            .map(function(v){ return '<li>' + v + '</li>'; }).join('');
                        html = html
                            .toString('utf8')
                            .replace('{style}', style)
                            .replace('{stack}', stack)
                            .replace(/\{error\}/g, err.toString());
                        res.writeHead(500, { 'Content-Type': 'text/html' });
                        res.end(html);
                    });
                });
            } else if (accept.indexOf('json') !== -1) {
                var json = JSON.stringify({ error: err });
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(json);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(err.stack);
            }
        } else {
            var body = showMessage
                ? err.toString()
                : 'Internal Server Error';
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(body);
        }
    };
};
