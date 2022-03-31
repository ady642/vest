"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const state = {
    documents: Documents_1.default.loaded([]),
    documentsTotalCount: 0,
    folders: Folders_1.default.loaded([]),
    filters: new DocumentsFilters_1.default(),
    sortOptions: new DocumentsSortOptions_1.default(),
    paginator: new DocumentsPaginator_1.default(),
    previewDocumentImage: new Blob([]),
    isPreviewLoading: false,
    multipleDownloadLoading: false,
    isDownloading: false,
    visualization: new Blob([])
};
exports.default = state;
//# sourceMappingURL=state.js.map