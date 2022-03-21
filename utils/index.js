"use strict";
exports.__esModule = true;
exports.convertObjToArrayOfObj = exports.addDoubleQuotes = exports.findClosingBracketMatchIndex = exports.getFileName = void 0;
var getFileName = function (thePath) { return thePath.substring(thePath.lastIndexOf('/') + 1).split('.')[0]; };
exports.getFileName = getFileName;
var findClosingBracketMatchIndex = function (str, pos) {
    if (str[pos] != '{') {
        throw new Error("No '{' at index " + pos);
    }
    var depth = 1;
    for (var i = pos + 1; i < str.length; i++) {
        switch (str[i]) {
            case '{':
                depth++;
                break;
            case '}':
                if (--depth == 0) {
                    return i;
                }
                break;
        }
    }
    return -1; // No matching closing parenthesis
};
exports.findClosingBracketMatchIndex = findClosingBracketMatchIndex;
var addDoubleQuotes = function (value) { return value.replace(/([a-zA-Z]+)/gm, function (str) { return "\"".concat(str, "\""); }); };
exports.addDoubleQuotes = addDoubleQuotes;
var convertObjToArrayOfObj = function (objOfObjs) { return Object.entries(objOfObjs).map(function (e) {
    var _a;
    return (_a = {}, _a[e[0]] = e[1], _a);
}); };
exports.convertObjToArrayOfObj = convertObjToArrayOfObj;
