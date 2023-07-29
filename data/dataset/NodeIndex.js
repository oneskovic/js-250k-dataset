/**
 * A node index.
 * 
 * @class
 * @extends neo4j.index.Index
 * @param db Should be a GraphDatabase instance.
 * @param name Should be the index name
 */
neo4j.index.NodeIndex = function(db, name)
{

    neo4j.index.Index.call(this, db, name);

};

_.extend(neo4j.index.NodeIndex.prototype, neo4j.index.Index.prototype,
    /** @lends neo4j.index.NodeIndex# */        
    {

    /**
     * @private
     */
    getType : function() {
        return "node_index";
    },
    
    /**
     * @private
     */
    getUriFor : function(itemPromise) {
        var db = this.db;
        return itemPromise.then(function(item, fulfill) {
            db.nodeUri(item).then(fulfill);  
        });
    },
    
    /**
     * @private
     */
    getObjectFor : function(unknownPromise) {
        var db = this.db;
        return unknownPromise.then(function(unknown, fulfill) {
            if(typeof(unknown.getSelf) != "undefined") {
                fulfill(unknown);
            } else {
                db.node(unknown).then(function(node) {
                   fulfill(node); 
                });
            }  
        });
    },
    
    /**
     * @private
     */
    createObjectFromDefinition : function(def) {
        return new neo4j.models.Node(def, this.db);
    }

});
