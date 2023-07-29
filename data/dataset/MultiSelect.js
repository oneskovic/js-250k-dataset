Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiselect.upArrowKey.test2.MultiSelect",
    $extends : "aria.jsunit.MultiSelectTemplateTestCase",
    $dependencies : ["aria.utils.Dom"],
    $constructor : function () {
        this.$MultiSelectTemplateTestCase.constructor.call(this);
    },
    $prototype : {

        /**
         * This method is always the first entry point to a template test Start the test by opening the MultiSelect
         * popup.
         */
        runTemplateTest : function () {
            this.toggleMultiSelectOn("ms1", this.onMsOpened);
        },

        /**
         * Select the first selectable item and then close the popup using the up arrow key.
         */
        onMsOpened : function () {
            var checkBox = this.getWidgetInstance("listItem0").getDom();
            this.synEvent.type(checkBox, "[space][up]", {
                fn : this.finishTest,
                scope : this
            });
        },

        /**
         * Finalize the test, check the widgets value has been correctly updated when the up key was triggered.
         */
        finishTest : function () {
            var test = aria.utils.Dom.getElementById("test1");
            this.assertTrue(test.innerHTML === 'AF');
            this.notifyTemplateTestEnd();
        }
    }
});
