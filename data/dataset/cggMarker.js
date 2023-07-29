define([
  'cdf/AddIn',
  'cdf/Dashboard.Clean',
  'cdf/components/CggComponent.ext'],
  function(AddIn, Dashboard, CggComponentExt) {
  
  var cggMarker = new AddIn({
    name: "cggMarker",
    label: "CGG Marker",
    defaults: {},
    implementation: function(tgt, st, opt) {
      var url = CggComponentExt.getCggDrawUrl() + '?script=' + st.cggGraphName;

      var width = st.width;
      var height = st.height;
      var cggParameters = {};
      if(st.width) {cggParameters.width = st.width;}
      if(st.height) {cggParameters.height = st.height;}

      cggParameters.noChartBg = true;

      for(parameter in st.parameters) {
        cggParameters[parameter] = st.parameters[parameter];
      }

      // Check debug level and pass as parameter
      var level = Dashboard.debug; //TODO: review
      if(level > 1) {
        cggParameters.debug = true;
        cggParameters.debugLevel = level;
      }

      for(parameter in cggParameters) {
        if(cggParameters[parameter] !== undefined) {
          url += "&param" + parameter + "=" + encodeURIComponent(cggParameters[parameter]);
        }
      }

      return url;

    }
  });
  Dashboard.registerGlobalAddIn("NewMapComponent", "MarkerImage", cggMarker);

  return cggMarker;

});
