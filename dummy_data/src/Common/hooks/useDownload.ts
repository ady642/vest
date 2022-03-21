const useDownload = () => {
  const downloadFile = ({
    data,
    fileName
  }: {
    data: any
    fileName: string
  }): void => {
    const url = URL.createObjectURL(new Blob([data]))
    const downloadLink = document.createElement('a')

    downloadLink.href = url
    downloadLink.download = fileName
    downloadLink.click()
  }

  return {
    downloadFile
  }
}

export default useDownload
