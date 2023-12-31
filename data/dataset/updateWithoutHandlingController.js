({
    updateText:function(c,e,h){
        c.set("v.text", "modified");
        document.__PageModifiedTestFlag = true;
    },

    /**
     * this routine builds a request where the 'loaded' map is incorrect.
     *
     * In order to do this it randomly picks a character from the UID, and replaces it with
     * some other character in the set of alphanumerics, making sure that it is different.
     */
    sendOutdatedRequest:function(c,e,h){
        var selection = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var ctx = $A.getContext();
        var nl = [];
        var loaded = ctx.getLoaded();
        for (var p in loaded) {
        	if (loaded.hasOwnProperty(p)) {
	            var x = loaded[p];
	            if (x.length > 10) {
	                var posn = Math.floor(Math.random() * (x.length-1));
	                var repl;
	                var orig = x.charAt(posn);
	                var rposn = selection.indexOf(orig);

	                if (rposn > -1) {
	                    repl = Math.floor(Math.random() * (selection.length-1));
	                    if (repl >= rposn) {
	                        repl += 1;
	                    }
	                } else {
	                    repl = Math.floor(Math.random() * selection.length);
	                }
	                var r = selection.charAt(repl);
	                x = x.substr(0,posn)+r+x.substr(posn+1);
	                nl[p] = x;
	            }
        	}
        }
        for (var q in nl) {
        	if (nl.hasOwnProperty(q)) {
        		loaded[q] = nl[q];
        	}
        }
        c.set("v.text", "i was updated");
        var a = c.get("c.noArgs");
        $A.enqueueAction(a);
    }
})
