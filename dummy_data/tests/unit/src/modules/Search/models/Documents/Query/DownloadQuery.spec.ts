import DownloadQuery from '@/modules/Search/models/Documents/Query/DownloadQuery'

let downloadQuery: DownloadQuery = new DownloadQuery()

describe('DownloadQuery', () => {
  it('transformForAPI', () => {
    downloadQuery = new DownloadQuery({
      accountId: '93012cc8-77b9-4161-8dbd-61915d935e21',
      documentId: 'bc13de06-8e19-407b-9264-a951d48cd630'
    })

    expect(downloadQuery.transformForAPI()).toEqual({
      accountId: '93012cc8-77b9-4161-8dbd-61915d935e21',
      documentId: 'bc13de06-8e19-407b-9264-a951d48cd630'
    })
  })
})
