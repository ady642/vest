const keyify = (obj: any, prefix = ''): string[] => {
  return Object.keys(obj).reduce((acc: any, key: any) => {
    if (typeof obj[key] === 'object') {
      return [...acc, ...keyify(obj[key], `${prefix}${key}.`)]
    }

    return [...acc, `${prefix}${key}`]
  }, [])
}

export { keyify }
