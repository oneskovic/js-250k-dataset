function factory(parentClient) {
    return function (prefix, options) {
        var client = parentClient.getChildClient(prefix || '');
        options = options || {};
        var timeByUrl = options.timeByUrl || false;
        var onResponseEnd = options.onResponseEnd;

        return function (req, res, next) {
            var startTime = new Date();

            // Shadow end request
            var end = res.end;
            res.end = function () {
                end.apply(res, arguments);

                client.increment('response_code.' + res.statusCode);

                // Time by URL?
                if (timeByUrl) {
                    var routeName = "unknown_express_route";

                    // Did we get a harc-coded name, or should we figure one out?
                    if (res.locals && res.locals.statsdUrlKey) {
                        routeName = res.locals.statsdUrlKey;
                    } else if (req.route && req.route.path) {
                        routeName = req.route.path;
                        if (Object.prototype.toString.call(routeName) === '[object RegExp]') {
                            // Might want to do some sanitation here?
                            routeName = routeName.source;
                        }
                        if (routeName === "/") routeName = "root";
                        routeName = req.method + '_' + routeName;
                    }

                    // Get rid of : in route names, remove first and last /,
                    // and replace rest with _.
                    routeName = 'response_time.' + routeName.replace(/:/g, "").replace(/^\/|\/$/g, "").replace(/\//g, "_");
                    client.timing(routeName, startTime);
                } else {
                    client.timing('response_time', startTime);
                }

                if (onResponseEnd) {
                    onResponseEnd(client, startTime, req, res);
                }
            };
            next();
        };
    };
}

module.exports = factory;
