/**
 * Fake map provider for testing purposes
 */
Aria.classDefinition({
    $classpath : "test.aria.map.FakeMapProvider",
    $singleton : true,
    $constructor : function () {

    },
    $destructor : function () {
        this._loadCallback = null;
    },
    $prototype : {

        /**
         * @param {aria.core.CgfBeans.Callback} cb
         */
        load : function (cb) {

            var delayedCallback = aria.utils.Json.copy(cb, false);
            delayedCallback.delay = 50;
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
