goog.provide('goog.ui.equation.MathPalette');

goog.require('goog.math.Size');
goog.require('goog.ui.equation.Palette');



/**
 * Constructs a new math palette.
 * @param {goog.ui.equation.PaletteManager} paletteManager The
 *     manager of the palette.
 * @extends {goog.ui.equation.Palette}
 * @constructor
 * @final
 */
goog.ui.equation.MathPalette = function(paletteManager) {
  goog.ui.equation.Palette.call(this, paletteManager,
      goog.ui.equation.Palette.Type.MATH,
      0, 90, 30, 56,
      ['x_{a}',
       'x^{b}',
       'x_{a}^{b}',
       '\\bar{x}',
       '\\tilde{x}',
       '\\frac{a}{b}',
       '\\sqrt{x}',
       '\\sqrt[n]{x}',
       '\\bigcap_{a}^{b}',
       '\\bigcup_{a}^{b}',
       '\\prod_{a}^{b}',
       '\\coprod_{a}^{b}',
       '\\left( x \\right)',
       '\\left[ x \\right]',
       '\\left\\{ x \\right\\}',
       '\\left| x \\right|',
       '\\int_{a}^{b}',
       '\\oint_{a}^{b}',
       '\\sum_{a}^{b}{x}',
       '\\lim_{a \\rightarrow b}{x}']);
  this.setSize(new goog.math.Size(10, 2));
};
goog.inherits(goog.ui.equation.MathPalette, goog.ui.equation.Palette);
