"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const vue_1 = require("vue");
const useBreadcrumbHelpers = ({ folders = Folders_1.default.loaded([]), selectedFolder, propName = 'selectedFolder' } = {}) => {
    const instance = (0, vue_1.getCurrentInstance)();
    if (!instance) {
        throw new Error('useVModel must be called from the setup or lifecycle hook methods.');
    }
    const getBreadcrumbItemsFormFolder = (folder, folders, acc) => {
        if (folder === undefined) {
            return acc.reverse();
        }
        acc.push({ id: folder.id ?? 0, text: folder.name });
        if (folder.parentId === null) {
            return acc.reverse();
        }
        const parent = folders.getFolderById(folder.parentId);
        return getBreadcrumbItemsFormFolder(parent, folders, acc);
    };
    const state = (0, vue_1.reactive)({
        breadcrumbs: getBreadcrumbItemsFormFolder(folders.getFolderById(selectedFolder ?? 0), folders, [])
    });
    const breadcrumbsGoBackByFolderId = (id) => {
        if (state.breadcrumbs.length == 0) {
            return;
        }
        if (state.breadcrumbs[state.breadcrumbs.length - 1].id !== id) {
            state.breadcrumbs.pop();
            breadcrumbsGoBackByFolderId(id);
        }
    };
    const selectBreadcrumb = (id, emitEvent) => {
        const folder = folders.getFolderById(id);
        if (!state.breadcrumbs.some((breadcrumb) => breadcrumb.id === id) &&
            id !== 0) {
            state.breadcrumbs.push({
                id: folder?.id ?? 0,
                text: folder?.name ?? ''
            });
        }
        else {
            breadcrumbsGoBackByFolderId(id);
        }
        if (emitEvent)
            instance.emit(`update:${propName}`, id);
    };
    const goBack = () => {
        if (state.breadcrumbs.length <= 1) {
            if (state.breadcrumbs.length !== 0) {
                state.breadcrumbs.pop();
            }
            instance.emit(`update:${propName}`, 0);
        }
        else {
            state.breadcrumbs.pop();
            instance.emit(`update:${propName}`, state.breadcrumbs.length > 0
                ? state.breadcrumbs[state.breadcrumbs.length - 1].id
                : 0);
        }
    };
    const handleClickOnBreadcrumb = ({ id, breadcrumbs }) => {
        if (id !== breadcrumbs[breadcrumbs.length - 1].id) {
            instance.emit('breadcrumb-click', id);
        }
    };
    return {
        selectBreadcrumb,
        handleClickOnBreadcrumb,
        state,
        goBack
    };
};
exports.default = useBreadcrumbHelpers;
//# sourceMappingURL=useBreadcrumbHelpers.js.map