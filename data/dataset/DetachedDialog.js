  
 
/** The DivDialog is used as a semi-independant means of using a Plugin outside of 
 *  Xinha, it does not depend on having a Xinha editor available - not that of of course
 *  Plugins themselves may (and very likely do) require an editor.
 *
 *  @param Div into which the dialog will draw itself.
 *
 *  @param HTML for the dialog, with the special subtitutions...
 *    id="[someidhere]" will assign a unique id to the element in question
 *        and this can be retrieved with yourDialog.getElementById('someidhere')   
 *    _(Some Text Here) will localize the text, this is used for within attributes
 *    <l10n>Some Text Here</l10n> will localize the text, this is used outside attributes
 *
 *  @param A function which can take a native (english) string and return a localized version,
 *   OR;   A "context" to be used with the standard Xinha._lc() method,
 *   OR;   Null - no localization will happen, only native strings will be used.
 *
 */

Xinha.DetachedDialog = function( html, localizer, size, options)
{
  var fakeeditor =
  {
    'config': new Xinha.Config(),
    'scrollPos': Xinha.prototype.scrollPos,
    '_someEditorHasBeenActivated': false,
    'saveSelection': function() { },
    'deactivateEditor' : function() { },
    '_textArea': document.createElement('textarea'),
    '_iframe'  : document.createElement('div'),
    '_doc'     : document,
    'hidePanels': function() { },    
    'showPanels': function() { },
    '_isFullScreen': false, // maybe not ?
    'activateEditor': function() { },
    'restoreSelection': function() { },
    'updateToolbar': function() { },
    'focusEditor': function() { }    
  };
  
  Xinha.Dialog.initialZ = 100;
  this.attached = false;
  
  Xinha.DetachedDialog.parentConstructor.call(this, fakeeditor, html, localizer, size, options);
}

Xinha.extend(Xinha.DetachedDialog, Xinha.Dialog);


Xinha.DetachedDialog.prototype.attachToPanel 
  = function() { return false; }
  
Xinha.DetachedDialog.prototype.detachFromToPanel 
  = function() { return false; }



