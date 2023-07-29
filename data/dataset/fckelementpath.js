

var FCKElementPath = function( lastNode )
{
	var eBlock = null ;
	var eBlockLimit = null ;

	var aElements = new Array() ;

	var e = lastNode ;
	while ( e )
	{
		if ( e.nodeType == 1 )
		{
			if ( !this.LastElement )
				this.LastElement = e ;

			var sElementName = e.nodeName.toLowerCase() ;
			if ( FCKBrowserInfo.IsIE && e.scopeName != 'HTML' )
				sElementName = e.scopeName.toLowerCase() + ':' + sElementName ;

			if ( !eBlockLimit )
			{
				if ( !eBlock && FCKListsLib.PathBlockElements[ sElementName ] != null )
					eBlock = e ;

				if ( FCKListsLib.PathBlockLimitElements[ sElementName ] != null )
				{
					// DIV is considered the Block, if no block is available (#525)
					// and if it doesn't contain other blocks.
					if ( !eBlock && sElementName == 'div' && !FCKElementPath._CheckHasBlock( e ) )
						eBlock = e ;
					else
						eBlockLimit = e ;
				}
			}

			aElements.push( e ) ;

			if ( sElementName == 'body' )
				break ;
		}
		e = e.parentNode ;
	}

	this.Block = eBlock ;
	this.BlockLimit = eBlockLimit ;
	this.Elements = aElements ;
}

/**
 * Check if an element contains any block element.
 */
FCKElementPath._CheckHasBlock = function( element )
{
	var childNodes = element.childNodes ;

	for ( var i = 0, count = childNodes.length ; i < count ; i++ )
	{
		var child = childNodes[i] ;

		if ( child.nodeType == 1 && FCKListsLib.BlockElements[ child.nodeName.toLowerCase() ] )
			return true ;
	}

	return false ;
}
