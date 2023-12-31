formfactor.register({
  'desktop': [
    'screen'
  ],
  'handheld': [
    'handheld',
    function() { 
     return navigator.userAgent.indexOf("Opera Mini") > 0; },
    function() { 
    return navigator.userAgent.indexOf("Opera Mobi") > 0; }
  ],
  'phone': [
    function() { return navigator.userAgent.indexOf(" Mobile ") > 0 } ,
    function() { return navigator.userAgent.indexOf(" iPhone ") > 0 },
  ],
  'tv': [
    'tv', 
    function() { return navigator.userAgent.indexOf("Google TV") > 0 }
  ],
  'tablet': [
    function () { return navigator.userAgent.indexOf("iPad") > 0 },
    function() { return navigator.userAgent.indexOf("Xoom") > 0 }
  ]
});

var factor = formfactor.detect([
  {
    "formfactor": "phone",
    "resources": ["/scripts/phone/jquery.touch.js", "/scripts/tablet/css-beziers.js", "/scripts/tablet/touchscroll.js", "/scripts/phone/controller.js", "/css/phone.css"]
  },
  {
    "formfactor": "tv",
    "resources": ["/scripts/tv/controller.js", "/css/tv.css"]
  },
  {
    "formfactor": "tablet",
    "resources": ["/css/tablet.css", '/css/tablet/touchscroll.css', "/scripts/tablet/jquery.touch.tablet.js", "/scripts/tablet/css-beziers.js", "/scripts/tablet/touchscroll.js", "/scripts/tablet/controller.js"]
  },
  {
    "formfactor": "handheld",
    "resources": ["/css/default.css"]  
  },
  {
    "formfactor": "desktop",
    "resources": ["/scripts/desktop/controller.js", "/css/desktop.css"]
  }
],
{
  "formfactor": "default",
  "resources": ["/css/default.css"]  
}
);

if(!!factor) {
  $(document).ready(function() {
    $("#formfactors a").live("click", function(e) {
      formfactor.override($(this).data().formfactor, { path: "/" });
      $("#formfactors a").removeClass("active");
      $(this).addClass("active");
      window.location.reload();
      return false;
    });
  
    $("#formfactors").append("<a href=\"#\" data-formfactor=\"phone\">Phone</a>");
    $("#formfactors").append("<a href=\"#\" data-formfactor=\"tablet\">Tablet</a>");
    $("#formfactors").append("<a href=\"#\" data-formfactor=\"desktop\">Desktop</a>");
    $("#formfactors").append("<a href=\"#\" data-formfactor=\"tv\">TV</a>");
    $("#formfactors [data-formfactor="+factor+"]").addClass("active");
  });
}
