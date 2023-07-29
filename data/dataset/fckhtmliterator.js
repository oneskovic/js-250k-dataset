

var FCKHtmlIterator = function( source )
{
	this._sourceHtml = source ;
}
FCKHtmlIterator.prototype =
{
	Next : function()
	{
		var sourceHtml = this._sourceHtml ;
		if ( sourceHtml == null )
			return null ;

		var match = FCKRegexLib.HtmlTag.exec( sourceHtml ) ;
		var isTag = false ;
		var value = "" ;
		if ( match )
		{
			if ( match.index > 0 )
			{
				value = sourceHtml.substr( 0, match.index ) ;
				this._sourceHtml = sourceHtml.substr( match.index ) ;
			}
			else
			{
				isTag = true ;
				value = match[0] ;
				this._sourceHtml = sourceHtml.substr( match[0].length ) ;
			}
		}
		else
		{
			value = sourceHtml ;
			this._sourceHtml = null ;
		}
		return { 'isTag' : isTag, 'value' : value } ;
	},

	Each : function( func )
	{
		var chunk ;
		while ( ( chunk = this.Next() ) )
			func( chunk.isTag, chunk.value ) ;
	}
} ;


var FCKHtmlIterator = function( source )
{
	this._sourceHtml = source ;
}
FCKHtmlIterator.prototype =
{
	Next : function()
	{
		var sourceHtml = this._sourceHtml ;
		if ( sourceHtml == null )
			return null ;

		var match = FCKRegexLib.HtmlTag.exec( sourceHtml ) ;
		var isTag = false ;
		var value = "" ;
		if ( match )
		{
			if ( match.index > 0 )
			{
				value = sourceHtml.substr( 0, match.index ) ;
				this._sourceHtml = sourceHtml.substr( match.index ) ;
			}
			else
			{
				isTag = true ;
				value = match[0] ;
				this._sourceHtml = sourceHtml.substr( match[0].length ) ;
			}
		}
		else
		{
			value = sourceHtml ;
			this._sourceHtml = null ;
		}
		return { 'isTag' : isTag, 'value' : value } ;
	},

	Each : function( func )
	{
		var chunk ;
		while ( ( chunk = this.Next() ) )
			func( chunk.isTag, chunk.value ) ;
	}
} ;
