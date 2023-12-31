enyo.kind(
{
	name: "KeyManager",
	kind: "Component",
	events: {onPowerKey: "", onVolumeKey: "", onGotRingerSwitch: ""},
	components: [
	
		{name: "psPowerKeys", kind: "PalmService", service: "palm://com.palm.keys/switches/", method: "status", onSuccess: "onSuccess_psPowerKeys", onFailure: "onFailure_psPowerKeys", subscribe: true},
		
		{name: "psVolumeKeys", kind: "PalmService", service: "palm://com.palm.keys/audio/", method: "status", onSuccess: "onSuccess_psVolumeKeys", onFailure: "onFailure_psVolumeKeys", subscribe: true},
		
		{name: "psRingerSwitch", kind: "PalmService", service: "palm://com.palm.audio/system/", method: "status", onSuccess: "onSuccess_psRingerSwitch", onFailure: "onFailure_psRingerSwitch", subscribe: false},
		
		
		
	],
	
	
	create: function ()
	{
			
		this.inherited(arguments);
	
	},
	
	
	subscribe_psPowerKeys: function ()
	{
		
		this.$.psPowerKeys.call({});
		
	},
	
	
	onSuccess_psPowerKeys: function (sender, response)
	{
		
		this.log(response);
		if(response.key === "power" && response.state === "down")
		{
			this.doPowerKey();
		}
		
	},
	
	
	onFailure_psPowerKeys: function (sender, response)
	{
		
		this.log(response);
		
	},
	
		
	subscribe_psVolumeKeys: function ()
	{
		
		this.$.psVolumeKeys.call({});
		
	},
	
	
	onSuccess_psVolumeKeys: function (sender, response)
	{
		
		this.log(response);
		if((response.key === "volume_up" || response.key === "volume_down") && response.state === "down")
		{
			this.doPowerKey();
		}
		
	},
	
	
	onFailure_psVolumeKeys: function (sender, response)
	{
		
		this.log(response);
		
	},
	
	
	getRingerSwitch: function (callback)
	{
		
		var req = this.$.psRingerSwitch.call({});
		req.callback = callback;
	},
	
	
	onSuccess_psRingerSwitch: function (sender, response, request)
	{
		
		this.log(response);
		this.log(request);
		
		this.doGotRingerSwitch(response["ringer switch"],request.callback);
		
	},
	
	
	onFailure_psRingerSwitch: function (sender, response)
	{
		
		this.log(response);
		
	},
	

});
