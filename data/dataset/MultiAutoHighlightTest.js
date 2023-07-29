Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiautocomplete.testHighlightMethods.MultiAutoHighlightTest",
    $extends : "test.aria.widgets.form.multiautocomplete.BaseMultiAutoCompleteTestCase",
    $constructor : function () {

        this.data = {
            ac_airline_values : ["India", "Singapore", "America", "France"],
            freeText : true
        };

        this.$BaseMultiAutoCompleteTestCase.constructor.call(this);

    },
    $prototype : {
        /**
         * This method is always the first entry point to a template test Start the test by focusing the first field
         */
        runTemplateTest : function () {
            var widgetInstance = this.getWidgetInstance("MultiAutoId");
            this.checkSelectedItems(4);

            widgetInstance.highlightOption(1);
            this.checkHighlightedElementsIndices([1]);
            widgetInstance.unhighlightOption();
            this.checkHighlightedElementsIndices([]);

            // Bounds
            widgetInstance.highlightOption(1);

            widgetInstance.highlightOption(0);
            this.assertErrorInLogs(widgetInstance.INDEX_OUT_OF_BOUNDS);
            this.checkHighlightedElementsIndices([1]);

            widgetInstance.highlightOption(5);
            this.assertErrorInLogs(widgetInstance.INDEX_OUT_OF_BOUNDS);
            this.checkHighlightedElementsIndices([1]);

            this.end();
        }
    }
});
