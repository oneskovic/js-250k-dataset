// Declare dependencies
/* global fluid */

var example = example || {};
(function ($, fluid) {
    "use strict";

    /**
     * The Preferences Editor interface is defined by several HTML templates. The component
     * needs to know where those templates are. This variable will be used by all
     * versions of the component.
     */
    var pathToTemplates = "../../../../src/framework/preferences/html/";
    var pathToMessages = "../../../../src/framework/preferences/messages/";

    /**
     * The UI Enhancer's Table of Contents uses a template. This path variable is used by all
     * three versions of the component, as well as by the UI Enhancer present in the Preview
     * itself.
     */
    var pathToTocTemplate = "../../../../src/components/tableOfContents/html/TableOfContents.html";

    /**
     * Initialize a settings store for the page.
     */
    example.initSettingsStore = function () {
        fluid.globalSettingsStore();
    };

    /**
     * Initialize UI Enhancer for the page. This function is used by the two full-page
     * Preferences Editor pages as well as by the example page itself.
     */
    example.initPageEnhancer = function (customThemeName) {
        fluid.pageEnhancer({
            uiEnhancer: {
                gradeNames: ["fluid.uiEnhancer.starterEnactors"],
                tocTemplate: pathToTocTemplate,
                classnameMap: {
                    theme: {
                        "default": customThemeName
                    }
                }
            }
        });
    };

    /**
     * Initialize Preferences Editor. This version of Preferences Editor uses the
     * page itself as a live preview.
     */
    example.initPrefsEditor = function (container) {
        fluid.prefs.separatedPanel(container, {
            gradeNames: ["fluid.prefs.transformDefaultPanelsOptions"],
            // Tell preference editor where to find all the templates, relative to this path
            templatePrefix: pathToTemplates,
            messagePrefix: pathToMessages,
            templateLoader: {
                gradeNames: ["fluid.prefs.starterSeparatedPanelTemplateLoader"]
            },
            messageLoader: {
                gradeNames: ["fluid.prefs.starterMessageLoader"]
            },
            prefsEditor: {
                gradeNames: ["fluid.prefs.starterPanels", "fluid.prefs.initialModel.starter", "fluid.prefs.uiEnhancerRelay"]
            }
        });
    };

})(jQuery, fluid);
