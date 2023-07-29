var editColor = {
  init : function() {
    var colors = window.arguments[0].colors;
    if (!colors) { // adding a new color 
      var textHex = document.getElementById("text-value");
      textHex.removeAttribute("readonly");
      textHex.focus();
    }
    else {
      editColor.colors = colors;
      editColor.loadColors(colors, true, window.arguments[0].url);
    }
  },

  loadColors : function(colors, editing, url) {
    var textTags = document.getElementById("text-tags");
    
    if(colors.length == 1) {
      var color = colors[0];
      if(!url)
        url = rainbowc.storage.urlOf(rainbowColor.toHex(color));
      var textColor = document.getElementById("text-color");
      textColor.style.backgroundColor = colors;
      textTags.value = rainbowc.storage.tagsOf(rainbowColor.toHex(color));
    }
    else {
      document.getElementById("color-row").hidden = true;
    }

    var textHex = document.getElementById("text-value");
    if(editing)
      textHex.value = rainbowc.getFormattedColors(colors).join(",");
    var textUrl = document.getElementById("text-url");
    textUrl.value = url;
    
    if(editing)
      textTags.focus();
  },

  changeColor : function() {
    var textHex = document.getElementById("text-value");
    var newColor = textHex.value;
    if(newColor && rainbowColor.isValid(newColor))
      editColor.loadColor(newColor, false);
  },

  saveColor : function() {
    var tags = document.getElementById("text-tags").value;
    var url = document.getElementById("text-url").value;
    var button = window.arguments[0].button;
    var colors = editColor.colors;

    for(var i = 0; i < colors.length; i++)
      rainbowc.storage.addColor(rainbowColor.toHex(colors[i]), tags, url);
    
    if(button) {
      var command = "rainbowc.openLibrary('" + colors[0] + "')";
      if(button.nodeName == 'label') {
        button.value = document.getElementById("rainbow-strings").getString("rainbow.view");
        button.removeAttribute("onclick"); // bug 
        button.setAttribute("onclick", command);
      }
      else {
        button.label = document.getElementById("rainbow-strings").getString("rainbow.view");
        button.removeAttribute("oncommand"); // bug 
        button.setAttribute("oncommand", command);
      }
    }
    window.close();
  },
 
  cancelDialog : function() {
    window.close();
  },

  keyPressed : function(event) {
    switch (event.keyCode) {
      case event.DOM_VK_RETURN:
        editColor.saveColor();
        break;
      case event.DOM_VK_ENTER:
        editColor.saveColor();
        break;
      default:
        break;
    }  
  }
};

