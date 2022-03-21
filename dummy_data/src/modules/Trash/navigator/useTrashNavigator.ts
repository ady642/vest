import useNavigator from '@/Common/hooks/useNavigator'

const useTrashNavigator = () => {
  const { goTo } = useNavigator()

  const goToTrashView = () => {
    goTo({ name: 'TrashView' })
  }

  return {
    goToTrashView
  }
}

export default useTrashNavigator
