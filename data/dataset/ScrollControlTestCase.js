Aria.classDefinition({
    $classpath : "test.aria.templates.scrollControl.ScrollControlTestCase",
    $extends : "aria.jsunit.TemplateTestCase",
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this._testEnv1 = {
            template : "test.aria.templates.scrollControl.testOne.ScrollControlTestOne"
        };
        this._testEnv2 = {
            template : "test.aria.templates.scrollControl.testTwo.ScrollControlTestTwo",
            data : {
                fullDisplay : false,
                cb : {
                    fn : this.runTestTwo,
                    scope : this
                }
            }
        };
        this.setTestEnv(this._testEnv1);
    },
    $prototype : {
        runTemplateTest : function () {
            this.runTestOne();
        },
        /**
         * Test the scroll getter/setter for dom element wrapper and section wrapper
         */
        runTestOne : function () {
            var mySection = this.templateCtxt.$getElementById('mySection');
            var myDiv = this.templateCtxt.$getElementById('myDiv');

            mySection.setScroll();
            var scrPos = mySection.getScroll();
            this.assertTrue(scrPos.scrollTop === 0 && scrPos.scrollLeft === 0);
            mySection.setScroll({
                scrollLeft : 10
            });
            scrPos = mySection.getScroll();
            this.assertTrue(scrPos.scrollTop === 0 && scrPos.scrollLeft == 10);

            scrPos.scrollTop = 15;
            myDiv.setScroll(scrPos);
            scrPos = myDiv.getScroll();
            this.assertTrue(scrPos.scrollTop == 15 && scrPos.scrollLeft == 10);
            myDiv.setScroll({
                scrollLeft : 0,
                scrollTop : 0
            });
            scrPos = myDiv.getScroll();
            this.assertTrue(scrPos.scrollTop === 0 && scrPos.scrollLeft === 0);

            this._replaceTestTemplate(this._testEnv2);

        },

        /**
         * Test the template container scroll control. The following method is given as a callback to the template
         * widget $viewReady
         */
        runTestTwo : function () {
            var testTpl = this.templateCtxt._tpl;
            var tplData = testTpl.data;
            var subTpl = tplData.subTemplate;
            subTpl.setContainerScroll({
                scrollLeft : 10,
                scrollTop : 30
            });

            var scrPos = subTpl.getContainerScroll();
            this.assertTrue(scrPos.scrollTop == 30 && scrPos.scrollLeft == 10);
            subTpl.setContainerScroll();
            scrPos = subTpl.getContainerScroll();
            this.assertTrue(scrPos.scrollTop == 30 && scrPos.scrollLeft == 10);
            subTpl.$refresh();
            scrPos = subTpl.getContainerScroll();
            this.assertTrue(scrPos.scrollTop == 30 && scrPos.scrollLeft == 10);
            aria.utils.Json.setValue(tplData, 'fullDisplay', true);
            scrPos = subTpl.getContainerScroll();
            this.assertTrue(scrPos.scrollTop == 30 && scrPos.scrollLeft == 10);
            subTpl.setContainerScroll({
                scrollLeft : 0
            });
            scrPos = subTpl.getContainerScroll();
            this.assertTrue(scrPos.scrollTop == 30 && scrPos.scrollLeft === 0);

            this.notifyTemplateTestEnd();
        }

    }
});
