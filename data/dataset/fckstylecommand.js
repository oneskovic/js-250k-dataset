

var FCKStyleCommand = function()
{}

FCKStyleCommand.prototype =
{
	Name : 'Style',

	Execute : function( styleName, styleComboItem )
	{
		FCKUndo.SaveUndoStep() ;

		if ( styleComboItem.Selected )
			FCK.Styles.RemoveStyle( styleComboItem.Style ) ;
		else
			FCK.Styles.ApplyStyle( styleComboItem.Style ) ;

		FCKUndo.SaveUndoStep() ;

		FCK.Focus() ;
		FCK.Events.FireEvent( 'OnSelectionChange' ) ;
	},

	GetState : function()
	{
		if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG || !FCK.EditorDocument )
			return FCK_TRISTATE_DISABLED ;

		if ( FCKSelection.GetType() == 'Control' )
		{
			var el = FCKSelection.GetSelectedElement() ;
			if ( !el || !FCKStyles.CheckHasObjectStyle( el.nodeName.toLowerCase() ) )
				return FCK_TRISTATE_DISABLED ;
		}

		return FCK_TRISTATE_OFF ;
	}
};
