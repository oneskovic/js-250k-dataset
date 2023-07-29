({


    /**
     * Validates the "ariaRole", "buttons", and "width" attributes. Also
     * associates the buttons with their parent dialog.
     */
    doInit : function(cmp, evt, hlp) {
        var buttonFacet = cmp.get("v.buttons"),
            role        = cmp.get("v.ariaRole"),
            width       = cmp.get("v.width"),
            length      = 0;

        // validate the aria role is one of the allowed values
        if (role !== "dialog" && role !== "alertdialog") {
            $A.error("The 'ariaRole' attribute of a ui:dialog component " +
                     "must be one of the following case-sensitive values: " +
                     "dialog, alertdialog");
        }

        // validate the button facet is of type ui:dialogButtons and
        // set a reference to the dialog on the dialogButton's model
        if (buttonFacet) {
            length = buttonFacet.length;
            for (var i=0; i<length; i++) {
                if (buttonFacet[i].isInstanceOf("ui:dialogButtons")) {
                    buttonFacet[i].set("v._parentDialog", cmp);
                } else {
                    $A.error("The 'buttons' attribute of a ui:dialog component" +
                             "must be of type ui:dialogButtons");
                }
            }
        }

        // validate the width attribute is one of the allowed values
        if (width !== "small" && width !== "medium" && width !== "large" && width !== "auto") {
            $A.error("The 'width' attribute of a ui:dialog component must be one of " +
                     "the following case-sensitive values: small, medium, large, auto");
        }

    },


    /*
     * Handles the click of the "x" (close) button, or the default cancel button of
     * the dialog. Fires the application-level event ui:closeDialog, setting the
     * 'confirmClicked' attribute to false.
     */
    close : function(cmp, evt, hlp) {

        var closeEvent = $A.get("e.ui:closeDialog");

        closeEvent.setParams({
            dialog : cmp,
            confirmClicked : false
        });
        closeEvent.fire();

    }


})
