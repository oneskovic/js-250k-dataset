define([
    "jquery",
    "backbone",
    "app",
    "./host-list-view"
],
function($, Backbone, app, HostListView) {

    var HostStatus = Backbone.Model.extend({
        idAttribute: "name"
    });

    var HostStatusCollection = Backbone.Collection.extend({
        model: HostStatus,
        url: '/loadbalancer/servers'
    });

    var hosts = new HostStatusCollection();

    // public api
    var loadbalancer = {};

    app.vent.on("agent:event:loadBalancerStateChanged", function(data) {
        var agent = hosts.get(data.agentName);
        if (agent) {
            agent.set({ loadBalancerState: data.state });
        }
    });

    app.vent.on("loadbalancer:show", function() {
        app.mainRegion.show(new HostListView({ collection: hosts }));
        app.router.showRoute("loadbalancer");

        if (hosts.length === 0) {
            hosts.fetch();
        }
    });

    return loadbalancer;
});