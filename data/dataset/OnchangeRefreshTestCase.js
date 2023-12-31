/**
 * Scenario : open autocomplete, type text, blur -> onchange will refresh. Make sure nothing breaks.
 */
Aria.classDefinition({
    $classpath : "test.aria.widgets.form.autocomplete.onchangeRefresh.OnchangeRefreshTestCase",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Function", "aria.utils.FireDomEvent"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);

        this.setTestEnv({
            template : "test.aria.widgets.form.autocomplete.onchangeRefresh.OnchangeRefreshTestCaseTpl",
            data : {
                ac_air_value : null,
                refresh : 0
            }
        });
    },
    $prototype : {
        /**
         * This method is always the first entry point to a template test Start the test by focusing the first field
         */
        runTemplateTest : function () {
            this.synEvent.click(this.getInputField("acDest"), {
                fn : function () {
                    this.waitForWidgetFocus("acDest", this.onAcFocused);
                },
                scope : this
            });
        },

        onAcFocused : function () {
            this.synEvent.type(this.getInputField("acDest"), "MAD", {
                fn : this.onAcOpened,
                scope : this
            });
        },

        onAcOpened : function () {
            this.waitFor({
                condition : function () {
                    // Wait for the dropdown to be close
                    return this.getWidgetDropDownPopup("acDest");
                },
                callback : {
                    fn : this.afterDelay,
                    scope : this
                }
            });
        },

        afterDelay : function () {
            this.templateCtxt.data.refresh = 0;
            aria.utils.FireDomEvent.fireEvent('keydown', this.getInputField("acDest"), {
                keyCode : aria.DomEvent.KC_TAB
            });
            this.waitFor({
                msg : "Waiting for data model change",
                condition : function () {
                    // Wait for the dropdown to be close
                    return this.templateCtxt.data.ac_air_value != null && this.templateCtxt.data.refresh === 1;
                },
                callback : {
                    fn : this.finishTest,
                    scope : this
                }
            });
        },

        finishTest : function () {
            this.assertTrue(this.templateCtxt.data.ac_air_value != null);
            this.assertTrue(this.templateCtxt.data.refresh === 1);
            this.notifyTemplateTestEnd();
        }
    }
});
