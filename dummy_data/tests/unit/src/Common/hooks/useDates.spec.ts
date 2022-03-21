import useDates from '@/Common/hooks/useDates'

describe('useDates', () => {
  test('format function', () => {
    const { format } = useDates()

    const date = '2019-05-19T10:00:00+00:00'

    const formattedDate = format(date, 'DD MMMM YYYY')

    expect(formattedDate).toBe('19 mai 2019')
  })
})
