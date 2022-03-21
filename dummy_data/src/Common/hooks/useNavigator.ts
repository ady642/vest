import { router } from '@kpmg/mypulse-shared-dependencies'

const useNavigator = () => {
  const goTo = (payload: { name: string; query?: Record<string, any> }) => {
    router.push({ name: payload.name, query: payload.query })
  }

  const getQuery = (param: string) => router.currentRoute.value.query[param]

  return {
    goTo,
    getQuery
  }
}

export default useNavigator
