Aria.classDefinition({
    $classpath : "test.aria.templates.css.widget.DependencyTest",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Type", "aria.templates.CSSMgr", "aria.utils.Dom"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);

        this.setTestEnv({
            template : "test.aria.templates.css.widget.DependencyTemplate"
        });
    },
    $prototype : {
        runTemplateTest : function () {
            // Try to load a class that has a dependency on a css file (not a template)
            Aria.load({
                classes : ["test.aria.templates.css.widget.DependencyLoader"],
                oncomplete : {
                    fn : this.classLoaded,
                    scope : this
                },
                onerror : {
                    fn : this.handleAsyncTestError,
                    scope : this,
                    args : new Error("Aria.load failed")
                }
            });
        },

        classLoaded : function () {
            // Try to instantiate the CSS Template object that should be loaded as a dependency of the previous class
            var Css = Aria.getClassRef("test.aria.templates.css.widget.DependencyCSS");

            this.assertTrue(!!Css, "CSS dependency is not loaded");

            // Now try to put the CSS in the page
            var instance = test.aria.templates.css.widget.DependencyLoader;
            var cm = aria.templates.CSSMgr;
            cm.loadClassPathDependencies(instance.$classpath, instance.$css);

            var tag = aria.utils.Dom.getElementById(cm.__TAG_PREFX + "pool1");
            this.assertTrue(aria.utils.Type.isHTMLElement(tag));

            this.notifyTemplateTestEnd();
        }
    }
});
