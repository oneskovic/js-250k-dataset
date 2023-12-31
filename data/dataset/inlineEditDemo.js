// Declare dependencies
/* global fluid */

var demo = demo || {};

(function ($, fluid) {
    "use strict";

    demo.initRichInlineEdit = function () {
        /**
         * Create cancel and save buttons for a rich inline editor.
         * @param {Object} editor
         */
        var makeButtons = function (editor) {
            $(".demo-save", editor.container).click(function () {
                editor.finish();
                return false;
            });

            $(".demo-cancel", editor.container).click(function () {
                editor.cancel();
                return false;
            });
        };

        var tinyMCEOptions = {
            tinyMCE: {
                width: 1024,
                theme: "advanced",
                theme_advanced_toolbar_location : "top"
            },
            componentDecorators: {
                type: "fluid.undoDecorator",
                options: {
                    selectors: demo.initRichInlineEdit.selectors,
                    renderer: demo.initRichInlineEdit.undoRenderer
                }
            },
            strings: {
                textEditButton: "Edit"
            },
            tooltipText: "Use the Edit link to make changes"
        };

        // Create a TinyMCE-based Rich Inline Edit component.
        var tinyEditor = fluid.inlineEdit.tinyMCE("#demo-richInlineEdit-container-tinyMCE", tinyMCEOptions);
        makeButtons(tinyEditor);

                // Create a TinyMCE-based Rich Inline Edit component.
        var tinyEditor2 = fluid.inlineEdit.tinyMCE("#demo-richInlineEdit-container-tinyMCE-2", tinyMCEOptions);
        makeButtons(tinyEditor2);

        // Create an CKEditor 3.x-based Rich Inline Edit component.
        var ckEditor = fluid.inlineEdit.CKEditor("#demo-richInlineEdit-container-ckEditor", {
            componentDecorators: {
                type: "fluid.undoDecorator",
                options: {
                    selectors: demo.initRichInlineEdit.selectors,
                    renderer: demo.initRichInlineEdit.undoRenderer
                }
            },
            strings: {
                textEditButton: "Edit"
            },
            tooltipText: "Use the Edit link to make changes"
        });
        makeButtons(ckEditor);
    };

    demo.initRichInlineEdit.selectors = {
        undoContainer: ".demo-undoContainer",
        undoControl: ".demo-undoControl",
        redoContainer: ".demo-redoContainer",
        redoControl: ".demo-redoControl"
    };

    demo.initRichInlineEdit.undoRenderer = function (that, targetContainer) {
        var markup =
            "<span class='flc-undo demo-inlineEdit-inlinePadding'>" +
            "<span class='demo-undoContainer' role='button'><a href='#' class='demo-undoControl'>Undo edit</a></span>" +
            "<span class='demo-redoContainer' role='button'><a href='#' class='demo-redoControl'>Redo edit</a></span>" +
            "</span>";
        var markupNode = $(markup);
        var button = $("a", targetContainer);
        button.after(markupNode);
        return markupNode;
    };

})(jQuery, fluid);
