Aria.classDefinition({
    $classpath : "test.aria.widgets.form.select.mouseWheel.SelectMouseWheelTestCase",
    $extends : "aria.jsunit.RobotTestCase",
    $dependencies : ["aria.popups.PopupManager", "aria.jsunit.Robot"],
    $prototype : {
        runTemplateTest : function () {
            var robot = aria.jsunit.Robot;
            if (robot.getRobotClasspath() == "aria.jsunit.RobotPhantomJS") {
                // The PhantomJS robot does not implement mouseWheel, so this test
                // cannot be run in that case
                this.end();
                return;
            }
            var select = this.select = this.getWidgetInstance("mySelect").getDom();
            this.synEvent.execute([["click", select], ["pause", 300]], {
                fn : this._step1,
                scope : this
            });
        },

        _step1 : function () {
            var popups = aria.popups.PopupManager.openedPopups;
            var lastPopup = this.lastPopup = popups[popups.length - 1];
            var events = [["move", {
                        to : lastPopup.domElement,
                        duration : 100
                    }, this.select]];
            var possibleEvents = [["mouseWheel", 60], ["mouseWheel", -60], ["mouseWheel", 120], ["mouseWheel", -120],
                    ["pause", 10]];
            for (var i = 0; i < 100; i++) {
                var chosenEvent = Math.floor(5 * Math.random());
                var originalEvent = possibleEvents[chosenEvent];
                events.push([originalEvent[0], originalEvent[1]]);
            }
            this.synEvent.execute(events, {
                fn : this._step2,
                scope : this
            });
        },

        _step2 : function () {
            var popups = aria.popups.PopupManager.openedPopups;
            var lastPopup = popups[popups.length - 1];
            this.assertEquals(lastPopup, this.lastPopup, "The popup was closed by mouse wheel.");
            this.end();
        }
    }
});
