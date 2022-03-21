import uploadMixin from '@/Common/mixins/natto-upload'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { Component, PropType } from 'vue'

const Component: Component = {
  template: {},
  mixins: [uploadMixin]
}

const wrapper: VueWrapper<any> = shallowMount(Component)

describe('methods', () => {
  it('should emit event on-files-change event on emitFilesEvent method trigger ', async () => {
    let fileList: File[] = [new File([''], 'File1'), new File([''], 'File1')]

    await wrapper.setData({
      length: 2,
      fileList: fileList
    })

    await wrapper.vm.emitFilesEvent()
    expect(wrapper.emitted('on-files-change')).toBeTruthy()
    expect(wrapper.emitted()['on-files-change'][0]).toEqual([fileList])
    expect(wrapper.vm.length).toEqual(2)
  })
})
