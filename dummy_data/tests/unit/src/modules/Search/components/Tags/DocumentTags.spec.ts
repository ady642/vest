import DocumentTags from '@/modules/Search/components/Tags/DocumentTags.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import DocumentCertifyTag from '@/modules/Search/components/Tags/DocumentCertifyTag.vue'
import TreatedTag from '@/modules/Search/components/Tags/TreatedTag.vue'
import NewTag from '@/modules/Search/components/Tags/NewTag.vue'

/****
 * Wrapper types
 */
type DocumentTagsProps = {
  hasSubscribedToVault: boolean
  isTreated: boolean
  isNew: boolean
}

export type DocumentTagsWrapper = VueWrapper<
  ComponentPublicInstance<DocumentTagsProps>
>
/****
 * Wrapper finders
 */

const findCertifyTag = (wrapper: DocumentTagsWrapper) =>
  wrapper.findComponent(DocumentCertifyTag)

const findTreatedTag = (wrapper: DocumentTagsWrapper) =>
  wrapper.findComponent(TreatedTag)

const findNewTag = (wrapper: DocumentTagsWrapper) =>
  wrapper.findComponent(NewTag)

/****
 * Wrapper creation
 */
const defaultProps: DocumentTagsProps = {
  hasSubscribedToVault: false,
  isTreated: false,
  isNew: false
}

const createWrapper = (props = defaultProps): DocumentTagsWrapper =>
  wrapperFactory(DocumentTags, {
    props
  })

let wrapper = createWrapper()
let certifyTagWrapper = findCertifyTag(wrapper)
let treatedTagWrapper = findTreatedTag(wrapper)
let newTagWrapper = findNewTag(wrapper)

describe('DocumentTags', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    certifyTagWrapper = findCertifyTag(wrapper)
    treatedTagWrapper = findTreatedTag(wrapper)
    newTagWrapper = findNewTag(wrapper)
  })

  describe('bindings with tags', () => {
    describe('rendering', () => {
      it.each([
        { hasSubscribedToVault: false, certifyTagExists: false },
        { hasSubscribedToVault: true, certifyTagExists: true }
      ])(
        'should render certify tag if hasSubscribedToVault is true',
        ({ hasSubscribedToVault, certifyTagExists }) => {
          wrapper = createWrapper({ ...defaultProps, hasSubscribedToVault })

          certifyTagWrapper = findCertifyTag(wrapper)

          expect(certifyTagWrapper.exists()).toBe(certifyTagExists)
        }
      )
      it.each([
        { isTreated: false, treatedTagExists: false },
        { isTreated: true, treatedTagExists: true }
      ])(
        'should render treated tag if isTreated is true',
        ({ isTreated, treatedTagExists }) => {
          wrapper = createWrapper({ ...defaultProps, isTreated })

          treatedTagWrapper = findTreatedTag(wrapper)

          expect(treatedTagWrapper.exists()).toBe(treatedTagExists)
        }
      )
      it.each([
        { isNew: false, newTagExists: false },
        { isNew: true, newTagExists: true }
      ])(
        'should render new tag if isNew is true',
        ({ isNew, newTagExists }) => {
          wrapper = createWrapper({ ...defaultProps, isNew })

          newTagWrapper = findNewTag(wrapper)

          expect(newTagWrapper.exists()).toBe(newTagExists)
        }
      )
    })
  })
})
