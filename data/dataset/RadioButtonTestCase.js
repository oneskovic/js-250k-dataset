Aria.classDefinition({
    $classpath : "test.aria.html.radioButton.ieBug.RadioButtonTestCase",
    $extends : "aria.jsunit.RobotTestCase",
    $dependencies : ["aria.utils.Dom", "aria.html.RadioButton"],
    $constructor : function () {
        this.$RobotTestCase.constructor.call(this);
        this.setTestEnv({
            data : {
                selectedValue : ""
            }
        });
    },
    $prototype : {
        runTemplateTest : function () {

            var document = Aria.$window.document;
            var selectWidgets = this.testDiv.getElementsByTagName("input");

            var widget1 = selectWidgets[0];
            var widget2 = selectWidgets[1];
            var widget3 = selectWidgets[2];

            this.assertEquals(widget1.checked, false, "Check before click on widget 1: " + widget1.checked);
            this.assertEquals(widget2.checked, false, "Check before click on widget 2: " + widget2.checked);
            this.assertEquals(widget3.checked, false, "Check before click on widget 3: " + widget3.checked);

            this.widget1 = widget1;
            this.widget2 = widget2;
            this.widget3 = widget3;

            this.synEvent.click(widget1, {
                fn : this.afterFirstClick,
                scope : this
            });
        },

        afterFirstClick : function () {

            this.assertEquals(this.widget1.checked, true, "Check after click on widget 1: " + this.widget1.checked);
            this.assertEquals(this.widget2.checked, false, "Check after click on widget 2: " + this.widget2.checked);
            this.assertEquals(this.widget3.checked, false, "Check after click on widget 3: " + this.widget3.checked);

            this.assertEquals(this.templateCtxt.data.selectedValue, "a", "Check click on data: expected value was %2 but got %1.");

            this.end();
        }

    }
});
