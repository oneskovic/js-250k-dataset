Aria.classDefinition({
    $classpath : "test.aria.html.select.onchange.DataModelOnChangeTestCase",
    $extends : "aria.jsunit.RobotTestCase",
    $constructor : function () {
        this.$RobotTestCase.constructor.call(this);

        this.data = {
            selectedOption : "EURO",
            onChangeCalls : 0,
            onChangeOption : ""
        };
        this.setTestEnv({
            template : "test.aria.html.select.onchange.DataModelOnChangeTpl",
            data : this.data
        });

    },
    $prototype : {
        runTemplateTest : function () {
            var selectWidget = this.testDiv.getElementsByTagName("select")[0]; // we know there's only one

            this.assertEquals(selectWidget.selectedIndex, 0, "The selected Index should be %2 but was %1");

            this.synEvent.execute([["click", selectWidget], ["type", null, "[down][down][enter]\t"]], {
                fn : this.afterChange,
                scope : this
            });
        },

        afterChange : function () {
            this.assertEquals(this.data.onChangeCalls, 1, "onchange should have been called exactly once");
            this.assertEquals(this.data.selectedOption, "POUND", "Selected Option should be %2  but was %1");
            this.assertEquals(this.data.onChangeOption, "POUND", "Changed Option should be %2  but was %1");
            this.end();
        }

    }
});
