export const getFileName = (thePath: string): string => thePath.substring(thePath.lastIndexOf('/') + 1).split('.')[0];

export const findClosingMatchIndex = (str: string, pos: number, characters = { open: '{', close: '}' }): number => {
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
