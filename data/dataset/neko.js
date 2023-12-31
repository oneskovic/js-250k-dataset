(function() {
    'use strict'; // because kittens like ES5

    // Class (constructor, [base1[, base2[, ... baseN]],], [methods])
    // Class (constructor, [base1[, base2[, ... baseN]],]);
    // Class (methods)
    function Class(ctor) {
        if (is('Object', ctor)) {
            // no constructor function passed, let's fall back to a default
            return Class(null, ctor);

        } else {
            return base(arguments, ctor || function() {});
        }
    }

    var global = this; // reference to the "unbound" value of this
    function base(args, ctor) {
        var plain = false;

        // class instance constructor
        function clas() {
            // we can't simply use a plain new clas() here
            // since we might get called unbound from a child class
            // or as a constructor
            // therefore we must use the correct 'this' in that case
            if (this !== global) {
                plain ? (plain = false) : ctor.apply(this, arguments);
                return this;

            } else {
                // Case of missing new keyword, a bit hackish but still
                // better than adding another prototype layer
                return (plain = true) && clas.apply(new clas(), arguments);
            }
        }

        // closures copies of the base properties
        var properties = {};

        // constructor for sub classes e.g. Foo.init(barInstance, ...);
        clas.init = bind(ctor);

        // extend method of this class, needed to get access to the 'properties'
        // object of other classes
        clas.extend = function(obj) {
            if (is('Function', obj)) {
                // Extend the class that wants to inherit
                if (obj.hasOwnProperty('extend')) {
                    return obj.extend(properties);
                }

            } else {
                for(var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        extend(clas, properties, obj, i);
                    }
                }
            }
            return clas;
        };

        // Extend and inherit
        var i = is('Function', ctor) && ctor.hasOwnProperty('init') ? 0 : 1;
        for(var l = args.length; i < l; i++) {
            if (is('Object', args[i])) {
                clas.extend(args[i]);

            } else {
                // We're inheriting, so we need access to the other class's
                // 'properties' object, therefore, call that class which then
                // calls the extend method of this class and passes its
                // 'properties' object
                args[i].extend(clas);
            }
        }
        return clas;
    }

    function extend(clas, properties, obj, i) {
        var val = obj[i], func = is('Function', val);
        if (/^\$/.test(i)) {

            // Create unbound / static versions in cases where the property
            // name is prefixed with '$'
            clas[i] = clas.prototype[i] = func ? bind(clas, val) : val;
            properties[i] = clone(val);

        } else if (func) {
            clas[i] = bind(val);
            properties[i] = clas.prototype[i] = val;
        }
    }

    function clone(val) {
        if (is('Object', val)) {
            var obj = {};
            for(var f in val) {
                if (val.hasOwnProperty(f)) {
                    obj[f] = val[f];
                }
            }
            return obj;

        } else {
            return is('Array', val) ? val.slice() : val;
        }
    }

    function bind(caller, obj) {
        obj = obj || Function.call;
        return function() {
            return obj.apply(caller, arguments);
        };
    }

    function is(type, obj) {
        return obj !== null && obj !== undefined
               && Object.prototype.toString.call(obj).slice(8, -1) === type;
    }

    (typeof window === 'undefined' ? exports : window).Class = Class;
})();

