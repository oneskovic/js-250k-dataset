/**
 * Test case for test.aria.widgets.icon.fontIcon.FontIconTest
 */
Aria.classDefinition({
    $classpath : "test.aria.widgets.icon.fontIcon.FontIconTest",
    $dependencies : ["aria.widgets.Icon"],
    $extends : "aria.jsunit.WidgetTestCase",
    $prototype : {
        /**
         * Helper to destroy an icon
         * @param {Object} inst
         */
        _destroyIcon : function (inst) {
            inst.$dispose();
            this.outObj.clearAll();
        },

        /**
         * Test base layout
         */
        testAsyncFontIconTest : function () {
            var cfg = {
                icon : "std:camera-retro"
            };
            var instance = new aria.widgets.Icon(cfg, this.outObj.tplCtxt);
            instance.writeMarkup(this.outObj);
            this.outObj.putInDOM();
            // init widget
            instance.initWidget();

            var classList = instance.getDom().classList.toString();
            this.assertTrue(classList.search('fa fa-camera-retro') !== -1, 'The css classes were not added to the icon');
            this._destroyIcon(instance);
            this.notifyTestEnd("testAsyncFontIconTest");
        }
    }
});
