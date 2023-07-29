define(['./PivotLinkComponent.ext', './BaseComponent', '../lib/jquery', 'amd!../lib/jquery.fancybox'],
  function(PivotLinkComponentExt, BaseComponent, $) {

  var PivotLinkComponent = BaseComponent.extend({
    update: function() {
      var title = this.tooltip == undefined ? "View details in a Pivot table" : this.tooltip;
      // WPG: this assumes name is global name, can I pass in the object directly instead?
      var link = $('<a class="pivotLink"> </a>')
        .html(this.content)
        .attr("href", "javascript:require(['cdf/components/PivotLinkComponent'],function(PivotLinkComponent){PivotLinkComponent.openPivotLink(this.dashboard.getComponent('" + this.name + "'));});void(0);")
        .attr("title", title);
      $("#" + this.htmlObject).empty();
      $("#" + this.htmlObject).html(link);
      $('a.pivotLink').tooltip({
        showURL: false,
        track: true,
        delay: 1000,
        opacity: 0.5,
        content: title
      });
    }
  },

  {
    openPivotLink: function(object) {
      var url = PivotLinkComponentExt.getPivot("system", "pentaho-cdf/actions", "jpivot.xaction") + "&";
      var qd = object.pivotDefinition;
      var parameters = [];
      for (p in qd) {
        var key = p;
        var value = typeof qd[p] == 'function' ? qd[p]() : qd[p];
        parameters.push(key + "=" + encodeURIComponent(value));
      }
      url += parameters.join("&");
      url = url.replace(/'/g, "&#39;");
      $.fancybox({
        type: "iframe",
        href: url,
        width: $(window).width(),
        height: $(window).height()
      });
    }
  });

  return PivotLinkComponent;

});
