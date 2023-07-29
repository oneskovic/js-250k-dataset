var _ = require('underscore');
var JSV = require('JSV').JSV;

var onJsonHelper = function(req, res, handler, cb){
  req.onJson = function(){

    var args = _.toArray(arguments);
    var schema, onBodyCB;
    switch(args.length){
      case 1:
        onBodyCB = args[0];
        break;

      case 2:
        schema = args[0];
        onBodyCB = args[1];
        break;

      default : throw "req.onJson() was called with the wrong number of properties.";
    }

    var body = '';
    req.on('data', function(data){
      body += data;
    });
    req.on('error', function(err){
      return onBodyCB(err, body);
    });
    req.on('end', function(){
      var obj;
      try {
        obj = JSON.parse(body);
      } catch(ex) {
        // if it's not valid JSON...
        return res.status.badRequest('invalid json.', body);
      }
      if (!!schema){
        var report = JSV.createEnvironment().validate(obj, schema);
        if (report.errors.length > 0){
          return res.status.badRequest({reason:'json failed schema validation.', errors:report.errors});
        }
      }

      return onBodyCB(null, obj);
    });

  };
  cb();
};


module.exports = onJsonHelper;




