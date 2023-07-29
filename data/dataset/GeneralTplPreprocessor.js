var asyncRequire = require("noder-js/asyncRequire").create(module);
var firstComment = /^\s*\/\*[\s\S]*?\*\//;
var alreadyGeneratedRegExp = /^\s*(?:var\s+|Aria\.classDefinition\()/;

var getExtension = function (filename) {
    var withoutPath = filename.replace(/^(.*\/)?([^/]*)$/, "$2");
    var dot = withoutPath.indexOf('.');
    if (dot > -1) {
        return withoutPath.substr(dot);
    }
    return "";
};

var isTemplateCompiled = function (fileContent) {
    fileContent = fileContent.replace(firstComment, ''); // removes first comment
    return alreadyGeneratedRegExp.test(fileContent);
};

var preprocessors = {
    ".tpl" : "./TplPreprocessor",
    ".tpl.css" : "./CSSPreprocessor",
    ".tpl.txt" : "./TxtPreprocessor",
    ".cml" : "./CmlPreprocessor",
    ".tml" : "./TmlPreprocessor"
};

module.exports = function (content, moduleFileName) {
    var ext = getExtension(moduleFileName);
    var curPreprocessorPath = preprocessors[ext];
    if (!curPreprocessorPath || isTemplateCompiled(content)) {
        return content;
    }
    return asyncRequire(curPreprocessorPath).spreadSync(function (curPreprocessor) {
        return curPreprocessor(content, moduleFileName);
    });
};
