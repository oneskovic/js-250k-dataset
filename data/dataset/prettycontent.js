function xml2htmlToggle(event) {

    var mark;
    if (event.srcElement) {
      mark = event.srcElement;
    } else {
      mark = event.target;
    }

    while ((mark.className != "b") && (mark.nodeName != "BODY")) {
        mark = mark.parentNode
    }

    var e = mark;

    while ((e.className != "e") && (e.nodeName != "BODY")) {
        e = e.parentNode
    }

    if (mark.childNodes[0].nodeValue == "+") {
        mark.childNodes[0].nodeValue = "-";
        var starthiding = false;
        for (var i = 0; i < e.childNodes.length; i++) {
            var name = e.childNodes[i].nodeName;
            if (name != "#text") {
              if (starthiding) {
                if (name == "PRE" || name == "SPAN") {
                  window.status = "inline";
                  e.childNodes[i].style.display = "inline";
                } else {
                  e.childNodes[i].style.display = "block";
                }
              } else {
                 starthiding = true;
              }
            }
        }
    } else if (mark.childNodes[0].nodeValue == "-") {
        mark.childNodes[0].nodeValue = "+";
        var starthiding = false;
        for (var i = 0; i < e.childNodes.length; i++) {
            if (e.childNodes[i].nodeName != "#text") {
                if (starthiding) {
                    e.childNodes[i].style.display = "none";
                } else {
                    starthiding = true;
                }
            }
        }
    }
} 
