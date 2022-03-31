"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useNavigator_1 = require("@/Common/hooks/useNavigator");
const useSearchNavigator = () => {
    const { goTo, getQuery } = (0, useNavigator_1.default)();
    const goToMainView = (query) => {
        goTo({ name: 'MainView', query });
    };
    const goToArboView = ({ folderId }) => {
        goTo({ name: 'ArboView', query: { folderId } });
    };
    const getSearchQuery = () => getQuery('search');
    return {
        goToMainView,
        goToArboView,
        getSearchQuery
    };
};
exports.default = useSearchNavigator;
//# sourceMappingURL=useSearchNavigator.js.map