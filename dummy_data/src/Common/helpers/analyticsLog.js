"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackEventFactory = exports.pageViewFactory = exports.trackEvent = exports.pageView = void 0;
const vue_gtag_next_1 = require("vue-gtag-next");
const analyticsConstants_1 = require("../constants/analyticsConstants");
const useStringHelpers_1 = require("@/Common/hooks/useStringHelpers");
const { StringFormat } = (0, useStringHelpers_1.default)();
const pageView = (pageTitle, pagePath) => {
    const { pageview } = (0, vue_gtag_next_1.useGtag)();
    pageview({
        page_title: pageTitle,
        page_path: pagePath
    });
};
exports.pageView = pageView;
const trackEvent = (eventCategory, eventAction, eventLabel) => {
    const { event } = (0, vue_gtag_next_1.useGtag)();
    event(eventAction, {
        event_category: eventCategory,
        event_label: eventLabel
    });
};
exports.trackEvent = trackEvent;
const trackEventFactory = (eventCode, ...args) => {
    const logData = analyticsConstants_1.analyticsConstants.click.find((acc) => acc.code == eventCode);
    if (!logData) {
        return;
    }
    let label = logData.eventLabel;
    let action = logData.eventAction;
    if (args.length > 0) {
        let text = logData.eventAction + '###' + logData.eventLabel;
        text = StringFormat(text, ...args);
        action = text.split('###')[0];
        label = text.split('###')[1];
    }
    trackEvent(logData.eventCategory, action, label);
};
exports.trackEventFactory = trackEventFactory;
const pageViewFactory = (pageViewCode) => {
    const logData = analyticsConstants_1.analyticsConstants.pageview.find((acc) => acc.code == pageViewCode);
    if (!logData) {
        return;
    }
    pageView(logData.pageTitle, logData.pagePath);
};
exports.pageViewFactory = pageViewFactory;
//# sourceMappingURL=analyticsLog.js.map