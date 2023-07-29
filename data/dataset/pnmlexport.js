if (!ORYX.Plugins) 
    ORYX.Plugins = new Object();

function gup(name){
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) 
        return "";
    else 
        return results[1];
}

ORYX.Plugins.Pnmlexport = ORYX.Plugins.AbstractPlugin.extend({

    facade: undefined,
    
    construct: function(facade){
        this.facade = facade;
        
        this.facade.offer({
            'name': ORYX.I18N.Pnmlexport.name,
            'functionality': this.exportIt.bind(this),
            'group': ORYX.I18N.Pnmlexport.group,
            'icon': ORYX.PATH + "images/bpmn2pn_deploy.png",
            'description': ORYX.I18N.Pnmlexport.desc,
            'index': 2,
            'minShape': 0,
            'maxShape': 0
        });
        
    },
    
    exportIt: function(){
    
        // raise loading enable event
        this.facade.raiseEvent({
            type: ORYX.CONFIG.EVENT_LOADING_ENABLE
        });
        
        // asynchronously ...
        window.setTimeout((function(){
        
            // ... save synchronously
            this.exportSynchronously();
            
            // raise loading disable event.
            this.facade.raiseEvent({
                type: ORYX.CONFIG.EVENT_LOADING_DISABLE
            });
            
        }).bind(this), 10);
        
        return true;
    },
    
    exportSynchronously: function(){
    
        var resource = location.href;
        
        
        try {
            var serialized_rdf =this.getRDFFromDOM();
            //serialized_rdf = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + serialized_rdf;
            
            var diagramTitle = gup('resource');
            
            // Send the request to the server.
            new Ajax.Request(ORYX.CONFIG.PNML_EXPORT_URL, {
                method: 'POST',
                asynchronous: false,
                parameters: {
                    resource: resource,
                    data: serialized_rdf,
                    title: diagramTitle
                },
                onSuccess: function(request){
                    var pnmlfile = request.responseText;
                    if (pnmlfile.indexOf("RDF to BPMN failed with Exception:") == 0) {
                        //open error window
                        alert(pnmlfile); //errormessage
                    }
                    else {
                        var absolutepath = "http://" + location.host + ORYX.CONFIG.ROOT_PATH + pnmlfile;
                        var output = "<h2>Process: " +
                        self.document.title +
                        "</h2><a target=\"_blank\" href=\"" +
                        absolutepath;

                        var win = new Ext.Window({
                            width: 320,
                            height: 240,
                            resizable: false,
                            minimizable: false,
                            modal: true,
                            autoScroll: true,
                            title: 'Deployment successful',
                            html: output,
                            buttons: [{
                                text: 'OK',
                                handler: function(){
                                    win.hide();
                                }
                            }]
                        });
                        win.show();

                    }
                }
            });
            
        } 
        catch (error) {
            this.facade.raiseEvent({
                type: ORYX.CONFIG.EVENT_LOADING_DISABLE
            });
            alert(error);
        }
    }
});
