import useNavigator from '@/Common/hooks/useNavigator'

const useSearchNavigator = () => {
  const { goTo, getQuery } = useNavigator()

  type mainViewParams = {
    search?: boolean
    openFilesUploadModal?: boolean
    openSelectFilesWindow?: boolean
    openWhoUploadModal?: boolean
  }

  type arboViewParams = {
    folderId: number
  }

  const goToMainView = (query?: mainViewParams) => {
    goTo({ name: 'MainView', query })
  }

  const goToArboView = ({ folderId }: arboViewParams) => {
    goTo({ name: 'ArboView', query: { folderId } })
  }

  const getSearchQuery = () => getQuery('search')

  return {
    goToMainView,
    goToArboView,
    getSearchQuery
  }
}

export default useSearchNavigator
