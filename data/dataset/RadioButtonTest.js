Aria.classDefinition({
    $classpath : "test.aria.widgets.form.radiobutton.checkBind.test1.RadioButtonTest",
    $extends : "aria.jsunit.TemplateTestCase",
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this.data = {};
        this.setTestEnv({
            template : "test.aria.widgets.form.radiobutton.checkBind.test1.RadioButton",
            data : this.data
        });
    },
    $prototype : {

        runTemplateTest : function () {
            this.synEvent.click(this.getWidgetInstance("rb1").getDom(), {
                fn : this._afterFirstClick,
                scope : this
            });
        },

        _afterFirstClick : function () {
            this.assertTrue(this.data.value === "v1", "Value should be v1");
            this.synEvent.type(this.getWidgetInstance("rb1").getDom(), "[down]", {
                fn : this._afterFirstKey,
                scope : this
            });
        },

        _afterFirstKey : function () {
            this.assertTrue(this.data.value === "v2", "Value should be v2");
            this.synEvent.type(this.getWidgetInstance("rb2").getDom(), "[up]", {
                fn : this._afterSecondKey,
                scope : this
            });
        },

        _afterSecondKey : function () {
            this.assertTrue(this.data.value === "v1", "Value should be v1");
            aria.core.Timer.addCallback({
                fn : this._finish,
                scope : this,
                delay : 100
            });
        },

        _finish : function () {
            this.notifyTemplateTestEnd();
        }
    }
});
