/**
 * Log appender for qooxdoo applications running in Node.js. Writes log
 * messages to STDOUT/STDERR.
 *
 * @ignore(process.*)
 */

qx.Class.define("qx.log.appender.NodeConsole", {

  statics:
  {
    /**
     * process.stdout
     */
    __OUT : null,
    /**
     * process.stderr
     */
    __ERR : null,

    /**
     * Writes a message to the shell. Errors will be sent to STDERR, everything
     * else goes to STDOUT
     *
     * @param logMessage {String} Message to be logged
     * @param level {String} Log level. One of "debug", "info", "warn", "error"
     */
    log : function(logMessage, level)
    {
      if (level == "error") {
        this.__ERR.write(logMessage+'\n');
      } else {
        this.__OUT.write(logMessage+'\n');
      }
    },

    /**
     * Logs a debug message
     *
     * @param logMessage {String} Message to be logged
     */
    debug : function(logMessage)
    {
      this.log(logMessage, "debug");
    },

    /**
     * Logs an info message
     *
     * @param logMessage {String} Message to be logged
     */
    info : function(logMessage)
    {
      this.log(logMessage, "info");
    },

    /**
     * Logs a warning message
     *
     * @param logMessage {String} Message to be logged
     */
    warn : function(logMessage)
    {
      this.log(logMessage, "warn");
    },

    /**
     * Logs an error message
     *
     * @param logMessage {String} Message to be logged
     */
    error : function(logMessage)
    {
      this.log(logMessage, "error");
    },

    /**
     * Process a log entry object from qooxdoo's logging system.
     *
     * @param entry {Map} Log entry object
     */
    process : function(entry)
    {
      var level = entry.level || "info";
      for (var prop in entry) {
        if (prop == "items") {
          var items = entry[prop];
          for (var p=0; p<items.length; p++) {
            var item = items[p];
            this[level](item.text);
          }
        }
      }
    }

  },

  /**
   * @ignore(process.*)
   */
  defer : function(statics)
  {
    if (typeof(process) !== "undefined") {
      statics.__OUT = process.stdout;
      statics.__ERR = process.stderr;
    }
  }

});
