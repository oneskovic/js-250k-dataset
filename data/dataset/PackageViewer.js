/**
 * Shows the package details.
 */
qx.Class.define("apiviewer.ui.PackageViewer",
{
  extend : apiviewer.ui.AbstractViewer,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);
    this.addInfoPanel(new apiviewer.ui.panels.MethodPanel("functions", "functions"));
    this.addInfoPanel(new apiviewer.ui.panels.ClassPanel("classes", "classes", "class"));
    this.addInfoPanel(new apiviewer.ui.panels.ClassPanel("classes", "interfaces", "interface"));
    this.addInfoPanel(new apiviewer.ui.panels.ClassPanel("classes", "mixins", "mixin"));
    this.addInfoPanel(new apiviewer.ui.panels.PackagePanel("packages", "packages"));

    this.getContentElement().setAttribute("class", "ClassViewer");

    this._init(new apiviewer.dao.Package({}));
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    /**
     * Returns the HTML fragment for the title
     *
     * @param classNode {apiviewer.dao.Package} the package documentation node for the title
     * @return {String} HTML fragment of the title
     */
    _getTitleHtml : function(classNode)
    {
      var vHtml = "";

      // Title
      vHtml += '<small>package</small>';
      vHtml += classNode.getFullName();
      return vHtml;
    },

    _getTocHtml : function(classNode)
    {
      return document.createTextNode('');
    },

    _getDescriptionHtml : function(classNode)
    {
      var descHtml = new qx.util.StringBuilder();
      var desc = classNode.getDescription();
      if (desc != "") {
        descHtml.add(
          '<div class="class-description">',
          apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, classNode),
          '</div>');
      }
      return descHtml.get();
    }

  }
});
