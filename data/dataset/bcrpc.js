window.BCRPC = new (function()
{
  this.call = function(method, params, id, context, callback, errorcallback)
  {
    try
    {
      var data = JSON.stringify({method: method, params: params, id: id});
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function()
      {
        try
        {
          if (xhr.readyState == 4)
          {
            if (xhr.status == 200)
            {
              var type = xhr.getResponseHeader("Content-Type");
              if (type.split(";", 1)[0] != "application/json") throw "RPC bad content type: " + type;
              var data = JSON.parse(xhr.responseText);
              if (data.error)
              {
                if (context) context.lastRPCError = data.error;
                throw "RPC error " + data.error.code + ": " + data.error.message;
              }
              else if (callback) callback(context, data.id, data.result);
            }
            else if (xhr.status == 0 || xhr.status > 999) throw "RPC connection failed: " + xhr.status;
            else throw "RPC HTTP error " + xhr.status;
          }
        }
        catch (error)
        {
          if (errorcallback) errorcallback(context, error);
          else throw error;
        }
      };
      xhr.open("POST", "/bcrpc", true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send(data);
    }
    catch (error)
    {
      if (errorcallback) errorcallback(context, error);
      else throw error;
    }
  };
})();
