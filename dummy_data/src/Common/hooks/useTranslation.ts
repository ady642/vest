import { i18n } from '@kpmg/mypulse-shared-dependencies'

type useTranslationType = {
  t: (...params: any[]) => string
  tc: (...params: any[]) => string
}

export function useTranslation(): useTranslationType {
  const t = (...params: any[]) => i18n.global.t(...params)
  const tc = (...params: any[]) => i18n.global.tc(...params)

  return {
    t,
    tc
  }
}
