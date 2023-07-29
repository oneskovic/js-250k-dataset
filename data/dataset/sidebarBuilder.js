function SidebarBuilder() {
    
    this.toBeAdded = new Array();
    var prefService = Components.classes['@mozilla.org/preferences-service;1'].
            getService(Components.interfaces.nsIPrefService);
    var branch = prefService.getBranch('extensions.sqlime.');
    
    this.time = branch.getIntPref('sidebarbuildingstop');
    this.isRunning = true;
}

SidebarBuilder.prototype = {
    setup: function(){
        this.isRunning = true;
        this.toBeAdded = new Array();
    }
    ,
    start: function(self){
        if (!self) {
            self = this;
        }
        if (self.toBeAdded.length > 0 && self.isRunning) {
            
            var parent, child, postFunc;
            
            [parent, child, postFunc] = self.toBeAdded.pop();
            
            dump('\nAdding '+child+'('+ child.nodeName+') -> '+parent + '('+parent.nodeName+')');
            
            parent.appendChild(child);
            
            if (postFunc) postFunc(parent, child);
            
            setTimeout(self.start, self.time, self);
            
        }
        
        
    }
    ,
    add: function(parent, child, postFunc) {
        this.toBeAdded.push([parent,child, postFunc]);
    }
    ,
    stop: function() {
        this.isRunning = false;
        this.toBeAdded = null;
    }
}

function getSidebarBuilder() {
    if (typeof(__xssme_sidebar_builder__) == 'undefined' ||
        !__xssme_sidebar_builder__)
    {
        __xssme_sidebar_builder__ = new SidebarBuilder();
    }
    return __xssme_sidebar_builder__;
}
