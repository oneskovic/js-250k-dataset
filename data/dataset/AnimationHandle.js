qx.Class.define("qx.test.bom.element.AnimationHandle",
{
  extend : qx.dev.unit.TestCase,
  include : [ qx.dev.unit.MMock, qx.dev.unit.MRequirements ],

  members :
  {
    setUp : function() {
      this.__keys = qx.core.Environment.get("css.animation");
      if (this.__keys == null) {
        // skip the test
        throw new qx.dev.unit.RequirementError("css.animation");
      }
    },

    "test stop of CSS animation" : function() {
      var el = qx.dom.Element.create("div");
      var handle = qx.bom.element.Animation.animate(el, {
        "duration": 100,
        "keyFrames": {
          0 : {"opacity": 1},
          100 : {"opacity": 0}
        },
        "delay" : 200
      });

      var spy = this.spy(qx.bom.element.AnimationJs, "stop");
      handle.on("start", spy);
      handle.stop();
      this.wait(500, function() {
        this.assertNotCalled(spy);
      }, this);
    }
  }
});
