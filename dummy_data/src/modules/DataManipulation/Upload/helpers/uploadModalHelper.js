"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderHelper_1 = require("@/Common/helpers/renderHelper");
const MainUploadPopup_vue_1 = require("@/modules/DataManipulation/Upload/components/Notification/MainUploadPopup.vue");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
const analyticsCode_1 = require("@/Common/constants/analyticsCode");
const useTranslation_1 = require("@/Common/hooks/useTranslation");
const { t } = (0, useTranslation_1.useTranslation)();
const getUploadNotification = (loading, files, onCancelUpload, onClose, onOpenUploadModal) => {
    return window.ElNotification({
        position: 'bottom-right',
        showClose: false,
        customClass: 'mfe-upload-main',
        message: renderHelper_1.default.render(MainUploadPopup_vue_1.default, {
            files: files.value,
            loading: loading,
            duration: 5000,
            onCancelUpload: onCancelUpload,
            onClose: onClose,
            onOpenUploadModal: onOpenUploadModal
        }),
        duration: 0,
        dangerouslyUseHTMLString: true
    });
};
const cancelFileUploadNotification = (callback) => {
    (0, analyticsLog_1.trackEventFactory)(analyticsCode_1.default['upt-upload-cancel-click']);
    window.ElMessageBox.confirm('', t('ged.dataManipulation.upload.notification.cancelUploadModal.title'), {
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        confirmButtonText: t('ged.dataManipulation.upload.notification.cancelUploadModal.CTA.interrupt'),
        cancelButtonText: t('ged.dataManipulation.upload.notification.cancelUploadModal.CTA.cancel'),
        customClass: 'warning-ged-confirm',
        confirmButtonClass: 'confirm-button',
        callback: callback
    });
};
exports.default = () => ({
    cancelFileUploadNotification,
    getUploadNotification
});
//# sourceMappingURL=uploadModalHelper.js.map