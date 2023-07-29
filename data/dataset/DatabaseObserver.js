WebInspector.DatabaseObserver = function()
{
    WebInspector.Object.call(this);
};

WebInspector.DatabaseObserver._callbacks = {};

WebInspector.DatabaseObserver.prototype = {
    constructor: WebInspector.DatabaseObserver,

    // Events defined by the "Database" domain.

    addDatabase: function(database)
    {
        WebInspector.storageManager.databaseWasAdded(database.id, database.domain, database.name, database.version);
    },

    // COMPATIBILITY (iOS 6): This event was removed in favor of a more async DatabaseAgent.executeSQL.
    sqlTransactionSucceeded: function(transactionId, columnNames, values)
    {
        if (!WebInspector.DatabaseObserver._callbacks[transactionId])
            return;

        var callback = WebInspector.DatabaseObserver._callbacks[transactionId];
        delete WebInspector.DatabaseObserver._callbacks[transactionId];

        if (callback)
            callback(columnNames, values, null);
    },

    // COMPATIBILITY (iOS 6): This event was removed in favor of a more async DatabaseAgent.executeSQL.
    sqlTransactionFailed: function(transactionId, sqlError)
    {
        if (!WebInspector.DatabaseObserver._callbacks[transactionId])
            return;

        var callback = WebInspector.DatabaseObserver._callbacks[transactionId];
        delete WebInspector.DatabaseObserver._callbacks[transactionId];

        if (callback)
            callback(null, null, sqlError);
    }
};

WebInspector.DatabaseObserver.prototype.__proto__ = WebInspector.Object.prototype;
