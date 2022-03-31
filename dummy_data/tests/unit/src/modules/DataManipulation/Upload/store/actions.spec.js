"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const actions_1 = require("@/modules/DataManipulation/Upload/store/actions");
const services_1 = require("@/modules/DataManipulation/Upload/services");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn(),
    pageViewFactory: jest.fn()
}));
const uploadErrorMapping_1 = require("@/Common/consts/uploadErrorMapping");
const test_utils_1 = require("@vue/test-utils");
let commit = jest.fn();
let dispatch = jest.fn();
const myFile = new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.PENDING);
myFile.destination = 1;
const state = {
    selectedFolderToUpload: 0,
    files: [myFile],
    gedNotification: {}
};
const rootState = {
    app: {
        account: {
            AccountId: '1001'
        }
    },
    GED: {
        Trash: {},
        Search: {},
        DataManipulation: {
            MailToGed: {},
            Upload: state,
            DeleteFolders: {},
            DeleteFile: {},
            CreateFolder: {}
        }
    }
};
describe('UploadActions', () => {
    beforeEach(() => {
        commit = jest.fn();
        dispatch = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('sortFiles', () => {
        it('Should sort files in the correct order', () => {
            const files = [
                new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADED),
                new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.ERROR),
                new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.CANCELED)
            ];
            myFile.destination = 1;
            const statemock = {
                selectedFolderToUpload: 0,
                files,
                gedNotification: {}
            };
            actions_1.default.sortFiles({ commit, state: statemock });
            expect(statemock.files).toStrictEqual(files);
        });
    });
    describe('cancelFilesUpload', () => {
        it('should commit the correct mutation', () => {
            actions_1.default.cancelFilesUpload({ commit, state });
            expect(commit).toHaveBeenCalledWith('SET_FILE_STATE', {
                index: 0,
                fileState: FileUpload_1.StateUpload.CANCELED,
                error: (0, uploadErrorMapping_1.default)('CanceledUpload')
            });
        });
    });
    describe('setFiles', () => {
        it('should commit SET_FILES', () => {
            actions_1.default.setFiles({ commit }, [
                new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD)
            ]);
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_FILES', [
                new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD)
            ]);
        });
    });
    describe('setFileState', () => {
        it('should commit SET_FILE_STATE', () => {
            actions_1.default.setFileState({ commit }, {
                index: 0,
                fileState: FileUpload_1.StateUpload.TO_UPLOAD
            });
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_FILE_STATE', {
                index: 0,
                fileState: FileUpload_1.StateUpload.TO_UPLOAD
            });
        });
    });
    describe('setFileDestination', () => {
        it('should commit SET_FILE_DESTINATION', () => {
            actions_1.default.setFileDestination({ commit }, {
                index: 0,
                destinationId: 1234
            });
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_FILE_DESTINATION', {
                index: 0,
                destinationId: 1234
            });
        });
    });
    describe('uploadDocuments', () => {
        const buildPromiseAllPayload = (index) => `uploadDocument with ${index}`;
        it.each([
            {
                indexes: [1, 2, 4, 5, 6, 10, 12, 15, 20, 21, 23, 27],
                firstRequestsBatch: [
                    buildPromiseAllPayload(1),
                    buildPromiseAllPayload(2),
                    buildPromiseAllPayload(4),
                    buildPromiseAllPayload(5),
                    buildPromiseAllPayload(6)
                ],
                secondRequestsBatch: [
                    buildPromiseAllPayload(10),
                    buildPromiseAllPayload(12),
                    buildPromiseAllPayload(15),
                    buildPromiseAllPayload(20),
                    buildPromiseAllPayload(21)
                ],
                lastRequestsBatch: [
                    buildPromiseAllPayload(23),
                    buildPromiseAllPayload(27)
                ]
            },
            {
                indexes: [1, 2, 4, 5, 6],
                firstRequestsBatch: [
                    buildPromiseAllPayload(1),
                    buildPromiseAllPayload(2),
                    buildPromiseAllPayload(4),
                    buildPromiseAllPayload(5),
                    buildPromiseAllPayload(6)
                ]
            },
            {
                indexes: [1, 2],
                firstRequestsBatch: [
                    buildPromiseAllPayload(1),
                    buildPromiseAllPayload(2)
                ]
            }
        ])('should dispatch upload 3 different batches of parallels requests when indexes is length of 12', async ({ indexes, firstRequestsBatch, secondRequestsBatch, lastRequestsBatch }) => {
            Promise.all = jest.fn();
            dispatch = jest.fn((actionName, payload) => `${actionName} with ${payload}`);
            await actions_1.default.uploadDocuments({ dispatch }, indexes);
            await (0, test_utils_1.flushPromises)();
            indexes.forEach((index) => {
                expect(dispatch).toHaveBeenCalledWith('uploadDocument', index);
            });
            expect(Promise.all).toHaveBeenNthCalledWith(1, firstRequestsBatch);
            if (secondRequestsBatch) {
                expect(Promise.all).toHaveBeenNthCalledWith(2, secondRequestsBatch);
            }
            if (lastRequestsBatch) {
                expect(Promise.all).toHaveBeenNthCalledWith(3, lastRequestsBatch);
            }
        });
        it('should call the uploadDocument services', async () => {
            jest.spyOn(services_1.default, 'uploadDocument').mockReturnValue({
                data: []
            });
            await actions_1.default.uploadDocument({
                rootState,
                commit,
                state
            }, 0);
            expect(analyticsLog_1.trackEventFactory).toBeCalledWith('updm-upload-success');
            expect(services_1.default.uploadDocument).toHaveBeenCalledWith({
                accountNumberOrId: '1001',
                file: new File([''], 'filename', { type: 'text/html' }),
                folderId: 1
            });
        });
    });
    describe('setSelectedFolderToUpload', () => {
        it('Should call the mutation to set the selectedFolderId', () => {
            // When setSelectedFolderToUpload action is called
            actions_1.default.setSelectedFolderToUpload({ commit }, 4521);
            // Then the SET_SELECTED_FOLDER_ID mutation must be called
            expect(commit).toHaveBeenCalledWith('SET_SELECTED_FOLDER_TO_UPLOAD', 4521);
        });
    });
});
//# sourceMappingURL=actions.spec.js.map