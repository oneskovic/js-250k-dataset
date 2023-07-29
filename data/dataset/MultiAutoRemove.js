Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiautocomplete.test2.MultiAutoRemove",
    $extends : "test.aria.widgets.form.multiautocomplete.BaseMultiAutoCompleteTestCase",
    $prototype : {

        runTemplateTest : function () {
            this.clickAndType(["air", "[down][down][enter]", "fi", "[down][enter]", "a", "[down][enter]"], {
                fn : this._removeFirstItem,
                scope : this
            }, 500);

        },

        _removeFirstItem : function () {
            this.checkSelectedItems(3, ["Air Canada", "Finnair", "American Airlines"]);
            this.removeByCrossClick(0, {
                fn : this._checkFirstRemoval,
                scope : this
            });
        },

        _checkFirstRemoval : function () {
            this.checkSelectedItems(2, ["Finnair", "American Airlines"]);
            this.removeByCrossClick(0, {
                fn : this._checkSecondRemoval,
                scope : this
            });
        },

        _checkSecondRemoval : function () {
            this.checkSelectedItems(1, ["American Airlines"]);
            this.end();
        }

    }
});
