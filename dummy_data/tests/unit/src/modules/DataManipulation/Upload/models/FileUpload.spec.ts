import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import { StateUpload } from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import { ErrorDescription } from '@/Common/types/common'
import getErrorMapping from '@/Common/consts/uploadErrorMapping'

const content = 'mock content'
const data = new Blob([content], { type: 'application/zip' })
const arrayOfBlob = new Array<Blob>()

arrayOfBlob.push(data)
const mockZip = new File(arrayOfBlob, 'Mock.zip')

describe('FileUpload', () => {
  test('mapping value with parameters', () => {
    const file = new FileUpload(mockZip, StateUpload.UPLOADED)
    // Then

    expect(file.file).toStrictEqual(mockZip)
    expect(file.state).toBe(StateUpload.UPLOADED)
    expect(file.errorDescription).toStrictEqual({} as ErrorDescription)
    expect(file.destination).toBe(null)
  })

  test('Setter', () => {
    const file = new FileUpload(mockZip, StateUpload.UPLOADED)

    file.file = new File(arrayOfBlob, 'Mock2.zip')
    file.state = StateUpload.UPLOADING
    file.destination = 666
    file.errorDescription = getErrorMapping('FileEmpty')

    const description = {
      libelle: 'Taille du fichier trop petit',
      description:
        'Le fichier actuel est vide, veuillez déposer de nouveau un fichier non vide.'
    }

    // Then
    expect(file.file).toStrictEqual(new File(arrayOfBlob, 'Mock2.zip'))
    expect(file.state).toBe(StateUpload.UPLOADING)
    expect(file.errorDescription).toStrictEqual(description)
    expect(file.destination).toBe(666)
  })

  test('Method case UPLOADED', () => {
    const file = new FileUpload(mockZip, StateUpload.UPLOADED)

    expect(file.finished()).toBe(true)
    expect(file.running()).toBe(false)
    expect(file.error()).toBe(false)
    expect(file.ready()).toBe(false)
  })

  test('Method case UPLOADING', () => {
    const file = new FileUpload(mockZip, StateUpload.UPLOADING)

    expect(file.finished()).toBe(false)
    expect(file.running()).toBe(true)
    expect(file.error()).toBe(false)
    expect(file.ready()).toBe(false)
  })

  test('Method case ERROR', () => {
    const file = new FileUpload(mockZip, StateUpload.ERROR)

    expect(file.finished()).toBe(true)
    expect(file.running()).toBe(false)
    expect(file.error()).toBe(true)
    expect(file.ready()).toBe(false)
  })

  test('Method case TO_UPLOAD', () => {
    const file = new FileUpload(mockZip, StateUpload.TO_UPLOAD)

    expect(file.finished()).toBe(false)
    expect(file.running()).toBe(false)
    expect(file.error()).toBe(false)
    expect(file.ready()).toBe(true)
  })

  test('Method case PENDING', () => {
    const file = new FileUpload(mockZip, StateUpload.PENDING)

    expect(file.finished()).toBe(false)
    expect(file.running()).toBe(false)
    expect(file.error()).toBe(false)
    expect(file.ready()).toBe(false)
  })
  test('Method case canceled', () => {
    const file = new FileUpload(mockZip, StateUpload.CANCELED)

    expect(file.finished()).toBe(true)
    expect(file.running()).toBe(false)
    expect(file.error()).toBe(false)
    expect(file.ready()).toBe(false)
  })
  test('Method case error', () => {
    const file = new FileUpload(mockZip, StateUpload.ERROR)

    expect(file.finished()).toBe(true)
    expect(file.running()).toBe(false)
    expect(file.error()).toBe(true)
    expect(file.ready()).toBe(false)
  })
})
