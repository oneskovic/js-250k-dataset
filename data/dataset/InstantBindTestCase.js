Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiselect.instantbind.InstantBindTestCase",
    $extends : "aria.jsunit.MultiSelectTemplateTestCase",
    $dependencies : ["aria.utils.FireDomEvent", "aria.DomEvent"],
    $constructor : function () {
        this.defaultTestTimeout = 15000;
        this.$MultiSelectTemplateTestCase.constructor.call(this);
    },
    $prototype : {

        /**
         * Set data to test default behavior (without instant bind)
         */
        __setTestEnvNormal : function () {
            this.currentMsId = 'msNormal';
            this.dataModelKey = 'contentNormal';
            this.expectedValueMs = "AC,AF,NZ"; // display value of the multiselect
            this.expectedValueDm = "AC,AF"; // value of the multiselect in the data model
            this.expectedOnChangeFired = undefined;
        },
        /**
         * Set data to test the behavior with instant bind
         */
        __setTestEnvInstantBind : function () {
            this.currentMsId = 'msInstant';
            this.dataModelKey = 'contentInstant';
            this.expectedValueMs = "AC,AF,NZ";
            this.expectedValueDm = "AC,AF,NZ"; // instant bind updates data model just after the click
            this.expectedOnChangeFired = true;
        },

        runTemplateTest : function () {
            this.__setTestEnvNormal();
            this._openMS();
        },

        _openMS : function () {
            // needs to be toggled back before ending the test!
            this.toggleMultiSelectOn(this.currentMsId, this._onMSOpened);
        },
        _onMSOpened : function () {
            this.toggleMultiSelectOption(this.currentMsId, 2, this._clickedThirdCheckBox);
        },
        _clickedThirdCheckBox : function (evt, args) {
            this.waitFor({
                condition : function () {
                    return (this.templateCtxt._tpl[this.dataModelKey].value.toString() === this.expectedValueDm);
                },
                callback : {
                    fn : this._doAsserts,
                    scope : this
                }
            });
        },
        _doAsserts : function () {
            this.assertEquals(this.getInputField(this.currentMsId).value, this.expectedValueMs);
            this.assertEquals(this.templateCtxt._tpl[this.dataModelKey].value.toString(), this.expectedValueDm);
            this.assertEquals(this.templateCtxt.data.onChangeWasFired, this.expectedOnChangeFired);
            this._closeMultiSelect();
        },
        _closeMultiSelect : function () {
            this.toggleMultiSelectOff(this.currentMsId, this._endScenario);
        },
        _endScenario : function () {
            if (this.currentMsId == 'msNormal') { // rerun the scenario for the second multiselect
                this.__setTestEnvInstantBind();
                this._openMS();
            } else {
                this.__end();
            }
        },

        __end : function () {
            this.notifyTemplateTestEnd("InstantBind");
        }
    }
});
