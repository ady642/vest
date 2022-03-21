import DeleteFileServices from '@/modules/DataManipulation/Delete/DeleteFile/services'
import actions from '@/modules/DataManipulation/Delete/DeleteFile/store/actions'
import RootStateInterface from '@/store/types/rootState'
import { flushPromises } from '@vue/test-utils'

let commit = jest.fn()

describe('DeleteFile actions', () => {
  beforeEach(() => {
    commit = jest.fn()
  })
  it('Should call DeleteFileServices.DeleteFile with the correct payload ', async () => {
    // Given the service return no value
    jest.spyOn(DeleteFileServices, 'DeleteFiles').mockResolvedValue({} as never)
    // When I call the DeleteFile action
    await actions.deleteFiles(
      {
        commit,
        rootState: {
          app: {
            account: {
              AccountId: '75545'
            }
          }
        } as RootStateInterface
      },
      ['awesome-document-id', 'awesome-document-id-2']
    )

    await flushPromises()

    // Then the service must be called it th e query and the accout number as 777547
    expect(commit).toHaveBeenNthCalledWith(1, 'SET_IS_FILE_DELETING', true)
    expect(DeleteFileServices.DeleteFiles).toBeCalledWith('75545', [
      'awesome-document-id',
      'awesome-document-id-2'
    ]),
      expect(commit).toHaveBeenNthCalledWith(2, 'SET_IS_FILE_DELETING', false)
  })
})
