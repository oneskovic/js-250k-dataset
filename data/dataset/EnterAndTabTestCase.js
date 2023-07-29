Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiautocomplete.enterAndTab.EnterAndTabTestCase",
    $extends : "test.aria.widgets.form.multiautocomplete.BaseMultiAutoCompleteTestCase",
    $constructor : function () {
        this.$BaseMultiAutoCompleteTestCase.constructor.call(this);

        // setTestEnv has to be invoked before runTemplateTest fires
        this.setTestEnv({
            template : "test.aria.widgets.form.multiautocomplete.enterAndTab.EnterAndTabTpl",
            data : this.data
        });

    },
    $prototype : {
        /**
         * This test is here to be sure that 'tab', defined as a selection key, behaves the same way as 'enter' (the
         * first list item is selected)
         */
        runTemplateTest : function () {
            this.clickAndType(["fi", this.dropdownOpenCondition], {
                fn : this._pressTab,
                scope : this
            }, 1);
        },

        _pressTab : function () {
            this.type({
                text : ["[TAB]"],
                cb : {
                    fn : this._checkValues,
                    scope : this
                }
            });
        },

        _checkValues : function () {
            this.checkSelectedItems(1, ["Finnair"]);
            this.checkDataModel(1, [{
                        label : 'Finnair',
                        code : 'XX'
                    }]);

            this.end();
        }

    }
});
