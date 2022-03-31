"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useStringHelpers = () => {
    const validStringAlphanumericFrench = (input) => input.match(/^[a-zA-Z0-9À-ÿ' ]+$/) !== null && input.trim().length !== 0;
    const StringFormat = (str, ...args) => str.replace(/{(\d+)}/g, (match, index) => args[index]?.toString() || '');
    const sanitizerMap = {
        e: ['é'],
        é: ['e'],
        è: ['e'],
        à: ['a'],
        a: ['à']
    };
    const sanitize = (text) => {
        return text
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase();
    };
    const buildRegex = (query) => {
        return query
            .split('')
            .map((letter) => sanitizerMap[letter] !== undefined
            ? `(?:${letter}|${sanitizerMap[letter].join('|')})`
            : letter)
            .join('');
    };
    const splitter = (text, query) => {
        const regexWithQuery = new RegExp(`(${buildRegex(query)})`, 'gi');
        return text.split(regexWithQuery).filter((value) => value);
    };
    const ellipsify = (str, maxLength = 45) => {
        {
            if (!str) {
                return '';
            }
            return str.length > maxLength
                ? str.substring(0, 20) + '...' + str.substring(str.length - 10)
                : str;
        }
    };
    const convertStringIntoBoolean = (str) => str === 'true';
    return {
        validStringAlphanumericFrench,
        StringFormat,
        convertStringIntoBoolean,
        splitter,
        sanitize,
        ellipsify
    };
};
exports.default = useStringHelpers;
//# sourceMappingURL=useStringHelpers.js.map