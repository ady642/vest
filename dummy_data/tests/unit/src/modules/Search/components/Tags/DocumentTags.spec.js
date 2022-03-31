"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentTags_vue_1 = require("@/modules/Search/components/Tags/DocumentTags.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentCertifyTag_vue_1 = require("@/modules/Search/components/Tags/DocumentCertifyTag.vue");
const TreatedTag_vue_1 = require("@/modules/Search/components/Tags/TreatedTag.vue");
const NewTag_vue_1 = require("@/modules/Search/components/Tags/NewTag.vue");
/****
 * Wrapper finders
 */
const findCertifyTag = (wrapper) => wrapper.findComponent(DocumentCertifyTag_vue_1.default);
const findTreatedTag = (wrapper) => wrapper.findComponent(TreatedTag_vue_1.default);
const findNewTag = (wrapper) => wrapper.findComponent(NewTag_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    hasSubscribedToVault: false,
    isTreated: false,
    isNew: false
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DocumentTags_vue_1.default, {
    props
});
let wrapper = createWrapper();
let certifyTagWrapper = findCertifyTag(wrapper);
let treatedTagWrapper = findTreatedTag(wrapper);
let newTagWrapper = findNewTag(wrapper);
describe('DocumentTags', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        certifyTagWrapper = findCertifyTag(wrapper);
        treatedTagWrapper = findTreatedTag(wrapper);
        newTagWrapper = findNewTag(wrapper);
    });
    describe('bindings with tags', () => {
        describe('rendering', () => {
            it.each([
                { hasSubscribedToVault: false, certifyTagExists: false },
                { hasSubscribedToVault: true, certifyTagExists: true }
            ])('should render certify tag if hasSubscribedToVault is true', ({ hasSubscribedToVault, certifyTagExists }) => {
                wrapper = createWrapper({ ...defaultProps, hasSubscribedToVault });
                certifyTagWrapper = findCertifyTag(wrapper);
                expect(certifyTagWrapper.exists()).toBe(certifyTagExists);
            });
            it.each([
                { isTreated: false, treatedTagExists: false },
                { isTreated: true, treatedTagExists: true }
            ])('should render treated tag if isTreated is true', ({ isTreated, treatedTagExists }) => {
                wrapper = createWrapper({ ...defaultProps, isTreated });
                treatedTagWrapper = findTreatedTag(wrapper);
                expect(treatedTagWrapper.exists()).toBe(treatedTagExists);
            });
            it.each([
                { isNew: false, newTagExists: false },
                { isNew: true, newTagExists: true }
            ])('should render new tag if isNew is true', ({ isNew, newTagExists }) => {
                wrapper = createWrapper({ ...defaultProps, isNew });
                newTagWrapper = findNewTag(wrapper);
                expect(newTagWrapper.exists()).toBe(newTagExists);
            });
        });
    });
});
//# sourceMappingURL=DocumentTags.spec.js.map