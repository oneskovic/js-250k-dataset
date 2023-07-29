Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiautocomplete.duplicateValuesAfterError.DuplicateValuesAfterError",
    $extends : "test.aria.widgets.form.multiautocomplete.BaseMultiAutoCompleteTestCase",
    $constructor : function () {

        this.data = {
            ac_airline_values : [{
                        label : 'Air France',
                        code : 'AF'

                    }, {
                        label : 'Air Canada',
                        code : 'AC'
                    }],
            freeText : false
        };
        this.$BaseMultiAutoCompleteTestCase.constructor.call(this);

    },
    $prototype : {

        runTemplateTest : function () {
            this.checkSelectedItems(2, ["Air France", "Air Canada"]);

            this.clickAndType("o", {
                fn : this._afterWrongType,
                scope : this
            }, 25);
        },

        _afterWrongType : function () {
            this.focusOut({
                fn : this._afterFocusOut,
                scope : this
            });
        },

        _afterFocusOut : function () {
            this.clickAndType(["[right][backspace]P1", this.dropdownOpenCondition, "[enter]",
                    this.dropdownCloseCondition], {
                fn : this._afterSelectionWithEnter,
                scope : this
            }, 1);
        },

        _afterSelectionWithEnter : function () {
            this.checkSelectedItems(3, ["Air France", "Air Canada", "P1.some"]);
            this.end();
        }

    }
});
