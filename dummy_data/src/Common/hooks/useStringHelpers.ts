type useDatesReturnType = {
  validStringAlphanumericFrench: (input: string) => boolean
  StringFormat: (str: string, ...args: (string | number)[]) => string
  convertStringIntoBoolean: (str: string | undefined | null) => boolean
  splitter: (str: string, query: string) => string[]
  sanitize: (str: string) => string
  ellipsify: (str: string, maxLength?: number) => string
}

const useStringHelpers = (): useDatesReturnType => {
  const validStringAlphanumericFrench = (input: string): boolean =>
    input.match(/^[a-zA-Z0-9À-ÿ' ]+$/) !== null && input.trim().length !== 0

  const StringFormat = (str: string, ...args: (string | number)[]): string =>
    str.replace(/{(\d+)}/g, (match, index) => args[index]?.toString() || '')

  const sanitizerMap: Record<string, string[]> = {
    e: ['é'],
    é: ['e'],
    è: ['e'],
    à: ['a'],
    a: ['à']
  }

  const sanitize = (text: string): string => {
    return text
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
  }

  const buildRegex = (query: string) => {
    return query
      .split('')
      .map((letter) =>
        sanitizerMap[letter] !== undefined
          ? `(?:${letter}|${sanitizerMap[letter].join('|')})`
          : letter
      )
      .join('')
  }

  const splitter = (text: string, query: string): string[] => {
    const regexWithQuery = new RegExp(`(${buildRegex(query)})`, 'gi')

    return text.split(regexWithQuery).filter((value) => value)
  }

  const ellipsify = (str: string, maxLength = 45) => {
    {
      if (!str) {
        return ''
      }

      return str.length > maxLength
        ? str.substring(0, 20) + '...' + str.substring(str.length - 10)
        : str
    }
  }

  const convertStringIntoBoolean = (str: string | undefined | null): boolean =>
    str === 'true'

  return {
    validStringAlphanumericFrench,
    StringFormat,
    convertStringIntoBoolean,
    splitter,
    sanitize,
    ellipsify
  }
}

export default useStringHelpers
