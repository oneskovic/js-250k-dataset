/**
 * Check the initialization of a SliderWidget
 */
Aria.classDefinition({
    $classpath : "test.aria.touch.widgets.SingleSliderValue",
    $extends : "aria.jsunit.WidgetTestCase",
    // Depend on drag to have synchronous creation of the widget
    $dependencies : ["aria.touch.widgets.Slider", "aria.utils.Dom", "aria.utils.dragdrop.Drag"],
    $prototype : {
        /**
         * Check that the thumbs are in the correct position after initialization
         */
        testSingleSliderCreation : function () {
            this._createWidgetAndAssert();
            this._createWidgetAndAssert(0);
            this._createWidgetAndAssert(-5, 0);
            this._createWidgetAndAssert(2.1, 1);
            this._createWidgetAndAssert(0.5, 0.5);
            this._createWidgetAndAssert(0.1, 0.1);

        },

        _createWidgetAndAssert : function (values, expected) {
            var model = {};
            if (values) {
                model.value = values;
            }
            var cfg = {
                width : 200,
                 bind: {
                    value: {
                        inside : model,
                        to : "value"
                    }
                }
            };
            var widget = this.createAndInit("aria.touch.widgets.Slider", cfg);
            if (!expected) {
                expected = 0;
            }
            this._assertValue(widget, model, expected);
            widget.$dispose();
            this.outObj.clearAll();
        },

        _assertValue : function (widget, model, expected) {
            this.assertJsonEquals(widget._value, expected, "Widget incorrect with values %1 expecting %2");
            this.assertJsonEquals(model.value, expected, "Model incorrect with values %1 expecting %2");
            var position = parseInt(aria.utils.Dom.getStyle(widget._slider, "left"), 10);
            // 15 is the size of the thumbs
            var leftPos = (widget._railWidth) * expected;
            this.assertEqualsWithTolerance(position, leftPos, 5, "Position of first is %1, expected %2");
        }
    }
});
