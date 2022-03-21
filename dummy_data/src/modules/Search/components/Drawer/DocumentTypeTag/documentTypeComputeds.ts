import constants from '@/Common/constants'

const useDocumentTypeComputed = () => ({
  documentTypeIcon: (type: string) => {
    switch (type) {
      case constants.PDF:
        return 'pdf'
      case constants.TXT:
        return 'file'
      case constants.XLS:
        return 'xls'
      default:
        return 'file'
    }
  },
  documentType: (type: string) => {
    return type.substring(1).toUpperCase()
  }
})

export default useDocumentTypeComputed
