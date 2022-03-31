"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashDocuments_1 = require("../models/Inputs/TrashDocuments");
const TrashDocumentsPaginator_1 = require("../models/Query/TrashDocumentsPaginator");
const TrashSortOptions_1 = require("../models/Query/TrashSortOptions");
const state = {
    documents: TrashDocuments_1.default.loaded([]),
    documentsTotalCount: 0,
    paginator: new TrashDocumentsPaginator_1.default(),
    sortOptions: new TrashSortOptions_1.default(),
    totalLoading: false,
    restoreNotification: {},
    isFileRestoring: false,
    pendingList: TrashDocuments_1.default.loaded([]),
    totalPendingRestoration: 0,
    isInPendingList: false
};
exports.default = state;
//# sourceMappingURL=state.js.map