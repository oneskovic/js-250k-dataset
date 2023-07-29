enyo.kind({
	name: "MyApps.PalmID",
	kind: enyo.Pane,
	published : {
		palmProfileAccount: {},
		initialize: function(parms) {
			this.backToViewCallback = enyo.bind(this, 
				function() {
					//parms.backToView();
					this.doAccountsModify_Done();
		    		this.selectView(this.$.dummy);
					this.render();
					this.$.initialize.destroy()
					this.$.accounts.destroy()
					this.$.fullProfile.destroy()
				});
				
				
			this.createComponents(
				[
					{name: "initialize", kind: "MyApps.PalmID.Initialize"},
					{name: "accounts", kind: "MyApps.PalmID.Accounts"},
					{name: "fullProfile", kind: "MyApps.PalmID.Profile"}
				]			
			);		
			this.render();
		    this.selectView(this.$.initialize);
			this.$.initialize.initialize({backToViewCallback: this.backToViewCallback, palmProfileAccount: parms.palmProfileAccount});			
			
			this.nameChangeCallback = function(){}; // not passed in anymore.
			this.palmProfileAccount = parms.palmProfileAccount;
		},	
	},
	events: {
		onAccountsModify_Done: "",
	},
	components: [
		{name: "dummy", kind: enyo.VFlexBox, content:" "}
	]
	
});

console.log("palm.js");


