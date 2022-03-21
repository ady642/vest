import RestoreFileRequest from '@/modules/Trash/models/Query/RestoreFileRequest'

describe('RestoreFileRequest', () => {
  it('constructor with values', () => {
    const req = new RestoreFileRequest(['12344'])

    expect(req.ids).toHaveLength(1)
    expect(req.ids[0]).toBe('12344')
  })
})
