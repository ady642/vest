import useNavigator from '@/Common/hooks/useNavigator'

const { getQuery } = useNavigator()

describe('useNavigator', () => {
  it('shoul get the query pass in param', () => {
    expect(getQuery('folderId')).toBe(99)
  })
})
