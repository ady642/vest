export const getFileName = (thePath): string => thePath.substring(thePath.lastIndexOf('/') + 1).split('.')[0]

export const findClosingBracketMatchIndex = (str, pos): number => {
    if (str[pos] != '{') {
        throw new Error("No '{' at index " + pos);
    }
    let depth = 1;
    for (let i = pos + 1; i < str.length; i++) {
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
    return -1;    // No matching closing parenthesis
}

export const addDoubleQuotes = (value: string): string => value.replace( /([a-zA-Z]+)/gm, str => `"${str}"`)

export const convertObjToArrayOfObj = <T extends Record<any, any>>(objOfObjs) => Object.entries(objOfObjs).map((e) => ( { [e[0]]: e[1] } ));
