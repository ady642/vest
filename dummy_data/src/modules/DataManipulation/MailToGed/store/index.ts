import state from '@/modules/DataManipulation/MailToGed/store/state'
import actions from '@/modules/DataManipulation/MailToGed/store/actions'
import getters from '@/modules/DataManipulation/MailToGed/store/getters'
import mutations from '@/modules/DataManipulation/MailToGed/store/mutations'

export const MailToGedModule = (name: string): string =>
  `GED/DataManipulation/MailToGed/${name}`

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
