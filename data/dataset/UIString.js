 /**
 * @param {string} string
 * @param {...*} vararg
 */
WebInspector.UIString = function(string, vararg)
{
    if (Preferences.localizeUI) {
        if (window.localizedStrings && string in window.localizedStrings)
            string = window.localizedStrings[string];
        else {
            if (!(string in WebInspector._missingLocalizedStrings)) {
                console.warn("Localized string \"" + string + "\" not found.");
                WebInspector._missingLocalizedStrings[string] = true;
            }
    
            if (Preferences.showMissingLocalizedStrings)
                string += " (not localized)";
        }
    }
    return String.vsprintf(string, Array.prototype.slice.call(arguments, 1));
}

WebInspector._missingLocalizedStrings = {};
