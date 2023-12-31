if (!PhoneGap.hasResource("debugConsole")) {
PhoneGap.addResource("debugConsole");

var debugConsole = 
{
	log:function(msg){
		PhoneGap.exec(null,null,"DebugConsole","log",msg);
	},
	warn:function(msg){
		PhoneGap.exec(null,null,"DebugConsole","warn",msg);
	},
	error:function(msg){
		PhoneGap.exec(null,null,"DebugConsole","error",msg);
	}	
};


if(typeof window.console == "undefined")
{
	window.console = {
		log:function(str){
			if(navigator.debugConsole){
				navigator.debugConsole.log(str);
			}
			else
			{// In case log messages are received before device ready
				window.external.Notify("Info:" + str);
			}
		}
	};
}

// output any errors to console log, created above.
window.onerror=function(e)
{
	if(navigator.debugConsole)
	{
		navigator.debugConsole.error(JSON.stringify(e));
	}
	else
	{// In case errors occur before device ready
		window.external.Notify("Error:" + JSON.stringify(e));	
	}
};



PhoneGap.onPhoneGapInit.subscribeOnce(function() {
	navigator.debugConsole = debugConsole;
});

}