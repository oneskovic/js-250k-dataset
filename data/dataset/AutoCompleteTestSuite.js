Aria.classDefinition({
    $classpath : "test.aria.widgets.form.autocomplete.AutoCompleteTestSuite",
    $extends : "aria.jsunit.TestSuite",
    $constructor : function () {
        this.$TestSuite.constructor.call(this);

        this.addTests("test.aria.widgets.form.autocomplete.ampersand.AutoComplete");
        this.addTests("test.aria.widgets.form.autocomplete.issue315.OpenDropDownFromButtonTest");
        this.addTests("test.aria.widgets.form.autocomplete.selectionKey.AutoComplete");
        this.addTests("test.aria.widgets.form.autocomplete.selectionKey.AutoCompleteModifier");

        this.addTests("test.aria.widgets.form.autocomplete.autoselect.OpenDropDownTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.spellcheck.SpellCheckTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.expandbutton.test1.ExpandButtonCheck");
        this.addTests("test.aria.widgets.form.autocomplete.expandbutton.test2.ExpandButtonCheck");
        this.addTests("test.aria.widgets.form.autocomplete.expandbutton.test3.ExpandButtonCheck");
        this.addTests("test.aria.widgets.form.autocomplete.expandbutton.test4.ExpandButtonCheck");
        this.addTests("test.aria.widgets.form.autocomplete.handler.test1.LCHandlerTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.promised.Promised");
        this.addTests("test.aria.widgets.form.autocomplete.onchangeRefresh.OnchangeRefreshTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.escKey.EscKeyTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.checkfocus.CheckFocus");
        this.addTests("test.aria.widgets.form.autocomplete.leftKey.LeftKeyTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.samevalue.AutoComplete");
        this.addTests("test.aria.widgets.form.autocomplete.enterKey.AutoComplete");
        this.addTests("test.aria.widgets.form.autocomplete.checkDropdownList.CheckDropdownTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.autoselectlabel.AutoSelectTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.typefast.AutoSelectTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.backspacetab.BackspaceTabTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.onchange.AutocompleteOnChangeTest");
        this.addTests("test.aria.widgets.form.autocomplete.paste.PasteTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.caret.CaretTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.popupposition.AutoCompleteMoveTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.helptext.test1.AutoCompleteHelptextTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.helptext.test2.AutoCompleteHelptextTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.autoedit.AutoEditInput");
        this.addTests("test.aria.widgets.form.autocomplete.issue697.EscKeyTestCase");
        this.addTests("test.aria.widgets.form.autocomplete.errorhandling.AutoComplete");
        this.addTests("test.aria.widgets.form.autocomplete.errorhandling.AutoComplete2");
        this.addTests("test.aria.widgets.form.autocomplete.preselectAutofill.PreselectAutofillTestSuite");
        this.addTests("test.aria.widgets.form.autocomplete.popupWidth.AdaptToContentWidthTest");
        this.addTests("test.aria.widgets.form.autocomplete.defaultErrorMessages.DefaultErrorMessagesTest");
    }
});
