"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = require("dayjs");
require("dayjs/locale/fr");
const useDates = () => {
    const format = (date, format) => {
        return (0, dayjs_1.default)(date).locale('fr').format(format);
    };
    const defaultFormat = (date) => {
        return (0, dayjs_1.default)(date).format();
    };
    const formatFullMonth = (date) => {
        return (0, dayjs_1.default)(date).locale('fr').format('DD MMMM YYYY');
    };
    const isBefore = (datebefore, dateafter) => {
        return (0, dayjs_1.default)(datebefore).isBefore(dateafter);
    };
    const isAfter = (dateafter, datebefore) => {
        return (0, dayjs_1.default)(dateafter).isAfter(datebefore);
    };
    const subtractInDays = (date, nbOfDays) => {
        return (0, dayjs_1.default)(date).subtract(nbOfDays, 'day').format();
    };
    const dateNow = () => {
        return (0, dayjs_1.default)().format();
    };
    return {
        format,
        isBefore,
        isAfter,
        subtractInDays,
        dateNow,
        defaultFormat,
        formatFullMonth
    };
};
exports.default = useDates;
//# sourceMappingURL=useDates.js.map