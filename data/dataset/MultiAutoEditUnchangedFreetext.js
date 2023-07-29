Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiautocomplete.test5.MultiAutoEditUnchangedFreetext",
    $extends : "test.aria.widgets.form.multiautocomplete.BaseMultiAutoCompleteTestCase",
    $prototype : {

        runTemplateTest : function () {
            this.clickAndType(["b", "[enter]", "a", this.dropdownOpenCondition, "[enter]", this.dropdownCloseCondition], {
                fn : this._editValues,
                scope : this
            }, 1);
        },

        _editValues : function () {
            this.checkDataModel(2, ["b", "a"]);
            this._fireClickOnSuggestion(0, "_afterFirstClick");
        },

        _afterFirstClick : function () {
            this._fireClickOnSuggestion(0, "_afterSecondClick");
        },

        _afterSecondClick : function () {
            aria.core.Timer.addCallback({
                scope : this,
                fn : this._afterWaitSomeTime,
                delay : 10
            });
        },

        _afterWaitSomeTime : function () {
            this.checkDataModel(1, ["a"]);
            this.focusOut({
                scope : this,
                fn : this._afterFocusOut
            });
        },

        _afterFocusOut : function () {
            this.checkDataModel(2, ["b", "a"]);
            this.end();
        }

    }
});
