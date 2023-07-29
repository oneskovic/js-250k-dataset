Aria.classDefinition({
    $classpath : "test.aria.widgets.form.select.downArrowKey.SelectTestCase",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.popups.PopupManager", "aria.core.Timer"],
    $destructor : function () {
        this.select = null;
        this.$TemplateTestCase.$destructor.call(this);
    },
    $prototype : {
        runTemplateTest : function () {
            this.select = this.getWidgetInstance("mySelect").getSelectField();
            this.synEvent.click(this.select, {
                fn : this._selectClicked,
                scope : this
            });
        },

        _selectClicked : function () {
            aria.core.Timer.addCallback({
                fn : this._afterDelay,
                scope : this,
                delay : 500
            });
        },

        _afterDelay : function () {
            this.synEvent.type(this.select, "[down][enter]", {
                fn : this._afterEnter,
                scope : this
            });
        },

        _afterEnter : function () {
            this.assertTrue(this.templateCtxt.data.value == "opt2");
            this.notifyTemplateTestEnd();
        }
    }
});
