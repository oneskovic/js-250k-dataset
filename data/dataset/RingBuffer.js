qx.Class.define("qx.test.log.RingBuffer",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    setUp : function()
    {
      this.__initialLogLevel = qx.log.Logger.getLevel();
    },

    tearDown : function()
    {
      qx.log.Logger.setLevel(this.__initialLogLevel);
    },

    testLog : function()
    {
      var appender = new qx.log.appender.RingBuffer();

      qx.log.Logger.setLevel("debug");
      qx.log.Logger.clear();
      qx.log.Logger.register(appender);
      qx.log.Logger.debug("test");

      var events = appender.getAllLogEvents();
      this.assertEquals(1, events.length);
      this.assertEquals("test", events[0].items[0].text);

      qx.log.Logger.unregister(appender);
    },


    testExceedMaxMessages : function()
    {
      var appender = new qx.log.appender.RingBuffer(2);

      for (var i=0; i<10; i++) {
        appender.process({index: i});
      }

      var events = appender.getAllLogEvents();
      this.assertEquals(2, events.length);
      this.assertEquals(8, events[0].index);
      this.assertEquals(9, events[1].index);
    },


    testRetrieveLogEvents : function()
    {
      var appender = new qx.log.appender.RingBuffer(6);

      for (var i=0; i<10; i++)
      {
        var event = {
          index: i
        };
        appender.process(event);
      }

      var events = appender.retrieveLogEvents(5);
      this.assertEquals(5, events.length);
      this.assertEquals(5, events[0].index);
      this.assertEquals(9, events[4].index);
    },


    testClearHistory : function()
    {
      var appender = new qx.log.appender.RingBuffer();
      appender.process({});
      this.assertEquals(1, appender.getAllLogEvents().length);

      appender.clearHistory();
      this.assertEquals(0, appender.getAllLogEvents().length);
    }
  }
})
