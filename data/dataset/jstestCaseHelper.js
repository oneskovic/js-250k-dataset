({
    loadTest : function(cmp){
        if (!cmp._testLoaded) {
            cmp._testLoaded = true;
            var frame = document.createElement("iframe");
            frame.src = cmp.get("m.url");
            frame.scrolling = "auto";
            $A.util.on(frame, "load", function(){ 
            	cmp.getDef().getHelper().runTest(cmp);
            });
            var content = cmp.find("content");
            $A.util.insertFirst(frame, content.getElement());
        }
    },

    runTest : function(cmp){
        var frame = cmp.find("content").getElement().firstChild;
        var win = frame.contentWindow?frame.contentWindow:frame.contentDocument.window;
        try {
            var root = win.$A.getRoot();
        }catch(e){}

        if(!root){
            if(!win.aura.test.isComplete()){
                setTimeout(function(){
                    cmp.getDef().getHelper().runTest(cmp);
                }, 250);
                return;
            }
        }
        win.aura.test.run(cmp.get("v.case.name"), cmp.get("v.suite.code"), 10);
        cmp.getDef().getHelper().displayResults(cmp, win);
    },

    displayResults : function(cmp, win){
        if(!win.aura.test.isComplete()){
            setTimeout(function(){
                cmp.getDef().getHelper().displayResults(cmp, win);
            }, 250);
            return;
        }
        var rerun = cmp.find("rerun").getElement();
        //IF there were any errors in the test case (excluding assertions in callback functions)
        if(win.aura.test.getErrors()!==""){
            cmp.set("v.status", "fail");
            var msg = "";
            var errorsInCallbackFunc = eval("("+win.aura.test.getErrors()+")");
            var error = null;
            var errorInfo = "";
            for(var i=0;i<errorsInCallbackFunc.length;i++){
                error = errorsInCallbackFunc[i];
                msg += error.message;
                if(error["lastStage"]) {
                    msg += "<br/>Failing Test: "+cmp.get("v.title")+"<br/><pre>" + error["lastStage"] + "</pre>";
                }
            }
            cmp.find("results").getElement().innerHTML = "Failed.<br/>"+msg;
        }else{
            cmp.set("v.status", "pass");
            cmp.find("results").getElement().innerHTML = "Passed.";
        }

        //$A.rerender(cmp);

        cmp.get("e.done").fire();
    }
})