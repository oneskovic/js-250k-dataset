/* Author: Chas Emerick <cemerick@snowtide.com> */
diffview = {
	/**
	 * Builds and returns a visual diff view.  The single parameter, `params', should contain
	 * the following values:
	 *
	 * - baseTextLines: the array of strings that was used as the base text input to SequenceMatcher
	 * - newTextLines: the array of strings that was used as the new text input to SequenceMatcher
	 * - opcodes: the array of arrays returned by SequenceMatcher.get_opcodes()
	 * - baseTextName: the title to be displayed above the base text listing in the diff view; defaults
	 *	   to "Base Text"
	 * - newTextName: the title to be displayed above the new text listing in the diff view; defaults
	 *	   to "New Text"
	 * - contextSize: the number of lines of context to show around differences; by default, all lines
	 *	   are shown
	 * - viewType: if 0, a side-by-side diff view is generated (default); if 1, an inline diff view is
	 *	   generated
	 */
	buildView: function (prms) {
		var baseTextLines = prms.baseTextLines;
		    newTextLines  = prms.newTextLines;
		    opcodes       = prms.opcodes;
        baseTextName  = prms.baseTextName // ? params.baseTextName : "Base Text";
        newTextName   = prms.newTextName //? params.newTextName : "New Text";

    var d = document;
    
		function celt (name, clazz) {
			var e = d.createElement(name);
			e.className = clazz;
			return e;
		}
		
		function telt (name, text) {
			var e = d.createElement(name);
			e.appendChild(d.createTextNode(text));
			return e;
		}
		
		function ctelt (name, clazz, text) {
			var e = d.createElement(name);
			e.className = clazz;
			e.appendChild(d.createTextNode(text));
			return e;
		}
	
		var tdata = d.createElement("thead");
		var node = d.createElement("tr");
		tdata.appendChild(node);

			node.appendChild(d.createElement("th"));
			node.appendChild(ctelt("th", "texttitle", baseTextName));
			node.appendChild(d.createElement("th"));
			node.appendChild(ctelt("th", "texttitle", newTextName));

		tdata = [tdata];
		
		var rows = [];
		var node2;
		
		/**
		 * Adds two cells to the given row; if the given row corresponds to a real
		 * line number (based on the line index tidx and the endpoint of the 
		 * range in question tend), then the cells will contain the line number
		 * and the line of text from textLines at position tidx (with the class of
		 * the second cell set to the name of the change represented), and tidx + 1 will
		 * be returned.	 Otherwise, tidx is returned, and two empty cells are added
		 * to the given row.
		 */
		function addCells (row, tidx, tend, textLines, change) {
			if (tidx < tend) {
				row.appendChild(telt("th", (tidx + 1).toString()));
				row.appendChild(ctelt("td", change, textLines[tidx].replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")));
				return tidx + 1;
			} else {
				row.appendChild(d.createElement("th"));
				row.appendChild(celt("td", "empty"));
				return tidx;
			}
		}
		

		for (var idx = 0; idx < opcodes.length; idx++) {
			code = opcodes[idx];
			change = code[0];
			var b = code[1],
			    be = code[2],
			    n = code[3],
			    ne = code[4],
			    rowcnt = Math.max(be - b, ne - n),
			    toprows = [],
			    botrows = [];
			for (var i = 0; i < rowcnt; i++) {
				toprows.push(node = d.createElement("tr"));
				b = addCells(node, b, be, baseTextLines, change);
				n = addCells(node, n, ne, newTextLines, change);
			}

			for (var i = 0; i < toprows.length; i++) rows.push(toprows[i]);
			for (var i = 0; i < botrows.length; i++) rows.push(botrows[i]);
		}
		
		
		tdata.push(node = d.createElement("tbody"));
		
		
		for( var i = 0; i < rows.length; i++ ) {
		  node.appendChild(rows[i]);
		}
		
		node = celt("table", "diff");
		for( var i = 0; i < tdata.length; i++ ){
		  node.appendChild(tdata[i]);
		}
		
		return node;
	}
};