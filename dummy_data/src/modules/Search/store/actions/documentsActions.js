"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/Search/services");
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const DocumentsQuery_1 = require("@/modules/Search/models/Documents/Query/DocumentsQuery");
const mutations_1 = require("@/modules/Search/store/mutations");
const Account_1 = require("@/modules/Account/models/Account");
const DownloadQuery_1 = require("@/modules/Search/models/Documents/Query/DownloadQuery");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const useDownload_1 = require("@/Common/hooks/useDownload");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const file_1 = require("@/Common/helpers/file");
const PatchQuery_1 = require("@/modules/Search/models/Documents/Query/PatchQuery");
const fetchDocuments = async ({ commit, dispatch, state: { paginator, filters, sortOptions }, rootState }, cleanDocuments = true) => {
    const cancelToken = mypulse_shared_dependencies_1.axios.CancelToken.source();
    if (cleanDocuments) {
        commit(mutations_1.SET_DOCUMENTS, Documents_1.default.loading(cancelToken));
    }
    else {
        commit(mutations_1.PUSH_DOCUMENTS, Documents_1.default.loading(cancelToken));
    }
    try {
        const documentsQuery = new DocumentsQuery_1.default({
            account: new Account_1.default({ id: rootState.app.account.AccountId }),
            filters,
            sortOptions,
            paginator
        });
        const { data, headers } = await services_1.default.fetchDocuments(documentsQuery.transformForAPI(), cancelToken);
        const total = headers['content-range'].split(/\//)[1];
        paginator.setTotalItems(total);
        await dispatch('setPaginator', paginator);
        if (cleanDocuments) {
            commit(mutations_1.SET_DOCUMENTS, Documents_1.default.loaded(data));
        }
        else {
            commit(mutations_1.PUSH_DOCUMENTS, Documents_1.default.loaded(data));
        }
    }
    catch (e) {
        if (e.message) {
            commit(mutations_1.SET_DOCUMENTS, Documents_1.default.errored());
        }
    }
};
const fetchAndPushDocuments = ({ dispatch }) => {
    dispatch('fetchDocuments', false);
};
const fetchDocumentsTotalCount = async ({ commit, rootState, state }) => {
    const documentsQuery = new DocumentsQuery_1.default({
        account: new Account_1.default({ id: rootState.app.account.AccountId }),
        filters: DocumentsFilters_1.default.TotalFilters(state.filters.search, state.filters.period),
        sortOptions: new DocumentsSortOptions_1.default({
            sortBy: 'updated',
            sortDirection: 'descending'
        }),
        paginator: new DocumentsPaginator_1.default({
            itemsPerPage: 1,
            pageNumber: 1,
            totalItems: 1
        })
    });
    const { headers } = await services_1.default.fetchDocuments(documentsQuery.transformForAPI());
    const total = headers['content-range'].split(/\//)[1];
    commit(mutations_1.SET_DOCUMENTS_TOTAL_COUNT, Number(total));
};
const setFilters = ({ commit }, filters) => {
    commit(mutations_1.SET_FILTERS, filters);
};
const downloadPreview = async ({ commit, rootState }, documentId) => {
    try {
        commit(mutations_1.SET_PREVIEW_LOADING, true);
        const response = await services_1.default.downloadPreview(new DownloadQuery_1.default({
            documentId,
            accountId: rootState.app.account.AccountId
        }));
        commit(mutations_1.SET_PREVIEW, (0, file_1.createBase64Image)(response));
    }
    catch (e) {
        commit(mutations_1.SET_PREVIEW, null);
    }
    finally {
        commit(mutations_1.SET_PREVIEW_LOADING, false);
    }
};
const setPaginator = ({ commit }, paginatorNewValue) => {
    commit(mutations_1.SET_PAGINATOR, paginatorNewValue);
};
const setSortOptions = ({ commit }, documentsSortOptions) => {
    commit(mutations_1.SET_SORT_OPTIONS, documentsSortOptions);
};
const downloadVisualization = async ({ rootState, commit }, documentId) => {
    try {
        commit(mutations_1.SET_IS_DOWNLOADING, true);
        const { data } = await services_1.default.downloadDocument(new DownloadQuery_1.default({
            documentId,
            accountId: rootState.app.account.AccountId
        }));
        commit(mutations_1.SET_VISUALIZATION, data);
    }
    finally {
        commit(mutations_1.SET_IS_DOWNLOADING, false);
    }
};
const resetVisualization = async ({ commit }) => {
    commit(mutations_1.SET_VISUALIZATION, new Blob([]));
};
const downloadDocument = async ({ rootState, state, commit }, { documentId, callDownloadService }) => {
    try {
        commit(mutations_1.SET_IS_DOWNLOADING, true);
        const document = state.documents.collection.find((document) => document.id === documentId);
        let data = state.visualization;
        if (callDownloadService) {
            const response = await services_1.default.downloadDocument(new DownloadQuery_1.default({
                documentId,
                accountId: rootState.app.account.AccountId
            }));
            data = response.data;
        }
        const { downloadFile } = (0, useDownload_1.default)();
        if (document) {
            downloadFile({ data, fileName: document.name });
        }
    }
    finally {
        commit(mutations_1.SET_IS_DOWNLOADING, false);
    }
};
const downloadDocuments = async ({ rootState, commit }, documentIds) => {
    try {
        commit(mutations_1.SET_MULTIPLE_DOWNLOAD_LOADING, true);
        await services_1.default.downloadDocuments(rootState.app.account.AccountId, documentIds);
    }
    finally {
        commit(mutations_1.SET_MULTIPLE_DOWNLOAD_LOADING, false);
    }
};
const patchDocumentComment = async ({ rootState, commit }, query) => {
    await services_1.default.patchDocument(new PatchQuery_1.default({
        accountId: rootState.app.account.AccountId,
        documentId: query.documentId,
        operation: 'replace',
        path: '/comments',
        value: query.value
    }));
    commit('SET_DOCUMENT_COMMENT', {
        documentId: query.documentId,
        comment: query.value
    });
};
exports.default = {
    setFilters,
    setPaginator,
    setSortOptions,
    downloadDocument,
    fetchDocuments,
    fetchAndPushDocuments,
    fetchDocumentsTotalCount,
    downloadPreview,
    patchDocumentComment,
    downloadDocuments,
    downloadVisualization,
    resetVisualization
};
//# sourceMappingURL=documentsActions.js.map