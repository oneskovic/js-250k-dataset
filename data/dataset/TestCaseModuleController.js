Aria.classDefinition({
    $classpath: "test.aria.jsunit.templateTests.TestCaseModuleController",
    $extends: "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.core.Browser"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);

        this.setTestEnv({
            template : this.$package + ".MCTemplate",
            moduleCtrl : {
                classpath : this.$package + ".MCController"
            },
            data : null,
            iframe : true
        });
    },
    $prototype: {
        runTemplateTest : function () {
            // I expect the template to be loaded with a controller and a widget inside a sub-template
            this.clickAndType("writeInMe", "hello", {
                fn : this.checkType,
                scope : this
            }, true);
        },

        checkType : function () {
            if (aria.core.Browser.isPhantomJS) {
                // Incredibly enough in PhantomJS text is reversed
                this.assertEquals(this.templateCtxt.data.values.text, "olleh");
            } else {
                this.assertEquals(this.templateCtxt.data.values.text, "hello");
            }
            this.assertEquals(this.templateCtxt.moduleCtrl.countChanges(), 1, "Expecting a change event, got %1");
            this.end();
        }
    }
});
