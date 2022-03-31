"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoRefreshBtn_vue_1 = require("@/Common/components/Buttons/NattoRefreshBtn.vue");
const test_utils_1 = require("@vue/test-utils");
describe('natto-refresh-btn', () => {
    describe('events', () => {
        it('Should emit refresh event on click', async () => {
            const wrapper = (0, test_utils_1.mount)(NattoRefreshBtn_vue_1.default);
            const div = wrapper.find('.refresh-btn');
            await div.trigger('click');
            expect(wrapper.emitted('refresh')).toBeTruthy();
        });
    });
});
//# sourceMappingURL=NattoRefreshBtn.spec.js.map