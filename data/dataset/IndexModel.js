/**
 * $ curl -XPUT 'http://localhost:9200/twitter/' -d '{
    "settings" : {
        "number_of_shards" : 3,
        "number_of_replicas" : 2
    }
}'
 /*
 * Generic class symbolizing an Index. Used for creating and performing actions (cmd) on an index. We
 * do not use this for loading an Index, however. Loading an index view is far more complicated so we use
 * status and stats classes for that.
 * @type {*}
 */
var IndexModel = Backbone.Model.extend({
    defaults:{
        indexId:undefined,
        cmd:undefined
    },
    initialize:function (args) {
        console.log("Creating Index " + args.indexId);
        this.indexId = args.indexId;
        if (args.cmd !== undefined) {
            this.cmd = args.cmd;
        }
    },
    url:function () {
        if (this.cmd !== undefined) {
            return '/' + this.indexId + '/' + this.cmd;
        }
        else {
            return '/' + this.indexId;
        }

    },
    validation:{
        indexId:{
            required:true,
            msg:'Please enter a valid Index ID'
        }/*,
         shards:{
         required:true,
         min:1,
         pattern:'number',
         msg:'Please enter a # value.'
         },
         replicas:{
         required:true,
         min:0,
         pattern:'number',
         msg:'Please enter a # value.'
         }*/
    }
});