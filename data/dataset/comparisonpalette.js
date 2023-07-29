goog.provide('goog.editor.plugins.equation.ComparisonPalette');

goog.require('goog.editor.plugins.equation.Palette');

goog.require('goog.math.Size');



/**
 * Constructs a new comparison palette.
 * @param {goog.editor.plugins.equation.PaletteManager} paletteManager The
 *     manager of the palette.
 * @extends {goog.editor.plugins.equation.Palette}
 * @constructor
 */
goog.editor.plugins.equation.ComparisonPalette = function(paletteManager) {
  goog.editor.plugins.equation.Palette.call(this, paletteManager,
      goog.editor.plugins.equation.Palette.Type.COMPARISON,
      0, 70, 18, 18,
      ['\\leq',
       '\\geq',
       '\\prec',
       '\\succ',
       '\\preceq',
       '\\succeq',
       '\\ll',
       '\\gg',
       '\\equiv',
       '\\sim',
       '\\\simeq',
       '\\\asymp',
       '\\approx',
       '\\ne',
       '\\\subset',
       '\\supset',
       '\\subseteq',
       '\\supseteq',
       '\\in',
       '\\ni',
       '\\notin']);
  this.setSize(new goog.math.Size(7, 3));
};
goog.inherits(goog.editor.plugins.equation.ComparisonPalette,
    goog.editor.plugins.equation.Palette);
