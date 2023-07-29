/**
 * Fake map provider for testing purposes
 */
Aria.classDefinition({
    $classpath : "test.aria.embed.map.TestProvider",
    $singleton : true,
    $prototype : {

        /**
         * @param {aria.core.CgfBeans.Callback} cb
         */
        load : function (cb) {

            var delayedCallback = aria.utils.Json.copy(cb, false);
            delayedCallback.delay = 500;
            aria.core.Timer.addCallback(delayedCallback);
        },

        /**
         * @return {Boolean}
         */
        isLoaded : function () {
            return false;
        },

        /**
         * @param {aria.map.CfgBeans.MapCfg} cfg
         * @return {Object} Fake map
         */
        getMap : function (cfg) {
            cfg.domElement.innerHTML = cfg.initArgs.message;
            return {
                fakeMapMethod : function () {},
                fakeMapProperty : "mapProperty"
            };
        },

        /**
         * @param {Object} map Fake map
         */
        disposeMap : function (map) {

        }
    }
});
