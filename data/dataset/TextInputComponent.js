define(["../lib/jquery", "./BaseComponent"], function($, BaseComponent) {

  var TextInputComponent = BaseComponent.extend({
    update: function() {
      var myself = this;
      var name = myself.name;

      var selectHTML = "<input type='text' id='" + name + "' name='"  + name +
        "' value='" + myself.dashboard.getParameterValue(myself.parameter) +
        (myself.size ? ("' size='" + myself.size) : "") +
        (myself.maxLength ? ("' maxlength='" + myself.maxLength) : "") + "'>";

      myself.placeholder().html(selectHTML);

      var el = $("#" + name);

      el
        .change(function() {
          if(myself.dashboard.getParameterValue(myself.parameter) !== el.val()) {
            myself.dashboard.processChange(name);
          }
        })
        .keyup(function(ev) {
          if(ev.keyCode == 13 &&
            myself.dashboard.getParameterValue(myself.parameter) !== el.val()) {

            myself.dashboard.processChange(name);
          }
        });

      myself._doAutoFocus();
    },

    getValue : function() {
      return $("#" + this.name).val();
    }
  });

  return TextInputComponent;

});
