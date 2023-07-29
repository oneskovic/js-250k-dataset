/*global enyo, Memo */

var ColorPickerView = "ColorPickerView";

enyo.kind({
  name: ColorPickerView,
  kind: "RadioGroup",
  className: 'color-picker',
  flex:1,
  events: {
    onColorChosen: ""
  },
  components: [
    {
      name: 'blue',
      onmousedown: "cancelMouseDown",
      icon: 'images/title-bar/color-picker-blue.png'
    },
    {
      name: 'yellow',
      onmousedown: "cancelMouseDown",
      icon: 'images/title-bar/color-picker-yellow.png'
    },
    {
      name: 'green',
      onmousedown: "cancelMouseDown",
      icon: 'images/title-bar/color-picker-green.png'
    },
    {
      name: 'pink',
      onmousedown: "cancelMouseDown",
      icon: 'images/title-bar/color-picker-pink.png'
    },
    {
      name: 'salmon',
      onmousedown: "cancelMouseDown",
      icon: 'images/title-bar/color-picker-salmon.png'
    }
  ],

  create: function() {
    this.inherited(arguments);
  },

  setColor: function(newColor) {
    this.setValue(Memo.colors.indexOf(newColor));
  },

  valueChanged: function() {
    this.inherited(arguments);
    var self = this;

    function setIcon(color, selected) {
      self.$[color].setIcon('images/title-bar/color-picker-' + (selected ? 'selected-' : '') + color + '.png');
    }

    if (this.currentColor) {
      setIcon(this.currentColor, false);
    }

    var newColor = Memo.colors[this.value];
    this.currentColor = newColor;

    setIcon(newColor, true);
    this.doColorChosen(newColor);
  },

  cancelMouseDown: function(inSender, inEvent) {
    enyo.stopEvent(inEvent);
  }
});
