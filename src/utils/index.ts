const isWindows = process.platform === "win32";
const separator = isWindows ?  '\\' : '/'

export const getFileName = (thePath: string): string => thePath.substring(thePath.lastIndexOf(separator) + 1).split('.')[0];

export const getPath = (pathAndName: string): string => pathAndName.substring(0, pathAndName.lastIndexOf(separator));

export const findClosingMatchIndex = (str: string, pos: number, characters = { open: '{', close: '}' }): number => {
    console.log(str[pos-1]);
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
    return -1;    // No matching end character
};


export const addDoubleQuotes = (value: string): string => value.replace( /([a-zA-Z]+)/gm, str => `"${str}"`);

export const convertObjToArrayOfObj = <T extends Record<any, any>>(objOfObjs: {}) => Object.entries(objOfObjs).map((e) => ( { [e[0]]: e[1] } ));

export const pascalize = (text: string) => text.replace(/(^\w|-\w)/g, clearAndUpper);

function clearAndUpper(text: string) {
    return text.replace(/-/, "").toUpperCase();
}

export const buildEsLintCommand = (path: string) => `npx eslint ${path} --no-ignore --fix`;