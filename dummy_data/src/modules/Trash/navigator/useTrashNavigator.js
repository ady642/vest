"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useNavigator_1 = require("@/Common/hooks/useNavigator");
const useTrashNavigator = () => {
    const { goTo } = (0, useNavigator_1.default)();
    const goToTrashView = () => {
        goTo({ name: 'TrashView' });
    };
    return {
        goToTrashView
    };
};
exports.default = useTrashNavigator;
//# sourceMappingURL=useTrashNavigator.js.map