/* Module Meta Data
	type: Object
	importance: 1
	codeCompleteness: 100
	docCompleteness: 5
*/

/*?
	Introduction
		The =Uize.Build.Util.Whitespace= module provides a means for altering the line break and indent characters for files that contain normalized whitespace characters.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Build.Util.Whitespace',
	required:'Uize.Str.Lines',
	builder:function () {
		'use strict';

		var
			/*** Variables for Scruncher Optimization ***/
				_Uize_Str_Lines = Uize.Str.Lines,
				_undefined,

			/*** Variables for Performance Optimization ***/
				_switchIndentType = _Uize_Str_Lines.switchIndentType,
				_switchLinebreakType = _Uize_Str_Lines.switchLinebreakType
		;

		return Uize.package ({
			alterNormalizedWhitespace:function (_sourceStr,_whitespaceOptions) {
				if (_whitespaceOptions) {
					var
						_indentChars = _whitespaceOptions.indentChars,
						_linebreakChars = _whitespaceOptions.linebreakChars
					;
					if (_indentChars != _undefined && _indentChars != '\t')
						_sourceStr = _switchIndentType (_sourceStr,'\t',_indentChars)
					;
					if (_linebreakChars != _undefined && _linebreakChars != '\n')
						_sourceStr = _switchLinebreakType (_sourceStr,_linebreakChars)
					;
				}
				return _sourceStr;
			}
		});
	}
});

