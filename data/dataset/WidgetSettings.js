Aria.classDefinition({
    $classpath : "test.aria.widgets.environment.WidgetSettings",
    $extends : "aria.jsunit.TestCase",
    $dependencies : ["aria.widgets.environment.WidgetSettings"],
    $prototype : {
        testGetSetWidgetSettings : function () {
            aria.core.AppEnvironment.setEnvironment({
                widgetSettings : {
                    directOnBlurValidation : false,
                    autoselect : true
                }
            });

            var settings = aria.widgets.environment.WidgetSettings.getWidgetSettings();
            this.assertTrue(settings.autoselect);
            this.assertFalse(settings.directOnBlurValidation);

            aria.core.AppEnvironment.setEnvironment({});

            settings = aria.widgets.environment.WidgetSettings.getWidgetSettings();
            this.assertFalse(settings.autoselect);
            this.assertTrue(settings.directOnBlurValidation);
        },

        testGetSetDialogWidgetSettings : function () {
            var settings = aria.widgets.environment.WidgetSettings.getWidgetSettings().dialog;
            this.assertTrue(settings.movable === false);
            this.assertFalse("movableProxy" in settings);

            aria.core.AppEnvironment.setEnvironment({
                widgetSettings : {
                    dialog : {
                        movable : true
                    }
                }
            });

            settings = aria.widgets.environment.WidgetSettings.getWidgetSettings().dialog;
            this.assertTrue(settings.movable === true);
            this.assertFalse("movableProxy" in settings);

            aria.core.AppEnvironment.setEnvironment({
                widgetSettings : {
                    dialog : {
                        movableProxy : {
                            type : "Overlay"
                        }
                    }
                }
            });

            settings = aria.widgets.environment.WidgetSettings.getWidgetSettings().dialog;
            this.assertTrue(settings.movable === false);
            this.assertTrue(settings.movableProxy.type == "Overlay");

            aria.core.AppEnvironment.setEnvironment({
                widgetSettings : {
                    dialog : {
                        movable : true,
                        movableProxy : {
                            type : "CloneOverlay",
                            cfg : {
                                opacity : 0.8
                            }
                        }
                    }
                }
            });

            settings = aria.widgets.environment.WidgetSettings.getWidgetSettings().dialog;
            this.assertTrue(settings.movable === true);
            this.assertJsonEquals(settings.movableProxy, {
                type : "CloneOverlay",
                cfg : {
                    opacity : 0.8
                }
            });
        }
    }
});
