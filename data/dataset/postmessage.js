var reURI = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/; // returns groups for protocol (2), domain (3) and port (4) 

function addListener(el, evt, fn) {
  if (window.addEventListener) {
    el.addEventListener(evt, fn, false);
  }
  else {
    el.attachEvent('on' + evt, fn);
  }
}

function getDomainName(url) {
  return url.match(reURI)[3];
}

function sendMessage(target, targetsUrl, command, params) {
  if (!params) {
    params = {};
  }
  
  params = JSON.stringify(params);
  target.postMessage([command, params].join(':'), targetsUrl);
}

var getXHR = (function() {
  var XMLHttpFactories = [
    function () { return new XMLHttpRequest(); },
    function () { return new ActiveXObject("Msxml2.XMLHTTP"); },
    function () { return new ActiveXObject("Msxml3.XMLHTTP"); },
    function () { return new ActiveXObject("Microsoft.XMLHTTP"); }
  ];

  var xmlhttp = false;
  for (var i=0;i<XMLHttpFactories.length;i++) {
    try {
      XMLHttpFactories[i]();
      xmlhttp = XMLHttpFactories[i];
    }
    catch (e) {
      continue;
    }
    break;
  }

  return xmlhttp;
}());