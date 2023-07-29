/**
 * Provides support for performance tests
 */
qx.Mixin.define("testrunner.view.MPerformance", {

  construct : function()
  {
    this.__measurements = [];
  },

  properties :
  {
    /**
     * Whether the browser's built-in profiling capabilities
     * (<code>console.profile</code>) should additionally be used for
     * performance tests
     */
    nativeProfiling :
    {
      check : "Boolean",
      init : false
    }
  },

  members :
  {
    __measurements : null,

    /**
     * Adds an entry to the stored results
     *
     * @param clazz {String} Name of the test class
     * @param msg {String} Test description
     * @param iterations {Integer} Number of iterations
     * @param ownTime {Integer} JavaScript execution time
     * @param renderTime {Integer} browser rendering time
     */
    logMeasurement : function(clazz, msg, iterations, ownTime, renderTime) {
      this.__measurements.push([clazz, msg, iterations, ownTime, renderTime].join("; "));
    }
  }
});
