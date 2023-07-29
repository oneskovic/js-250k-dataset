var SyncStatistics = function (syncStatus, serviceType, lastSyncTime,
        serverToClientTotal, serverToClientAdded, serverToClientUpdated,
        serverToClientRemoved, clientToServerTotal, clientToServerAdded,
        clientToServerUpdated, clientToServerRemoved) {
    this.__defineGetter__("syncStatus", function () {
        return syncStatus;
    });

    this.__defineGetter__("serviceType", function () {
        return serviceType;
    });

    this.__defineGetter__("lastSyncTime", function () {
        return lastSyncTime;
    });

    this.__defineGetter__("serverToClientTotal", function () {
        return serverToClientTotal;
    });

    this.__defineGetter__("serverToClientAdded", function () {
        return serverToClientAdded;
    });

    this.__defineGetter__("serverToClientUpdated", function () {
        return serverToClientUpdated;
    });

    this.__defineGetter__("serverToClientRemoved", function () {
        return serverToClientRemoved;
    });

    this.__defineGetter__("clientToServerTotal", function () {
        return clientToServerTotal;
    });

    this.__defineGetter__("clientToServerAdded", function () {
        return clientToServerAdded;
    });

    this.__defineGetter__("clientToServerUpdated", function () {
        return clientToServerUpdated;
    });

    this.__defineGetter__("clientToServerRemoved", function () {
        return clientToServerRemoved;
    });
};

module.exports = SyncStatistics;
