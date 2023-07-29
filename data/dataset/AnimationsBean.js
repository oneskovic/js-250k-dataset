Aria.classDefinition({
    $classpath : "test.aria.utils.css.AnimationsBean",
    $extends : "aria.jsunit.TestCase",
    $dependencies : ["aria.utils.css.AnimationsBean"],
    $prototype : {
        testBean : function () {
            var document = Aria.$window.document;
            var div1 = document.createElement('div');
            var div2 = document.createElement('div');
            var validBean = {
                from : div1,
                to : div2,
                reverse : true,
                type : 1,
                hiddenClass : "not-visible"
            };

            var isValid = aria.core.JsonValidator.normalize({
                json : validBean,
                beanName : "aria.utils.css.AnimationsBean.AnimationCfg"
            }, false);
            this.assertTrue(isValid, "Valid bean invalid");

            var invalidBean = {
                nothing : "here"
            };

            isValid = aria.core.JsonValidator.normalize({
                json : invalidBean,
                beanName : "aria.utils.css.AnimationsBean.AnimationCfg"
            }, false);
            this.assertErrorInLogs(aria.core.JsonValidator.UNDEFINED_PROPERTY);
            this.assertFalse(isValid, "Invalid bean valid");
        }
    }
});
