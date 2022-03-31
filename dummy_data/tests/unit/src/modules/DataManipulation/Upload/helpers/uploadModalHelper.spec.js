"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadModalHelper_1 = require("@/modules/DataManipulation/Upload/helpers/uploadModalHelper");
const vue_1 = require("vue");
const FileUploadMock_1 = require("../__mocks__/FileUploadMock");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn(),
    pageViewFactory: jest.fn()
}));
const { cancelFileUploadNotification, getUploadNotification } = (0, uploadModalHelper_1.default)();
const description = '';
const title = 'ged.dataManipulation.upload.notification.cancelUploadModal.title';
describe('uploadModalHelper', () => {
    test('cancelFileUploadNotification', () => {
        const callbackfn = () => { };
        cancelFileUploadNotification(callbackfn);
        const args = global.ElMessageBox.confirm.mock.calls[0];
        expect(analyticsLog_1.trackEventFactory).toBeCalledWith('upt-upload-cancel-click');
        expect(args[0]).toBe(description);
        expect(args[1]).toBe(title);
        expect(args[2].callback).toStrictEqual(callbackfn);
        expect(args[2].cancelButtonText).toBe('ged.dataManipulation.upload.notification.cancelUploadModal.CTA.cancel');
        expect(args[2].confirmButtonText).toBe('ged.dataManipulation.upload.notification.cancelUploadModal.CTA.interrupt');
        expect(args[2].customClass).toBe('warning-ged-confirm');
        expect(args[2].showClose).toBe(false);
        expect(args[2].closeOnClickModal).toBe(false);
        expect(args[2].closeOnHashChange).toBe(false);
        expect(args[2].showClose).toBe(false);
    });
    test('getUploadNotification', () => {
        const cancelfn = () => { };
        const closefn = () => { };
        const openfn = () => { };
        const notification = getUploadNotification(true, (0, vue_1.computed)(() => FileUploadMock_1.filesFailedCase), cancelfn, closefn, openfn);
        const args = global.ElNotification.mock.calls[0][0];
        expect(args.customClass).toBe('mfe-upload-main');
        expect(args.dangerouslyUseHTMLString).toBe(true);
        expect(args.duration).toBe(0);
        expect(args.message.props.duration).toBe(5000);
        expect(args.message.props.files).toBe(FileUploadMock_1.filesFailedCase);
        expect(args.message.props.loading).toBe(true);
        expect(args.message.props.onCancelUpload).toStrictEqual(cancelfn);
        expect(args.message.props.onClose).toStrictEqual(closefn);
        expect(args.message.props.onOpenUploadModal).toStrictEqual(openfn);
        expect(args.position).toBe('bottom-right');
        expect(args.showClose).toBe(false);
        expect(notification).toBe('the notification');
    });
});
//# sourceMappingURL=uploadModalHelper.spec.js.map