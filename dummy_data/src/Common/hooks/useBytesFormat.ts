import prettyBytes from 'pretty-bytes'

type useBytesFormatReturnType = {
  format: (bytes: number) => string
}

const useBytesFormat = (): useBytesFormatReturnType => {
  const format = (bytes: number) => {
    return prettyBytes(bytes)
  }

  return {
    format
  }
}

export default useBytesFormat
