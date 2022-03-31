"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MultipleDocumentsCtas_vue_1 = require("@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCtas.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
/****
 * Wrapper creation
 */
const defaultProps = {
    selectedDocumentsIds: ['27']
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(MultipleDocumentsCtas_vue_1.default, { props });
let wrapper = createWrapper();
let downloadCta = (0, finders_1.findDownloadCta)(wrapper);
let deleteCta = (0, finders_1.findDeleteCta)(wrapper);
describe('MultipleDocumentsCtas', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        downloadCta = (0, finders_1.findDownloadCta)(wrapper);
        deleteCta = (0, finders_1.findDeleteCta)(wrapper);
    });
    describe('bindings with DownloadCta', () => {
        describe('events', () => {
            it('should emit download when DownloadCta emit a click event', async () => {
                await downloadCta.vm.$emit('click');
                expect(wrapper.emitted('download-all-clicked')).toHaveLength(1);
            });
        });
    });
    describe('bindings with DeleteCta', () => {
        test('static props', () => {
            expect(deleteCta.props('selectedDocumentsIds')).toStrictEqual(['27']);
        });
        describe('events', () => {
            it('should emit download when DeleteCta emit a click event', async () => {
                await deleteCta.vm.$emit('click');
                expect(wrapper.emitted('delete-all-clicked')).toHaveLength(1);
            });
        });
    });
});
//# sourceMappingURL=MultipleDocumentsCtas.spec.js.map