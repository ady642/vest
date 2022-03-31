"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/DataManipulation/Delete/DeleteFile/services");
const actions_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/actions");
const test_utils_1 = require("@vue/test-utils");
let commit = jest.fn();
describe('DeleteFile actions', () => {
    beforeEach(() => {
        commit = jest.fn();
    });
    it('Should call DeleteFileServices.DeleteFile with the correct payload ', async () => {
        // Given the service return no value
        jest.spyOn(services_1.default, 'DeleteFiles').mockResolvedValue({});
        // When I call the DeleteFile action
        await actions_1.default.deleteFiles({
            commit,
            rootState: {
                app: {
                    account: {
                        AccountId: '75545'
                    }
                }
            }
        }, ['awesome-document-id', 'awesome-document-id-2']);
        await (0, test_utils_1.flushPromises)();
        // Then the service must be called it th e query and the accout number as 777547
        expect(commit).toHaveBeenNthCalledWith(1, 'SET_IS_FILE_DELETING', true);
        expect(services_1.default.DeleteFiles).toBeCalledWith('75545', [
            'awesome-document-id',
            'awesome-document-id-2'
        ]),
            expect(commit).toHaveBeenNthCalledWith(2, 'SET_IS_FILE_DELETING', false);
    });
});
//# sourceMappingURL=actions.spec.js.map