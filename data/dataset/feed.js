/**
 * Date data model for a news feed
 */
qx.Class.define("feedreader.model.Feed",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param title {String} feed title
   * @param url {String} feed url
   * @param category {String?""} feed category
   */
  construct: function(title, url, category)
  {
    this.base(arguments);

    this.set({
      url: url,
      title: title,
      category : category || ""
    });


    this.setArticles(new qx.data.Array());
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** The articles in an array */
    articles :
    {
      check : "qx.data.Array",
      event : "changeArticles"
    },


    /** The currently selected article */
    selectedArticle :
    {
      nullable: true
    },


    /** The feed URL */
    url :
    {
      check : "String",
      event : "changeUrl"
    },


    /** The feed title */
    title :
    {
      check : "String",
      event : "changeTitle"
    },


    /** The feed category */
    category :
    {
      check : "String",
      init : "",
      event : "dataModified"
    },


    /** The current loading state */
    state :
    {
      check : ["new", "loading", "loaded", "error", "cached"],
      init : "new",
      event : "stateModified"
    }
  }
});