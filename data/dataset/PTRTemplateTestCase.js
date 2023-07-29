Aria.classDefinition({
    $classpath : 'test.aria.dom.domcheck.PTRTemplateTestCase',
    $extends : 'aria.jsunit.TemplateTestCase',
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this.setTestEnv({
            template : "test.aria.dom.domcheck.PTRTemplate"
        });
    },
    $prototype : {
        runTemplateTest : function () {
            this._disposeTestTemplate();

            this._loadTestTemplate({
                fn : this._stepOne,
                scope : this
            });
        },

        _stepOne : function (args) {
            var global = Aria.$global;
            this.assertTrue(global.counters.dataReadyCount == 2);
            this.assertTrue(global.counters.viewReadyCount == 2);
            this.assertTrue(global.counters.displayReadyCount == 2);

            this.assertTrue(global.counters.subDataReadyCount == 2);
            this.assertTrue(global.counters.subViewReadyCount == 2);
            this.assertTrue(global.counters.subDisplayReadyCount == 2);

            this._refreshTestTemplate();

            this.assertTrue(global.counters.subDataReadyCount == 3);
            this.assertTrue(global.counters.subViewReadyCount == 3);
            this.assertTrue(global.counters.subDisplayReadyCount == 3);

            global.counters = null;
            this.notifyTemplateTestEnd();
        }
    }
});
