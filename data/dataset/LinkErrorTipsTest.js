Aria.classDefinition({
    $classpath : 'test.aria.widgets.errorTip.LinkErrorTipsTest',
    $extends : 'aria.jsunit.TemplateTestCase',
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this._errorTipsTestCaseEnv = {
            template : "test.aria.widgets.errorTip.TemplateLinkErrorTips",
            moduleCtrl : {
                classpath : 'test.aria.widgets.errorTip.ErrorTipsController'
            },
            data : null
        };
        this.setTestEnv(this._errorTipsTestCaseEnv);
    },
    $prototype : {

        runTemplateTest : function () {
            this.synEvent.click(this.getElementById('link1'), {
                fn : this._checkErrorToolTipOpen,
                scope : this
            });
        },

        _checkErrorToolTipOpen : function () {
            var linkWidget = this.getWidgetInstance('link1');
            this.assertTrue(linkWidget._cfg.error);
            this.assertTrue(!!linkWidget._onValidatePopup);
            this.finishTest();
        },

        finishTest : function () {
            this.notifyTemplateTestEnd();
        }
    }
});
