var ast = require("./tst-ast.json");
// or: var ast = require("esprima").parse("f(1, x) + 2");

var traverse = require("../ast-traverse");

// print AST node types, pre-order (node first, then its children)
traverse(ast, {pre: function(node, parent, prop, idx) {
    console.log(node.type + (parent ? " from parent " + parent.type +
        " via " + prop + (idx !== undefined ? "[" + idx + "]" : "") : ""));
}});
console.log();
/*
 =>
 Program
 ExpressionStatement from parent Program via body[0]
 BinaryExpression from parent ExpressionStatement via expression
 CallExpression from parent BinaryExpression via left
 Identifier from parent CallExpression via callee
 Literal from parent CallExpression via arguments[0]
 Identifier from parent CallExpression via arguments[1]
 Literal from parent BinaryExpression via right
 */


// you can also visit post-order, or both
// all four arguments are provided to both visitors (left out unused below)
var indent = 0;
traverse(ast, {
    pre: function(node) {
        console.log(Array(indent + 1).join(" ") + node.type);
        indent += 4;
    },
    post: function() {
        indent -= 4;
    }
});
console.log();
/*
=>
 Program
     ExpressionStatement
         BinaryExpression
             CallExpression
                 Identifier
                 Literal
                 Identifier
             Literal
*/


// return false from the pre-visitor to skip traversing its children
// throw an exception to abort traversal


// by default node property names beginning with $ are skipped
// but you can supply your own skipProperty function instead
traverse(ast, {
    pre: function(node) {
        console.log(node.type);
    },
    skipProperty: function(prop, node) {
        return prop === "parent" || prop === "expression";
    }
});
/*
=>
 Program
 ExpressionStatement
*/
