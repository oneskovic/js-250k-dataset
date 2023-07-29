Aria.classDefinition({
    $classpath : "test.aria.templates.css.inheritance.InheritTestCase",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Array", "aria.utils.Dom"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);

        this.setTestEnv({
            template : "test.aria.templates.css.inheritance.Inherit",
            data : {
                step : 0
            }
        });
    },
    $prototype : {
        runTemplateTest : function () {
            // The initial step is 0 so there must be a select with an icon
            var cm = aria.templates.CSSMgr;
            var arrayUtil = aria.utils.Array;
            var selectBoxStyle = "aria.widgets.form.SelectBoxStyle";
            var textInputStyle = "aria.widgets.form.TextInputStyle";
            var iconStyle = "aria.widgets.IconStyle";

            // Check that the inherited dependencies are loaded
            this.assertTrue(arrayUtil.contains(cm.__pathsLoaded, selectBoxStyle), "SelectBox missing in pathsLoaded");
            this.assertTrue(arrayUtil.contains(cm.__pathsLoaded, textInputStyle), "TextInput missing in pathsLoaded");
            this.assertTrue(arrayUtil.contains(cm.__pathsLoaded, iconStyle), "Icon missing in pathsLoaded");

            this.assertTrue(!!cm.__cssUsage[selectBoxStyle], "SelectBox missing in cssUsage");
            this.assertTrue(!!cm.__cssUsage[textInputStyle], "TextInput missing in cssUsage");
            this.assertTrue(!!cm.__cssUsage[iconStyle], "Icon missing in cssUsage");

            this.assertTrue(!!cm.__textLoaded[selectBoxStyle], "SelectBox missing in textLoaded");
            this.assertTrue(!!cm.__textLoaded[textInputStyle], "TextInput missing in textLoaded");
            this.assertTrue(!!cm.__textLoaded[iconStyle], "Icon missing in textLoaded");

            // Trigger a refresh
            // Call a refresh
            this.synEvent.click(aria.utils.Dom.getElementById("next"), {
                fn : this.__state1,
                scope : this
            });
        },

        __state1 : function () {
            // The selectbox should be unloaded, and so the widget dependencies
            var cm = aria.templates.CSSMgr;
            var arrayUtil = aria.utils.Array;
            var selectBoxStyle = "aria.widgets.form.SelectBoxStyle";
            var textInputStyle = "aria.widgets.form.TextInputStyle";
            var iconStyle = "aria.widgets.IconStyle";

            // Check that the inherited dependencies are loaded
            this.assertFalse(arrayUtil.contains(cm.__pathsLoaded, selectBoxStyle), "SelectBox present in pathsLoaded");
            this.assertFalse(arrayUtil.contains(cm.__pathsLoaded, textInputStyle), "TextInput present in pathsLoaded");
            this.assertFalse(arrayUtil.contains(cm.__pathsLoaded, iconStyle), "Icon present in pathsLoaded");

            this.assertFalse(!!cm.__cssUsage[selectBoxStyle], "SelectBox present in cssUsage");
            this.assertFalse(!!cm.__cssUsage[textInputStyle], "TextInput present in cssUsage");
            this.assertFalse(!!cm.__cssUsage[iconStyle], "Icon present in cssUsage");

            this.assertFalse(!!cm.__textLoaded[selectBoxStyle], "SelectBox present in textLoaded");
            this.assertFalse(!!cm.__textLoaded[textInputStyle], "TextInput present in textLoaded");
            this.assertFalse(!!cm.__textLoaded[iconStyle], "Icon present in textLoaded");

            this.notifyTemplateTestEnd();
        }
    }
});
