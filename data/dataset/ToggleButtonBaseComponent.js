define(['../lib/jquery', './InputBaseComponent'], function($, InputBaseComponent) {

  var ToggleButtonBaseComponent = InputBaseComponent.extend({
    draw: function(myArray) {
      var myself = this;
      //default
      var currentVal = myself.dashboard.getParameterValue(myself.parameter);
      currentVal = (typeof currentVal == 'function') ? currentVal() : currentVal;

      var isSelected = false;

      var currentValArray = [];
      if(currentVal instanceof Array || (typeof currentVal == "object" && currentVal.join)) {
        currentValArray = currentVal;
      } else if(typeof currentVal == "string") {
        currentValArray = currentVal.split("|");
      }

      // check to see if current selected values are in the current values array. If not check to see if we should default to the first
      var vid = myself.valueAsId == false ? 0 : 1;
      var hasCurrentVal = false;
        outer:
        for(var i = 0; i < currentValArray.length; i++) {
          for(var y = 0; y < myArray.length; y++) {
            if(currentValArray[i] == myArray[y][vid]) {
              hasCurrentVal = true;
              break outer;
            }
          }
        }
      // if there will be no selected value, but we're to default if empty, select the first
      if(!hasCurrentVal && myself.defaultIfEmpty) {
        currentValArray = [myArray[0][vid]];

        myself.currentVal = currentValArray;
        myself.dashboard.setParameter(myself.parameter,currentValArray);
        myself.dashboard.processChange(myself.name);
      }
      // (currentValArray == null && myself.defaultIfEmpty)? firstVal : null

      var elClass = (myself.verticalOrientation) ? "toggleGroup vertical" : "toggleGroup horizontal";
      var selectHTML = $('<ul/>').attr({class: elClass});
      for(var i = 0, len = myArray.length; i < len; i++) {
        //TODO: review the callAjaxAfterRender call because it is calling the lifecycle and should not require the global Dashboards object
        var li = $('<li/>').attr({class: elClass})
        var input = $("<input/>").click(function() {
          myself.callAjaxAfterRender(myself, myself.name);
        });

        isSelected = false;
        for(var j = 0, valLength = currentValArray.length; j < valLength; j++) {
          isSelected = currentValArray[j] == myArray[i][vid];
          if(isSelected) {
            break;
          }
        }

        if(myself.type == 'radio' || myself.type == 'radioComponent') {
          if((i == 0 && !hasCurrentVal) || (hasCurrentVal && (myArray[i][vid] == currentVal))) {
            //selectHTML += " CHECKED";
            input.prop('checked', true);
          }
          //selectHTML += " type='radio'";
          input.attr({type: "radio"});
        } else {
          if((i == 0 && !hasCurrentVal && myself.defaultIfEmpty) || (hasCurrentVal && isSelected)) {
            //selectHTML += " CHECKED";
            input.prop('checked', true);
          }
          //selectHTML += " type='checkbox'";
          input.attr({type: "checkbox"});
        }
        input.attr({
          class: myself.name,
          name: myself.name,
          id: myself.name + i,
          value: myArray[i][vid]
        });
        input.appendTo(li);
        li.append($("<label/>")
          .attr({'for': myself.name + i})
          .text(myArray[i][1]));
        selectHTML
          .append(li)
          .append((myself.separator == undefined || myself.separator == null || myself.separator == "null") 
            ? "" : myself.separator);
      }
      //selectHTML += "</ul>"
      // update the placeholder
      //myself.placeholder().html(selectHTML);
      myself.placeholder().append(selectHTML);
      myself.currentVal = null;
      myself._doAutoFocus();
    },
    callAjaxAfterRender: function(m, name) {
      var myself = m;
      setTimeout(function(){
        myself.dashboard.processChange(name);
      },1);
    }
  });

  return ToggleButtonBaseComponent;

});
