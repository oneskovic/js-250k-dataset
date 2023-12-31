// TODO: Get rid of console and use something else
console.log("Using SenchaCompatibility");

(function() {

    window.Sencha = (function() {
        var isTouch, _ref, _ref1;
        isTouch = !!((_ref = Ext.getVersion("touch")) != null ? (_ref1 = _ref.version) != null ? _ref1.match(/2\./) : void 0 : void 0);
        return {
            isTouch: isTouch,
            isExtJS: !isTouch
        };
    })();

    Sencha.modelCompatibility = Sencha.isTouch ? function(x) {
        return x;
    } : function(classConfig) {
        var cfg, fs;
        if (cfg = classConfig.config) {
            if (fs = cfg.fields) {
                classConfig.fields = fs;
                delete cfg['fields'];
            }
        }
        return classConfig;
    };

    Sencha.storeCompatibility = Sencha.isTouch ? function(x) {
        return x;
    } : function(classConfig) {
        var lifted, val, _i, _len, _ref;
        if (classConfig.config) {
            _ref = ['model', 'proxy'];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                lifted = _ref[_i];
                if (val = classConfig.config[lifted]) {
                    classConfig[lifted] = val;
                    delete classConfig.config[lifted];
                }
            }
        }
        return classConfig;
    };

    Sencha.controllerCompatibility = function(classConfig) {
        var compatibleRefs, oldInit, _ref;
        compatibleRefs = function(classConfig) {
            var ref, selector, touchRefs, _ref;
            if (touchRefs = (_ref = classConfig.config) != null ? _ref.refs : void 0) {
                classConfig.refs = (function() {
                    var _results;
                    _results = [];
                    for (ref in touchRefs) {
                        selector = touchRefs[ref];
                        _results.push({
                            ref: ref,
                            selector: selector
                        });
                    }
                    return _results;
                })();
                return delete classConfig.config['refs'];
            }
        };
        classConfig = makeEventHistory(classConfig);
        if (!Sencha.isTouch) {
            compatibleRefs(classConfig);
            classConfig.getApplication = function() {
                return this.application;
            };
            if ((_ref = classConfig.config) != null ? _ref.control : void 0) {
                oldInit = classConfig.init;
                classConfig.init = function() {
                    var control, dispatch, event, eventDispatch, fn, selector, _ref1;
                    if (this.config.control) {
                        control = {};
                        _ref1 = this.config.control;
                        for (selector in _ref1) {
                            eventDispatch = _ref1[selector];
                            dispatch = {};
                            for (event in eventDispatch) {
                                fn = eventDispatch[event];
                                dispatch[event] = this[fn];
                                void 0;
                            }
                            control[selector] = dispatch;
                            void 0;
                        }
                        console.log(control);
                        this.application.control(control, void 0, this);
                        delete this.config['control'];
                    }
                    if (oldInit) {
                        return oldInit.apply(this, arguments);
                    } else {
                        return this.callParent(arguments);
                    }
                };
            }
        }
        return classConfig;
    };

}).call(this);