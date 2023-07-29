define([
  '../../../AddIn',
  '../../../Dashboard',
  '../../../lib/jquery',
  '../../../lib/CCC/tipsy',
  'amd!../../../lib/datatables',
  'css!./clippedText'],
  function(AddIn, Dashboard, $) {
  
  var clippedText = new AddIn({
    name: "clippedText",
    label: "Clipped Text",
    defaults: {
      showTooltip: true,
      useTipsy: false,
      style: {}
    },

    init: function() {
      $.fn.dataTableExt.oSort[this.name + '-asc'] = $.fn.dataTableExt.oSort['string-asc'];
      $.fn.dataTableExt.oSort[this.name + '-desc'] = $.fn.dataTableExt.oSort['string-desc'];
    },
    
    implementation: function(tgt, st, opt) {
      var $tgt = $(tgt),
        $container = $("<div>");

      $tgt.empty().append($container);
      $container.text(st.value).addClass("clippedText").attr("title", opt.showTooltip ? st.value : "");
      $container.css(opt.style);
      if(opt.useTipsy) {
        $container.tipsy({
          gravity: 's', 
          html: false
        });
      }
    }
  });

  Dashboard.registerGlobalAddIn("Table", "colType", clippedText);

  return clippedText;

});
