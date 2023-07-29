Ext.define('Ext.mixin.Mashup', function (Mashup) { return {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'mashup',

        extended: function (baseClass, derivedClass) {
            Mashup.process(derivedClass);
        }
    },

    statics: {
        process: function (targetClass) {
            var body = targetClass.prototype,
                requiredScripts = body.requiredScripts,
                hooks = targetClass._classHooks,
                onCreated = hooks.onCreated;

            if (requiredScripts) {
                delete body.requiredScripts;

                hooks.onCreated = function () {
                    var me = this,
                        args = Ext.Array.slice(arguments);

                    Ext.Loader.loadScripts({
                        url: requiredScripts,
                        cache: true, // no cache busting
                        onLoad: function () {
                            hooks.onCreated = onCreated;
                            hooks.onCreated.call(me, args);
                        }
                    });
                };
            }
        }
    },

    onClassMixedIn: function (targetClass) {
        Mashup.process(targetClass);
    }
}});
