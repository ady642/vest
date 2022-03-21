export const createBase64Image = (response: { data: any; headers: any }) => {
  const image = btoa(
    new Uint8Array(response.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  )

  return `data:${response.headers[
    'content-type'
  ].toLowerCase()};base64,${image}`
}

const acceptedTypes = [
  'bmp',
  'csv',
  'doc',
  'dot',
  'docx',
  'dotx',
  'docm',
  'dotm',
  'gif',
  'jfif',
  'jpe',
  'jpeg',
  'jpg',
  'msg',
  'mp4',
  'pdf',
  'ppt',
  'pptx',
  'pot',
  'pps',
  'ppa',
  'ppam',
  'png',
  'rtf',
  'sql',
  'tif',
  'tiff',
  'txt',
  'vsdx',
  'xsl',
  'xls',
  'xlsx',
  'xltx',
  'xlsm',
  'xltm',
  'xlam',
  'xlsb',
  'zip',
  'rar',
  'xml',
  'pbix',
  'ods',
  'one',
  'onea',
  'onetoc',
  'onetoc2',
  'onetmp',
  'onepkg'
]

export const isAcceptedFile = (file: File): boolean => {
  const extension = file.name.split('.').pop() ?? ''

  return acceptedTypes.includes(extension.toLowerCase())
}
