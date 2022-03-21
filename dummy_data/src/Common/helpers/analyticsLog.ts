import { useGtag } from 'vue-gtag-next'
import { analyticsConstants } from '../constants/analyticsConstants'
import useStringHelpers from '@/Common/hooks/useStringHelpers'
const { StringFormat } = useStringHelpers()

const pageView = (pageTitle: string, pagePath: string): void => {
  const { pageview } = useGtag()

  pageview({
    page_title: pageTitle,
    page_path: pagePath
  })
}
const trackEvent = (
  eventCategory: string,
  eventAction: string,
  eventLabel: string
): void => {
  const { event } = useGtag()

  event(eventAction, {
    event_category: eventCategory,
    event_label: eventLabel
  })
}

const trackEventFactory = (
  eventCode: string,
  ...args: (string | number)[]
): void => {
  const logData = analyticsConstants.click.find((acc) => acc.code == eventCode)

  if (!logData) {
    return
  }
  let label = logData.eventLabel
  let action = logData.eventAction

  if (args.length > 0) {
    let text = logData.eventAction + '###' + logData.eventLabel

    text = StringFormat(text, ...args)
    action = text.split('###')[0]
    label = text.split('###')[1]
  }
  trackEvent(logData.eventCategory, action, label)
}

const pageViewFactory = (pageViewCode: string): void => {
  const logData = analyticsConstants.pageview.find(
    (acc) => acc.code == pageViewCode
  )

  if (!logData) {
    return
  }

  pageView(logData.pageTitle, logData.pagePath)
}

export { pageView, trackEvent, pageViewFactory, trackEventFactory }
