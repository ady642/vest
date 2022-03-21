import en from '@/locales/en'
import fr from '@/locales/fr'
import { keyify } from 'tests/unit/utils/objectHelper'
describe('translation', () => {
  test('Check that all locale present in both languages', () => {
    const enKeys = keyify(en)
    const frKeys = keyify(fr)
    const missingKeys = enKeys.filter((key) => !frKeys.includes(key))
    const extraKeys = frKeys.filter((key) => !enKeys.includes(key))

    if (missingKeys.length != 0) {
      fail(
        `'${missingKeys}' exist in 'en' translation but not exist in 'fr' translation.`
      )
    }

    if (extraKeys.length != 0) {
      fail(
        `'${extraKeys}' exist in 'fr' translation but not exist in 'en' translation.`
      )
    }
  })
})
