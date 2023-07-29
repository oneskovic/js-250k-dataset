Aria.classDefinition({
    $classpath : "test.aria.templates.view.ViewTest",
    $dependencies : ["aria.templates.View"],
    $extends : "aria.jsunit.TemplateTestCase",
    $prototype : {

        runTemplateTest : function () {
            this.changeInitialArrayTest();
            this.dummyViewTest();
            this.end();
        },

        dummyViewTest : function () {
            // only happens with IE when creating views with a null element in an array
            if (this.templateCtxt._tpl.dummyview.initialArray.length === 3) {
                this.assertErrorInLogs(this.templateCtxt._tpl.dummyview.UNDEFINED_ARRAY_ELEMENT, 1);
            }
            this.templateCtxt._tpl.dummyview.$dispose();
        },

        //
        changeInitialArrayTest : function () {
            var tpl = this.templateCtxt._tpl;
            // check if initial array has 3 items
            this.assertEquals(tpl.changeArrayView.items.length, tpl.testArray.length);
            this.assertJsonEquals(tpl.testArray, ["a", "b", "c"]);

            var newArray = ["d"];
            tpl.testArray = newArray;

            // test the error when argument is invalid
            tpl.changeArrayView.updateInitialArray("wrong type");
            this.assertErrorInLogs(aria.templates.View.INVALID_TYPE_OF_ARGUMENT);

            tpl.changeArrayView.updateInitialArray(newArray);
            this.assertEquals(tpl.changeArrayView.items.length, newArray.length);
            this.assertEquals(tpl.changeArrayView.items[0].value, newArray[0]);
            this.templateCtxt._tpl.changeArrayView.$dispose();
        }

    }
});
