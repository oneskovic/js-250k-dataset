/**
 * Collection of NodeSimple, when we simply need the list of nodes.
 *
 * Leverages the ClusterState api call, allowing for filtering of information needed or not.
 * fetch() will cast all response to NodeSimple
 *
 * curl -XGET 'http://localhost:9200/_cluster/state?filter_nodes=false, etc...'
 */

var NodeListModel = Backbone.Collection.extend({
    model:NodeSimple,
    masterNode:'',
    initialize:function () {
        console.log("Inside NodeList");
    },
    url:function () {
        return '/_cluster/state?filter_nodes=false&filter_metadata=true&filter_routing_table=true&filter_blocks=true&filter_indices=true';
    },
    parse:function (data) {
        if (data.master_node) {
            console.log('Master Node is: ' + data.master_node);
            this.masterNode = data.master_node;
        }

        // nodes are keyed by their id, so we need to get the key and add it to the value object foreach
        var nodes = data.nodes;
        nodes[this.masterNode].master = true; // all the others appear as false, by default.

        var nodeKeys = _.keys(nodes);
        var nodeValues = _.values(nodes);
        for (var i = 0; i < nodeKeys.length; i++) {
            nodeValues[i].id = nodeKeys[i];
        }

        // sort by name
        nodeValues = _.sortBy(nodeValues, function (node) {
            return node.name;
        });

        nodeValues = _.sortBy(nodeValues, function (node) { // put masternode first in line
            return node.master;
        });
        return nodeValues;
    }
});
