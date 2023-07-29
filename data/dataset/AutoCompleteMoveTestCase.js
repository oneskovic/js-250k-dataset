Aria.classDefinition({
    $classpath : "test.aria.widgets.form.autocomplete.popupposition.AutoCompleteMoveTestCase",
    $extends : "aria.jsunit.RobotTestCase",
    $dependencies : ["aria.popups.PopupManager", "aria.utils.Dom"],
    $constructor : function () {
        this.$RobotTestCase.constructor.call(this);
        this.setTestEnv({
            template : "test.aria.widgets.form.autocomplete.popupposition.AutoCompleteMove"
        });

    },
    $prototype : {

        runTemplateTest : function () {
            var self = this;
            var field = this.getInputField("ac");
            this.synEvent.execute([["click", field], ["type", field, "ab"], ["pause", 1000]], {
                fn : "_afterTyping",
                scope : this
            });
        },

        _afterTyping : function () {
            // checking the position of the popup
            var openedPopups = aria.popups.PopupManager.openedPopups;
            this.assertTrue(openedPopups.length == 1, "There is not exactly one popup opened.");
            var popup = openedPopups[0];
            var position = aria.utils.Dom.calculatePosition(popup.domElement);

            var underAutoCompleteElt = this.getElementById("underAutoComplete");
            var underAutoCompletePosition = aria.utils.Dom.calculatePosition(underAutoCompleteElt);

            var topDiff = Math.abs(position.top - underAutoCompletePosition.top);
            this.assertTrue(topDiff < 3, "The popup is not correctly positioned.");
            this.notifyTemplateTestEnd();
        }

    }
});
