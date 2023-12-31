Aria.classDefinition({
    $classpath : "test.aria.html.textarea.bind.BindableTestCase",
    $extends : "aria.jsunit.RobotTestCase",
    $dependencies : ["aria.utils.Dom"],
    $constructor : function () {
        this.$RobotTestCase.constructor.apply(this, arguments);

        this.setTestEnv({
            data : {
                value : "noWhEre"
            }
        });
    },
    $prototype : {
        runTemplateTest : function () {
            var document = Aria.$window.document;

            var element = document.getElementsByTagName("textarea")[0];

            this.assertEquals(element.value, "nowhere", "Expecting to see nowhere in the widget, got " + element.value);
            aria.utils.Json.setValue(this.templateCtxt.data, "value", "");

            this.synEvent.click(element, {
                fn : this.afterFirstClick,
                scope : this,
                args : element
            });
        },

        afterFirstClick : function (_, element) {
            this.synEvent.type(element, "japan", {
                fn : this.afterType,
                scope : this,
                args : element
            });
        },

        afterType : function (_, element) {
            var outside = aria.utils.Dom.getElementById("outsideDiv");

            this.synEvent.click(outside, {
                fn : this.afterSecondClick,
                scope : this,
                args : element
            });
        },

        /**
         * Since the robot clicked typed and blurred, the value in the datamodel should be updated.
         */
        afterSecondClick : function (_, element) {
            var value = this.templateCtxt.data.value;
            this.assertEquals(value, "JAPAN", "Expecting to see JAPAN in the datamodel, got " + value);

            aria.utils.Json.setValue(this.templateCtxt.data, "value", "TOKYO");
            this.assertEquals(element.value, "tokyo", "Expecting to see tokyo in the widget, got " + element.value);

            var counter = 0;
            for (var letters in "japan") {
                var stroke = this.templateCtxt.data.keystrokes[counter];

                this.assertEquals(stroke, "japan".substring(0, counter + 1), "Key stroke " + counter
                        + " doesn't match my expectations :'(");
                counter += 1;
            }

            this.assertTrue(this.templateCtxt.data.wasBlurred, "Blur callback wasn't called");

            this.end();
        }
    }
});
