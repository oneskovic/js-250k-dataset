Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiautocomplete.test4.MultiAutoPrefill",
    $extends : "test.aria.widgets.form.multiautocomplete.BaseMultiAutoCompleteTestCase",
    $constructor : function () {

        this.data = {
            ac_airline_values : [],
            freeText : true
        };

        this.$BaseMultiAutoCompleteTestCase.constructor.call(this);

    },
    $prototype : {

        runTemplateTest : function () {
            this.checkSelectedItems(0);

            this.data.ac_airline_values = [{
                        label : 'Air France',
                        code : 'AF'

                    }, {
                        label : 'Air Canada',
                        code : 'AC'
                    }];
            this.templateCtxt.$refresh();
            this.checkSelectedItems(2, ["Air France", "Air Canada"]);

            this.data.freeText = false;
            this.templateCtxt.$refresh();
            this.checkSelectedItems(2, ["Air France", "Air Canada"]);

            this.data.freeText = true;
            this.data.ac_airline_values = [{
                        label : 'Air France',
                        code : 'AF'

                    }, "aaa", "bbb"];
            this.templateCtxt.$refresh();
            this.checkSelectedItems(3, ["Air France", "aaa", "bbb"]);

            this.data.freeText = false;
            this.templateCtxt.$refresh();
            this.checkSelectedItems(3, ["Air France", "aaa", "bbb"]);

            this.end();
        }
    }
});
