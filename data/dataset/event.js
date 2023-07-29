var _handlers = {};

function _add(featureId, name, cb, success, fail, once) {
    var handler;
    if (featureId && name && typeof cb === "function") {
        handler = {
            func: cb,
            once: !!once
        };
        //If this is the first time we are adding a cb
        if (!_handlers.hasOwnProperty(name)) {
            _handlers[name] = [handler];
            //Do not call exec for once because its not necessary
            if (!once) {
                window.webworks.exec(success, fail, featureId, "add", {"eventName": name});
            }
        } else if (!_handlers[name].some(function (element, index, array) {
            return element.func === cb;
        })) {
            //Only add unique callbacks
            _handlers[name].push(handler);
        }
    }
}

module.exports = {
    add: function (featureId, name, cb, success, fail) {
        _add(featureId, name, cb, success, fail, false);
    },

    once: function (featureId, name, cb, success, fail) {
        _add(featureId, name, cb, success, fail, true);
    },

    isOn: function (name) {
        return !!_handlers[name];
    },

    remove: function (featureId, name, cb, success, fail) {
        if (featureId && name && typeof cb === "function") {
            if (_handlers.hasOwnProperty(name)) {
                _handlers[name] = _handlers[name].filter(function (element, index, array) {
                    return element.func !== cb || element.once;
                });

                if (_handlers[name].length === 0) {
                    delete _handlers[name];
                    window.webworks.exec(success, fail, featureId, "remove", {"eventName": name});
                }
            }
        }
    },

    trigger: function (name, args) {
        var parsedArgs;
        if (_handlers.hasOwnProperty(name)) {
            if (args && args !== "undefined") {
                parsedArgs = JSON.parse(decodeURIComponent(args));
            }
            //Call the handlers
            _handlers[name].forEach(function (handler) {
                if (handler) {
                    //args should be an array of arguments
                    handler.func.apply(undefined, parsedArgs);
                }
            });
            //Remove the once listeners
            _handlers[name] = _handlers[name].filter(function (handler) {
                return !handler.once;
            });
            //Clean up the array if it is empty
            if (_handlers[name].length === 0) {
                delete _handlers[name];
                //No need to call remove since this would only be for callbacks
            }
        }
    }
};
