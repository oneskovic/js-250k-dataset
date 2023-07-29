Aria.classDefinition({
    $classpath : "test.aria.resources.ResourcesFallback",
    $extends : "aria.jsunit.TestCase",
    $prototype : {

        testAsyncLoadClassWithResources : function () {
            this._oldLanguageSettings = aria.core.environment.Environment.getLanguage();
            aria.core.AppEnvironment.setEnvironment({
                language : {
                    "primaryLanguage" : "fr",
                    "region" : "BE"
                }
            }, {
                fn : this._afterLanguageSetting,
                scope : this
            }, true);

        },

        _afterLanguageSetting : function () {
            Aria.load({
                classes : ["test.aria.resources.ClassWithResources"],
                oncomplete : {
                    fn : this._afterClassLoad,
                    scope : this
                }
            });
        },

        _afterClassLoad : function () {
            aria.core.Timer.addCallback({
                fn : this._waitBeforeRestore,
                scope : this,
                delay : 500
            });
        },

        _waitBeforeRestore : function () {
            var parts = this._oldLanguageSettings.split("_");
            aria.core.AppEnvironment.setEnvironment({
                language : {
                    "primaryLanguage" : parts[0],
                    "region" : parts[1]
                }
            }, {
                fn : this._afterLocaleReset,
                scope : this
            });
        },

        _afterLocaleReset : function () {
            this.notifyTestEnd("testAsyncLoadClassWithResources");
        }

    }

});
