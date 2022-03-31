"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderHelper_1 = require("@/Common/helpers/renderHelper");
const TrashViewRestorePopup_vue_1 = require("@/modules/Trash/components/Notification/TrashViewRestorePopup.vue");
const getPendingRestoreNotification = (documents, restoredDocument, onRedirectToLocation, onClose) => {
    return window.ElNotification({
        position: 'bottom-right',
        showClose: false,
        customClass: 'mfe-restore-main',
        message: renderHelper_1.default.render(TrashViewRestorePopup_vue_1.default, {
            pending: true,
            success: false,
            failed: false,
            documents,
            restoredDocument,
            duration: 5000,
            onRedirectToLocation,
            onClose
        }),
        duration: 0,
        dangerouslyUseHTMLString: true
    });
};
const getSuccessRestoreNotification = (documents, restoredDocument, onRedirectToLocation, onClose) => {
    return window.ElNotification({
        position: 'bottom-right',
        showClose: false,
        customClass: 'mfe-restore-main',
        message: renderHelper_1.default.render(TrashViewRestorePopup_vue_1.default, {
            pending: false,
            success: true,
            failed: false,
            documents,
            restoredDocument,
            duration: 5000,
            onRedirectToLocation,
            onClose
        }),
        duration: 0,
        dangerouslyUseHTMLString: true
    });
};
const getFailedRestoreNotification = (documents, restoredDocument, onRedirectToLocation, onClose) => {
    return window.ElNotification({
        position: 'bottom-right',
        showClose: false,
        customClass: 'mfe-restore-main',
        message: renderHelper_1.default.render(TrashViewRestorePopup_vue_1.default, {
            pending: false,
            success: false,
            failed: true,
            documents,
            restoredDocument,
            duration: 5000,
            onRedirectToLocation,
            onClose: onClose
        }),
        duration: 0,
        dangerouslyUseHTMLString: true
    });
};
exports.default = () => ({
    getPendingRestoreNotification,
    getSuccessRestoreNotification,
    getFailedRestoreNotification
});
//# sourceMappingURL=RestoreNotificationHelper.js.map