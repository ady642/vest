import * as vueGtag from 'vue-gtag-next'
import {
  pageView,
  pageViewFactory,
  trackEventFactory,
  trackEvent
} from '@/Common/helpers/analyticsLog'
let pageViewMock = jest.fn()
let eventMock = jest.fn()

describe('analyticsLog', () => {
  beforeEach(() => {
    pageViewMock = jest.fn()
    eventMock = jest.fn()

    jest.spyOn(vueGtag, 'useGtag').mockReturnValue({
      ...vueGtag.useGtag(),
      pageview: pageViewMock,
      event: eventMock
    })
  })
  test('pageViewFactory', () => {
    pageViewFactory('document-pgv')
    expect(pageViewMock).toBeCalledWith({
      page_path: '/document',
      page_title: 'Main Document View'
    })
  })
  test('trackEventFactory', () => {
    trackEventFactory('updm-select-destination-file-upload', 5)
    expect(eventMock).toBeCalledWith('Select destination', {
      event_category: 'Upload document',
      event_label: 'File upload - 5'
    })
  })
  test('pageViewFactory when wrong code should not fire.', () => {
    pageViewFactory('awesome-code')
    expect(pageViewMock).not.toBeCalled()
  })
  test('trackEventFactory when wrong code should not fire.', () => {
    trackEventFactory('awesome-code')
    expect(eventMock).not.toBeCalled()
  })
  test('pageview', () => {
    pageView('Documents', '/document')
    expect(pageViewMock).toBeCalledWith({
      page_path: '/document',
      page_title: 'Documents'
    })
  })
  test('trackEvent', () => {
    trackEvent('Main Document View', 'Upload Document', 'CTA - Widget')
    expect(eventMock).toBeCalledWith('Upload Document', {
      event_category: 'Main Document View',
      event_label: 'CTA - Widget'
    })
  })
})
