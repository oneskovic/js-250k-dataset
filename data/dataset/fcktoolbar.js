

var FCKToolbar = function()
{
	this.Items = new Array() ;
}

FCKToolbar.prototype.AddItem = function( item )
{
	return this.Items[ this.Items.length ] = item ;
}

FCKToolbar.prototype.AddButton = function( name, label, tooltip, iconPathOrStripInfoArrayOrIndex, style, state )
{
	if ( typeof( iconPathOrStripInfoArrayOrIndex ) == 'number' )
		 iconPathOrStripInfoArrayOrIndex = [ this.DefaultIconsStrip, this.DefaultIconSize, iconPathOrStripInfoArrayOrIndex ] ;

	var oButton = new FCKToolbarButtonUI( name, label, tooltip, iconPathOrStripInfoArrayOrIndex, style, state ) ;
	oButton._FCKToolbar = this ;
	oButton.OnClick = FCKToolbar_OnItemClick ;

	return this.AddItem( oButton ) ;
}

function FCKToolbar_OnItemClick( item )
{
	var oToolbar = item._FCKToolbar ;

	if ( oToolbar.OnItemClick )
		oToolbar.OnItemClick( oToolbar, item ) ;
}

FCKToolbar.prototype.AddSeparator = function()
{
	this.AddItem( new FCKToolbarSeparator() ) ;
}

FCKToolbar.prototype.Create = function( parentElement )
{
	var oDoc = FCKTools.GetElementDocument( parentElement ) ;

	var e = oDoc.createElement( 'table' ) ;
	e.className = 'TB_Toolbar' ;
	e.style.styleFloat = e.style.cssFloat = ( FCKLang.Dir == 'ltr' ? 'left' : 'right' ) ;
	e.dir = FCKLang.Dir ;
	e.cellPadding = 0 ;
	e.cellSpacing = 0 ;

	var targetRow = e.insertRow(-1) ;

	// Insert the start cell.
	var eCell ;

	if ( !this.HideStart )
	{
		eCell = targetRow.insertCell(-1) ;
		eCell.appendChild( oDoc.createElement( 'div' ) ).className = 'TB_Start' ;
	}

	for ( var i = 0 ; i < this.Items.length ; i++ )
	{
		this.Items[i].Create( targetRow.insertCell(-1) ) ;
	}

	// Insert the ending cell.
	if ( !this.HideEnd )
	{
		eCell = targetRow.insertCell(-1) ;
		eCell.appendChild( oDoc.createElement( 'div' ) ).className = 'TB_End' ;
	}

	parentElement.appendChild( e ) ;
}

var FCKToolbarSeparator = function()
{}

FCKToolbarSeparator.prototype.Create = function( parentElement )
{
	FCKTools.AppendElement( parentElement, 'div' ).className = 'TB_Separator' ;
}
