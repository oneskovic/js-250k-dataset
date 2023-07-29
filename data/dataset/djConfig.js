/*
 defaults for dojoConfig (dojo). to make use of the defaults
 simple extend it rather than redefine it. This will result in the
 combination of the two (must come after webcontext.js include):

  <script type="text/javascript" src="webcontext.js?content=common-ui"></script>
  <script type="text/javascript">

    $.extend(dojoConfig,
        { modulePaths: {
            'pentaho.common': "../pentaho/common"
        },
        parseOnLoad: true,
        baseUrl: '../dojo/dojo/'
    });

  </script>



  *if you want to completely ignore the defaults, just define the dojoConfig var like normal
    <script type="text/javascript">
      var dojoConfig = { modulePaths: {
              'pentaho.common': "../pentaho/common"
          },
          parseOnLoad: true,
          baseUrl: '../dojo/dojo/'
      });
    </script>
 */

// don't overwrite this if they've set dojoConfig ahead of time
if(dojoConfig == 'undefined' || dojoConfig == undefined) {
  var url = (window.location != window.parent.location) ? document.referrer: document.location.href;
  var dojoConfig = {
    disableFlashStorage: true, /* turn off flash storage for client-side caching */
    locale: url.match(/locale=([\w\-]+)/) ? RegExp.$1 : "en" /* look for a locale=xx query string param, else default to 'en' */
  };
} else {
  if(dojoConfig['disableFlashStorage'] == 'undefined' || dojoConfig['disableFlashStorage'] == undefined) {
    dojoConfig.disableFlashStorage = true;
  }
}
