/**
 * @fileoverview A palette of symbols.
 *
 */

goog.provide('goog.editor.plugins.equation.SymbolPalette');

goog.require('goog.editor.plugins.equation.Palette');

goog.require('goog.math.Size');



/**
 * Constructs a new symbols palette.
 * @param {goog.editor.plugins.equation.PaletteManager} paletteManager The
 *     manager of the palette.
 * @extends {goog.editor.plugins.equation.Palette}
 * @constructor
 */
goog.editor.plugins.equation.SymbolPalette = function(paletteManager) {
  goog.editor.plugins.equation.Palette.call(this, paletteManager,
      goog.editor.plugins.equation.Palette.Type.SYMBOL,
      0, 50, 18, 18,
      ['\\times',
       '\\div',
       '\\cdot',
       '\\pm',
       '\\mp',
       '\\ast',
       '\\star',
       '\\circ',
       '\\bullet',
       '\\oplus',
       '\\ominus',
       '\\oslash',
       '\\otimes',
       '\\odot',
       '\\dagger',
       '\\ddagger',
       '\\vee',
       '\\wedge',
       '\\cap',
       '\\cup',
       '\\aleph',
       '\\Re',
       '\\Im',
       '\\top',
       '\\bot',
       '\\infty',
       '\\partial',
       '\\forall',
       '\\exists',
       '\\neg',
       '\\angle',
       '\\triangle',
       '\\diamond']);

  this.setSize(new goog.math.Size(7, 5));
};
goog.inherits(goog.editor.plugins.equation.SymbolPalette,
    goog.editor.plugins.equation.Palette);
