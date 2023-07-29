/**
 * Testcase for Map embed widget
 */
Aria.classDefinition({
    $classpath : "test.aria.embed.map.MapTestOne",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.map.MapManager", "test.aria.utils.overlay.loadingIndicator.IndicatorHelper"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this._testEnv = {
            template : "test.aria.embed.map.MapTemplateOne"
        };
        this.setTestEnv(this._testEnv);
        this.mapMgr = aria.map.MapManager;
        this.mapMgr.addProvider("testProvider", "test.aria.embed.map.TestProvider");

        this.maps = {};
        this.defaultTestTimeout = 5000;

    },
    $destructor : function () {

        this.mapMgr.removeProvider("testProvider");
        this.maps = null;
        this.$TemplateTestCase.$destructor.call(this);
        this.mapMgr = null;

    },
    $prototype : {
        setUp : function () {
            this.mapMgr.$addListeners({
                "mapReady" : {
                    fn : this._getMap,
                    scope : this
                }
            });
        },

        tearDown : function () {
            this.mapMgr.$removeListeners({
                "mapReady" : {
                    fn : this._getMap,
                    scope : this
                }
            });
        },

        runTemplateTest : function () {

            aria.core.Timer.addCallback({
                fn : this._callbackOne,
                scope : this,
                delay : 100
            });
        },

        _callbackOne : function () {
            this.assertTrue(test.aria.utils.overlay.loadingIndicator.IndicatorHelper.totalOverlays() == 1);

            aria.core.Timer.addCallback({
                fn : this._callbackTwo,
                scope : this,
                delay : 1000
            });
        },

        _callbackTwo : function () {
            this.assertTrue(this.maps.firstMap !== null);
            this.assertTrue(this.maps.secondMap !== null);
            this.assertTrue(this.testDiv.innerHTML.match(/abcdefg/) !== null);
            this.assertTrue(this.testDiv.innerHTML.match(/hijklmn/) !== null);
            this.end();
        },

        _getMap : function (evt) {

            var id = evt.mapId;

            this.maps[id] = this.mapMgr.getMap(id);

        }
    }
});
