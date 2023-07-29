function HtmlEntities(editor) {
	this.editor = editor;
}

HtmlEntities._pluginInfo = {
  name          : "HtmlEntities",
  version       : "1.0",
  developer     : "Raimund Meyer",
  developer_url : "http://x-webservice.net",
  c_owner       : "Xinha community",
  sponsor       : "",
  sponsor_url   : "",
  license       : "HTMLArea"
}
Xinha.Config.prototype.HtmlEntities =
{
	Encoding     : 'iso-8859-1',
	EntitiesFile : Xinha.getPluginDir("HtmlEntities") + "/Entities.js"
}
HtmlEntities.prototype.onGenerate = function() {
    var e = this.editor;
    var url = (e.config.HtmlEntities.Encoding) ?  Xinha.getPluginDir("HtmlEntities") + "/"+e.config.HtmlEntities.Encoding+".js" : e.config.HtmlEntities.EntitiesFile;
    var callback = function (getback) {
    	var specialReplacements = e.config.specialReplacements;
    	eval("var replacements =" + getback);
    	for (var i in  replacements)
		{
			specialReplacements[i] =  replacements[i];	
		}
    }
    Xinha._getback(url,callback);
}
