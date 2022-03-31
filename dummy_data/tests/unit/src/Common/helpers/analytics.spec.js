"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vueGtag = require("vue-gtag-next");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
let pageViewMock = jest.fn();
let eventMock = jest.fn();
describe('analyticsLog', () => {
    beforeEach(() => {
        pageViewMock = jest.fn();
        eventMock = jest.fn();
        jest.spyOn(vueGtag, 'useGtag').mockReturnValue({
            ...vueGtag.useGtag(),
            pageview: pageViewMock,
            event: eventMock
        });
    });
    test('pageViewFactory', () => {
        (0, analyticsLog_1.pageViewFactory)('document-pgv');
        expect(pageViewMock).toBeCalledWith({
            page_path: '/document',
            page_title: 'Main Document View'
        });
    });
    test('trackEventFactory', () => {
        (0, analyticsLog_1.trackEventFactory)('updm-select-destination-file-upload', 5);
        expect(eventMock).toBeCalledWith('Select destination', {
            event_category: 'Upload document',
            event_label: 'File upload - 5'
        });
    });
    test('pageViewFactory when wrong code should not fire.', () => {
        (0, analyticsLog_1.pageViewFactory)('awesome-code');
        expect(pageViewMock).not.toBeCalled();
    });
    test('trackEventFactory when wrong code should not fire.', () => {
        (0, analyticsLog_1.trackEventFactory)('awesome-code');
        expect(eventMock).not.toBeCalled();
    });
    test('pageview', () => {
        (0, analyticsLog_1.pageView)('Documents', '/document');
        expect(pageViewMock).toBeCalledWith({
            page_path: '/document',
            page_title: 'Documents'
        });
    });
    test('trackEvent', () => {
        (0, analyticsLog_1.trackEvent)('Main Document View', 'Upload Document', 'CTA - Widget');
        expect(eventMock).toBeCalledWith('Upload Document', {
            event_category: 'Main Document View',
            event_label: 'CTA - Widget'
        });
    });
});
//# sourceMappingURL=analytics.spec.js.map