(function (global, doc) {

	define({

		'max-height': function (prop, value, selectors) {
			if (parseFloat(value) > 0) {
				return 'height:expression(cssx_minmax_boxHeight(this));\ncssx-max-height:' + value + ';\n';
			}
		},

		'min-height': function (prop, value, selectors) {
			if (parseFloat(value) > 0) {
				return 'height:expression(cssx_minmax_boxHeight(this));\ncssx-min-height:' + value + ';\n';
			}
		},

		'max-width': function (prop, value, selectors) {
			if (parseFloat(value) > 0) {
				return 'width:expression(cssx_minmax_boxWidth(this));\ncssx-max-width:' + value + ';\n';
			}
		},

		'min-width': function (prop, value, selectors) {
			if (parseFloat(value) > 0) {
				return 'width:expression(cssx_minmax_boxWidth(this));\ncssx-min-width:' + value + ';\n';
			}
		}

	});

	var testNode;

	function getPx (refNode, cssValue) {
		testNode = doc.createElement('div');
		global.attachEvent && global.attachEvent('unload', function () { testNode = null; });
		getPx = function (refNode, cssValue) {
			var result, number = parseFloat(cssValue);
			if (isNaN(number)) {
				result = 0;
			}
			else if (/px$/.test(cssValue)) {
				result = number;
			}
			else {
				// set font for text-dependent units
				testNode.style.fontFamily = refNode.currentStyle.fontFamily;
				testNode.style.fontSize = refNode.currentStyle.fontSize;
				testNode.style.height = cssValue;
				result = testNode.currentStyle ? parseInt(testNode.currentStyle.height) : '';
			}
			return result;
		};
		return getPx(refNode, cssValue);
	}

	// unfortunately, these functions must be global

	global['cssx_minmax_boxHeight'] = function (node) {
		var max = node.currentStyle['cssx-max-height'],
			min = node.currentStyle['cssx-min-height'];
		return Math.max(minPx = min ? getPx(node, min) : 0, Math.min(max ? getPx(node, max) : Infinity, node.scrollHeight)) + 'px';
	};

	global['cssx_minmax_boxWidth'] = function (node, maxVal, minVal) {
		var max = node.currentStyle['cssx-max-width'],
			min = node.currentStyle['cssx-min-width'];
		return Math.max(minPx = min ? getPx(node, min) : 0, Math.min(max ? getPx(node, max) : Infinity, node.scrollHeight)) + 'px';
	};

}(this, document));
