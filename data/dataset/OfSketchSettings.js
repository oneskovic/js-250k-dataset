function OfSketchSettings(data) 
{
    var _data;

    this.load = function(onSuccess, onError)
    {
        JSONRPCClient.call('load-ofsketch-settings', 
                        {},
                        function(data){
                            _data = data;
                            onSuccess(data)
                        }, onError);
    }

    this.save = function(onSuccess, onError)
    {
        console.log("Saving editor settings");
        console.log(_data);
        JSONRPCClient.call('save-ofsketch-settings',
                        {
                            data: _data,
                             clientUUID: CLIENT_UUID
                        },
                        onSuccess,
                        onError);
    }

    this.update = function(ofSketchSettings)
    {
        _data = ofSketchSettings;
    }

    this.getData = function()
    {
        return _data;
    }
}
