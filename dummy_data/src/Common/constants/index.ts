import allowedTypes from '@/Common/constants/allowedTypes'
import paginator from '@/Common/constants/paginator'
import permissions from '@/Common/constants/permissions'
import syncStatus from '@/Common/constants/syncStatus'
import descriptions from '@/Common/constants/descriptions'
import messages from '@/Common/constants/messages'
import buttons from '@/Common/constants/buttons'
import restoreStatus from './restoreStatus'
import foldersNames from './foldersNames'
import documentTypes from '@/Common/constants/documentTypes'

export default {
  ...buttons,
  ...allowedTypes,
  ...paginator,
  ...syncStatus,
  ...permissions,
  ...descriptions,
  ...messages,
  ...restoreStatus,
  ...foldersNames,
  ...documentTypes
}
