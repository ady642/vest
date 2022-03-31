"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const useNavigator = () => {
    const goTo = (payload) => {
        mypulse_shared_dependencies_1.router.push({ name: payload.name, query: payload.query });
    };
    const getQuery = (param) => mypulse_shared_dependencies_1.router.currentRoute.value.query[param];
    return {
        goTo,
        getQuery
    };
};
exports.default = useNavigator;
//# sourceMappingURL=useNavigator.js.map