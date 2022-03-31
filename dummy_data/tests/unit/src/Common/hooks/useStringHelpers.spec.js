"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useStringHelpers_1 = require("@/Common/hooks/useStringHelpers");
const { splitter, convertStringIntoBoolean, StringFormat, validStringAlphanumericFrench, ellipsify, sanitize } = (0, useStringHelpers_1.default)();
describe('useStringHelpers', () => {
    test.each([
        {
            text: 'pépé DOMINGUEZ',
            expected: 'pepe dominguez'
        }
    ])('sanitize', ({ text, expected }) => {
        expect(sanitize(text)).toBe(expected);
    });
    test.each([
        {
            text: 'je suis le fichier long de beaucoup de ligne.pdf',
            expected: 'je suis le fichier l... ligne.pdf',
            maxLength: 47
        },
        {
            text: 'je suis le fichier long de beaucoup de ligne.pdf',
            expected: 'je suis le fichier long de beaucoup de ligne.pdf',
            maxLength: 48
        },
        {
            text: 'je suis le fichier long de beaucoup de ligne.pdf',
            expected: 'je suis le fichier long de beaucoup de ligne.pdf',
            maxLength: 49
        }
    ])('ellipsify', ({ text, maxLength, expected }) => {
        expect(ellipsify(text, maxLength)).toBe(expected);
    });
    test.each([
        {
            sentence: 'columbo is a serie with peter falk acting as columbo character',
            separator: 'columbo',
            result: [
                'columbo',
                ' is a serie with peter falk acting as ',
                'columbo',
                ' character'
            ]
        },
        {
            sentence: 'pépé dominguez',
            separator: 'pepe',
            result: ['pépé', ' dominguez']
        },
        {
            sentence: 'pepe dominguez',
            separator: 'pépé',
            result: ['pepe', ' dominguez']
        },
        {
            sentence: 'Pépé dominguez',
            separator: 'pepe',
            result: ['Pépé', ' dominguez']
        },
        {
            sentence: 'Pépé dominguez',
            separator: 'pe',
            result: ['Pé', 'pé', ' dominguez']
        },
        {
            sentence: 'pepe DOMINGUEZ',
            separator: 'DOMINGUEZ',
            result: ['pepe ', 'DOMINGUEZ']
        }
    ])('splitter', ({ sentence, separator, result }) => {
        const keywords = splitter(sentence, separator);
        expect(keywords).toEqual(result);
    });
    test.each([
        ['Test', 'Test', 'Hello', 'World'],
        ['{0} {1}', 'Hello World', 'Hello', 'World'],
        ['{0} {1}', ' '],
        ['Hello {0} {0} {1}', 'Hello World World !', 'World', '!']
    ])('StringFormat when text format is "%s" and expected "%s" with args %p', (text, expected, ...args) => {
        expect(StringFormat(text, ...args)).toBe(expected);
    });
    test.each([
        ['test', true],
        ['test1234', true],
        ['test 1234', true],
        ['test é à ù ç', true],
        ['test/', false],
        ['test,', false],
        ['test;test', false],
        [' ', false],
        [' test', true],
        ['test test', true]
    ])('validStringAlphanumericFrench when text is "%s" should be "%p"', (text, expected) => {
        expect(validStringAlphanumericFrench(text)).toBe(expected);
    });
    test.each([
        ['', false],
        [undefined, false],
        [null, false],
        ['false', false],
        ['true', true]
    ])('convertStringIntoBoolean when text is "%s" should be "%p"', (text, expected) => {
        expect(convertStringIntoBoolean(text)).toBe(expected);
    });
});
//# sourceMappingURL=useStringHelpers.spec.js.map