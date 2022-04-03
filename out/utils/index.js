"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEsLintCommand = exports.pascalize = exports.convertObjToArrayOfObj = exports.addDoubleQuotes = exports.findClosingMatchIndex = exports.getPath = exports.getFileName = void 0;
const getFileName = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1).split('.')[0];
exports.getFileName = getFileName;
const getPath = (pathAndName) => pathAndName.substring(0, pathAndName.lastIndexOf('/'));
exports.getPath = getPath;
const findClosingMatchIndex = (str, pos, characters = { open: '{', close: '}' }) => {
    if (str[pos] !== characters.open) {
        throw new Error(`No ${characters.open} at index ${pos}`);
    }
    let depth = 1;
    for (let i = pos + 1; i < str.length; i++) {
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
const addDoubleQuotes = (value) => value.replace(/([a-zA-Z]+)/gm, str => `"${str}"`);
exports.addDoubleQuotes = addDoubleQuotes;
const convertObjToArrayOfObj = (objOfObjs) => Object.entries(objOfObjs).map((e) => ({ [e[0]]: e[1] }));
exports.convertObjToArrayOfObj = convertObjToArrayOfObj;
const pascalize = (text) => text.replace(/(^\w|-\w)/g, clearAndUpper);
exports.pascalize = pascalize;
function clearAndUpper(text) {
    return text.replace(/-/, "").toUpperCase();
}
const buildEsLintCommand = (path) => `npx eslint ${path} --no-ignore --fix`;
exports.buildEsLintCommand = buildEsLintCommand;
//# sourceMappingURL=index.js.map