var Handlebars = require('handlebars'),
path = require('path'), 
fs = require('fs');

//helper function
Handlebars.registerHelper('$', function(name, args) {
   if(args && (typeof args) != 'object') {
        var params = args.split(",");
   }
   if(params && params.length != 0) {
       return HELPER[name].apply(this,params);
   } else {
       return HELPER[name]();
   }
   
});


