// The class this file defines and its required classes
R.Engine.define({
    "class":"R.storage.PersistentStorage",
    "requires":[
        "R.storage.BrowserStorage"
    ]
});

/**
 * @class <tt>R.storage.PersistentStorage</tt> is used to maintain data between browser
 *     sessions.  The schema and data tables will persist in the user's browser
 *     between restarts.  This is a good place to store configuration data,
 *     high score tables, and other data which needs to be maintained.
 *     <p/>
 *     Data is stored and retrieved using a SQL-like syntax.  For information
 *     about the SQL syntax, see http://code.google.com/p/trimpath/wiki/TrimQuery
 *
 * @param name {String} The name of the object
 * @extends R.storage.BrowserStorage
 * @constructor
 * @description This class of storage is used to persist data between browser sessions.
 */
R.storage.PersistentStorage = function () {
    return R.storage.BrowserStorage.extend(/** @scope R.storage.PersistentStorage.prototype */{

        enabled:null,

        /** @private */
        constructor:function (name) {
            this.enabled = R.engine.Support.sysInfo().support.storage.local;
            AssertWarn(this.enabled, "PersistentStorage is not supported by browser - DISABLED");
            this.base(name);
        },

        /**
         * Release the object back into the object pool.
         */
        release:function () {
            this.base();
            this.enabled = null;
        },

        /**
         * Initialize the storage object to the localStorage browser object
         * @return {Object} The <tt>localStorage</tt> object
         */
        initStorageObject:function () {
            return window.localStorage;
        },

        /**
         * A unique identifier for the table name.
         * @param name {String} The table name
         * @return {String} A unique identifier
         */
        getTableUID:function (name) {
            return this.base(name) + "PS";
        }

    }, /** @scope R.storage.PersistentStorage.prototype */ {

        /**
         * Get the class name of this object
         *
         * @return {String} "R.storage.PersistentStorage"
         */
        getClassName:function () {
            return "R.storage.PersistentStorage";
        }

    });

};
