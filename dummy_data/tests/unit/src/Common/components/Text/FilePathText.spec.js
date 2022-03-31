"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FilePathText_vue_1 = require("@/Common/components/Text/FilePathText.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createWrapper = ({ filePath = [] } = { filePath: [] }) => (0, wrapperFactory_1.default)(FilePathText_vue_1.default, {
    propsData: {
        filePath
    },
    shallow: true
});
describe('FilePathText', () => {
    describe('binding', () => {
        describe('props', () => {
            it('Should not display anything when folders null(header case)', () => {
                const wrapper = createWrapper();
                const spanWrapper = wrapper.findAll('span');
                expect(spanWrapper).toStrictEqual([]);
            });
            it('Should display all folders when folders < 6', () => {
                const wrapper = createWrapper({ filePath: ['A', 'B'] });
                const divWrapper = wrapper.findAll('div');
                const spanWrapper = wrapper.findAll('span');
                expect(divWrapper[0].attributes('title')).toBe('A/B');
                expect(spanWrapper[1].text()).toBe('A');
                expect(spanWrapper[2].classes('el-icon-arrow-right')).toBeTruthy();
                expect(spanWrapper[3].text()).toBe('B');
            });
            it('Should display first and last folder when folders > 6', () => {
                const wrapper = createWrapper({
                    filePath: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
                });
                const divWrapper = wrapper.findAll('div');
                const spanWrapper = wrapper.findAll('span');
                expect(divWrapper[0].attributes('title')).toBe('A/B/C/D/E/F/G');
                expect(spanWrapper[1].text()).toBe('A');
                expect(spanWrapper[2].classes('el-icon-arrow-right')).toBeTruthy();
                expect(spanWrapper[4].text()).toBe('...');
                expect(spanWrapper[5].classes('el-icon-arrow-right')).toBeTruthy();
                expect(spanWrapper[7].text()).toBe('G');
            });
        });
    });
});
//# sourceMappingURL=FilePathText.spec.js.map