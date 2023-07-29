

var FCKMenuBlockPanel = function()
{
	// Call the "base" constructor.
	FCKMenuBlock.call( this ) ;
}

FCKMenuBlockPanel.prototype = new FCKMenuBlock() ;


// Override the create method.
FCKMenuBlockPanel.prototype.Create = function()
{
	var oPanel = this.Panel = ( this.Parent && this.Parent.Panel ? this.Parent.Panel.CreateChildPanel() : new FCKPanel() ) ;
	oPanel.AppendStyleSheet( FCKConfig.SkinEditorCSS ) ;

	// Call the "base" implementation.
	FCKMenuBlock.prototype.Create.call( this, oPanel.MainNode ) ;
}

FCKMenuBlockPanel.prototype.Show = function( x, y, relElement )
{
	if ( !this.Panel.CheckIsOpened() )
		this.Panel.Show( x, y, relElement ) ;
}

FCKMenuBlockPanel.prototype.Hide = function()
{
	if ( this.Panel.CheckIsOpened() )
		this.Panel.Hide() ;
}
