import { hasFolderSelected } from '@/modules/Search/routes/guards'
import { LocationQuery, RouteLocationNormalized } from 'vue-router'

let to = {} as RouteLocationNormalized
const from = {} as RouteLocationNormalized
const next = jest.fn()

describe('route guards', () => {
  it('Should redirect in MainView if folderId is not defined', () => {
    hasFolderSelected(to, from, next)
    expect(next).toHaveBeenCalledWith({ name: 'MainView' })
  })
  it('Should not redirect in MainView if folderId is defined', () => {
    to = {
      name: 'Main',
      query: { folderId: '99' } as LocationQuery
    } as RouteLocationNormalized
    hasFolderSelected(to, from, next)
    expect(next).toHaveBeenCalledWith()
  })
})
