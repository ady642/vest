import { createBase64Image, isAcceptedFile } from '@/Common/helpers/file'

describe('file helpers tests', () => {
  it('should create a base64Image with an AxiosResponse', () => {
    const base64File = createBase64Image({
      data: new ArrayBuffer(1),
      headers: { 'content-type': 'image/jpeg' }
    })

    expect(base64File).toBe(`data:image/jpeg;base64,AA==`)
  })

  describe('isAcceptedFile', () => {
    it.each([
      { name: 'test.jpg', type: 'image/jpeg', isAccepted: true },
      { name: 'test.JPG', type: 'image/jpeg', isAccepted: true },
      { name: 'test.exe', type: 'application/exe', isAccepted: false }
    ])(
      'isAcceptedFile must return true if the type is on the whitelist',
      ({ isAccepted, type, name }) => {
        expect(isAcceptedFile(new File([], name, { type }))).toBe(isAccepted)
      }
    )
  })
})
