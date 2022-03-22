"use strict";
exports.__esModule = true;
exports.pascalize = exports.convertObjToArrayOfObj = exports.addDoubleQuotes = exports.findClosingMatchIndex = exports.getFileName = void 0;
var getFileName = function (thePath) { return thePath.substring(thePath.lastIndexOf('/') + 1).split('.')[0]; };
exports.getFileName = getFileName;
var findClosingMatchIndex = function (str, pos, characters) {
    if (characters === void 0) { characters = { open: '{', close: '}' }; }
    if (str[pos] != characters.open) {
        throw new Error("No ".concat(characters.open, " at index ").concat(pos));
    }
    var depth = 1;
    for (var i = pos + 1; i < str.length; i++) {
        switch (str[i]) {
            case characters.open:
                depth++;
                break;
            case characters.close:
                if (--depth === 0) {
                    return i;
                }
                break;
        }
    }
    return -1; // No matching end character
};
exports.findClosingMatchIndex = findClosingMatchIndex;
var addDoubleQuotes = function (value) { return value.replace(/([a-zA-Z]+)/gm, function (str) { return "\"".concat(str, "\""); }); };
exports.addDoubleQuotes = addDoubleQuotes;
var convertObjToArrayOfObj = function (objOfObjs) { return Object.entries(objOfObjs).map(function (e) {
    var _a;
    return (_a = {}, _a[e[0]] = e[1], _a);
}); };
exports.convertObjToArrayOfObj = convertObjToArrayOfObj;
var pascalize = function (text) { return text.replace(/(^\w|-\w)/g, clearAndUpper); };
exports.pascalize = pascalize;
function clearAndUpper(text) {
    return text.replace(/-/, "").toUpperCase();
}
