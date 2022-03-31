"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RestoreNotificationHelper_1 = require("@/modules/Trash/helpers/RestoreNotificationHelper");
const TrashDocumentAPIMock_1 = require("../mocks/TrashDocumentAPIMock");
const TrashDocuments_1 = require("@/modules/Trash/models/Inputs/TrashDocuments");
const documentsData = TrashDocuments_1.default.loaded(TrashDocumentAPIMock_1.TrashDocumentAPILightMockList);
describe('RestoreNotificationHelper', () => {
    test('getSuccessRestoreNotification', () => {
        const { getSuccessRestoreNotification } = (0, RestoreNotificationHelper_1.default)();
        const redirectfn = () => { };
        const closefn = () => { };
        const notification = getSuccessRestoreNotification(documentsData, documentsData.collection[0], redirectfn, closefn);
        const args = global.ElNotification.mock.calls[0][0];
        expect(args.customClass).toBe('mfe-restore-main');
        expect(args.dangerouslyUseHTMLString).toBe(true);
        expect(args.duration).toBe(0);
        expect(args.message.props.duration).toBe(5000);
        expect(args.message.props.pending).toBe(false);
        expect(args.message.props.success).toBe(true);
        expect(args.message.props.failed).toBe(false);
        expect(args.message.props.documents).toBe(documentsData);
        expect(args.message.props.restoredDocument).toBe(documentsData.collection[0]);
        expect(args.message.props.onRedirectToLocation).toStrictEqual(redirectfn);
        expect(args.message.props.onClose).toStrictEqual(closefn);
        expect(args.position).toBe('bottom-right');
        expect(args.showClose).toBe(false);
    });
});
//# sourceMappingURL=SuccessRestoreNotificationHelper.spec.js.map