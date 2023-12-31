"use strict";

var assert = require("assert");
var error = require("./../lib/error");
var core = require("./core");
var forOf = require("./forOf");
var destructuring = require("./destructuring");

function isObjectPattern(node) {
	return node && node.type == 'ObjectPattern';
}

function isArrayPattern(node) {
	return node && node.type == 'ArrayPattern';
}

var plugin = module.exports = {
	reset: function() {

	}

	, setup: function(alter, ast, options) {
		if( !this.__isInit ) {
			this.reset();
			this.__isInit = true;
		}

		this.alter = alter;
		this.options = options;
	}

	, '::ComprehensionExpression': function(node) {
		var blocks = node.blocks
			, body = node.body
			, filter = node.filter
		;

		var beforeBodyString = "";
		var afterBodyString = "";
		var variableNames = [];

		for( var i = 0, len = blocks.length ; i < len ; i++ ) {
			var block = blocks[i];

			var variableBlock = block.left;

			if( variableBlock.type === "Identifier") {
				variableNames.push(variableBlock.name);
			}
			else if(isObjectPattern(variableBlock) || isArrayPattern(variableBlock)) {
				// creating a 'var <variable_name>' is already in forOf
			}
			else {
				assert(false)
			}

			if( block["of"] === true ) {
				var replacementObj = forOf.createForOfReplacement(block, node);

				beforeBodyString += (
					replacementObj.before
					+ "for(" + replacementObj.loop + ")"
					+ "{" + replacementObj.inner
				);

				afterBodyString = (
					"}" + replacementObj.after
				) + afterBodyString;
			}
			else {
				beforeBodyString += (
					"for("
					+ this.alter.get(block.left.range[0], block.left.range[1])
					+ " in "
					+ this.alter.get(block.right.range[0], block.right.range[1])
					+ "){"
				);

				afterBodyString = (
					"}"
				) + afterBodyString;
			}
		}

		var resultVariableName = core.unique("$result", true);

		var replacementString =
			"var " + resultVariableName + " = []" + (variableNames.length ? ", " + variableNames.join(",") : "") + ";"
			+ beforeBodyString
			+ (filter ? "if(" + this.alter.get(filter.range[0], filter.range[1]) + ")" : "")
			+ "{" + resultVariableName + ".push("
			+ this.alter.get(body.range[0], body.range[1])
			+ ")}"
			+ afterBodyString
			+ ";return " + resultVariableName + "})"
		;

		if( node.$scope.closestHoistScope().doesThisUsing() ) {
			replacementString += ".call(this)";
		}
		else {
			replacementString += "()";
		}

		this.alter.replace(
			node.range[0]
			, node.range[0] + 1
			, "(function(){"
		);
		// between node.range[0] and (node.range[0] + 1) is a place for inserting from another part of the program
		this.alter.replace(
			node.range[0] + 1
			, node.range[1]
			, replacementString
		);

	}
};

for(var i in plugin) if( plugin.hasOwnProperty(i) && typeof plugin[i] === "function" ) {
	plugin[i] = plugin[i].bind(plugin);
}
