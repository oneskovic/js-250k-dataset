({
    addOptionDomEvents : function(component) {
        var events = ["mouseover", "mouseout"];
        for (var i=0, len=events.length; i < len; i++) {
            if (!component.hasEventHandler(events[i])) {
                this.addDomHandler(component, events[i]);
            }           
        }
    },
    
    displayText: function(component, keyword) {
        var concreteCmp = component.getConcreteComponent();
        var keyword = concreteCmp.get("v.keyword");
        var optionCmp = concreteCmp.find("option");
        var elem = optionCmp ? optionCmp.getElement() : null;
        if (elem) {
            var label = concreteCmp.get("v.label");

            if ($A.util.isEmpty(keyword)) {
                elem.textContent = label;
                return;
            }

            var regex;
            try {
                regex = new RegExp(keyword, "i");
            } catch (e) { // if keyword is not a legal regular expression, display the original label
                elem.textContent = label;
                return;
            }

            var searchResult = regex.exec(label);
            if (searchResult && searchResult[0].length > 0) {
                var displayText = this.htmlEscape(label.substring(0, searchResult.index)) +
                                  "<mark class=\"data-match\">" + 
                                  this.htmlEscape(searchResult[0]) + 
                                  "</mark>" +
                                  this.htmlEscape(label.substr(searchResult.index + searchResult[0].length));
                elem.innerHTML = displayText;
            } else {
                elem.textContent = label;
            }
        }
    },
    
    handleMouseover: function(component) {
        var optionCmp = component.find("option");
        var elem = optionCmp ? optionCmp.getElement() : null;
        if (elem) {
            $A.util.addClass(optionCmp, "mouseovered");
        }
    },
    
    handleMouseout: function(component) {
        var optionCmp = component.find("option");
        var elem = optionCmp ? optionCmp.getElement() : null;
        if (elem) {
            $A.util.removeClass(optionCmp, "mouseovered");
        }
    },
    
    htmlEscape: function(str) {
        return String(str).replace(/&/g, '&amp;')
            .replace(new RegExp('"', "g"), '&quot;')
            .replace(new RegExp("'", "g"), '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
})
