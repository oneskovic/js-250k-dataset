Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiautocomplete.test5.MultiAutoEdit",
    $extends : "test.aria.widgets.form.multiautocomplete.BaseMultiAutoCompleteTestCase",
    $dependencies : ["aria.utils.FireDomEvent"],
    $prototype : {

        runTemplateTest : function () {
            this.clickAndType(["a", this.dropdownOpenCondition, "[down][down][enter]", this.dropdownCloseCondition,
                    "air", this.dropdownOpenCondition, "[down][down][enter]", this.dropdownCloseCondition], {
                fn : this._editValues,
                scope : this
            }, 1);
        },

        _editValues : function () {
            var element = this._getSelectedItemElement(0).firstChild;
            // to simulate double click
            aria.utils.FireDomEvent.fireEvent('dblclick', element, {});
            this.synEvent.click(this._getField(), {
                fn : this._onAfterUserAction,
                scope : this
            });
        },

        _onAfterUserAction : function () {
            this.getWidgetInstance("MultiAutoId").setCaretPosition(11, 11);
            this.type({
                text : ["[backspace][backspace][backspace][backspace][backspace][backspace][backspace]",
                        this.dropdownOpenCondition, "[down][down][enter]", this.dropdownCloseCondition],
                cb : {
                    fn : this._checkValue,
                    scope : this
                },
                delay : 1
            });
        },

        _checkValue : function () {
            this.checkSelectedItems(2, ["Air Canada", "Scandinavian Airlines System"]);
            this.end();
        }

    }
});
