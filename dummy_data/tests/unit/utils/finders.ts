import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import useStyleguideStubs from './useStyleguideStubs'
import { PreviewCTAContainerWrapper } from '../src/modules/Search/components/Modals/PreviewCTAContainer.spec'
import PreviewCTAContainer from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/PreviewCTAContainer.vue'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'
import DeleteCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/DeleteCta.vue'
import DownloadCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/DownloadCta.vue'
import { DeleteCtaWrapper } from '../src/modules/Search/components/buttons/MultipleDocumentsCtas/DeleteCta.spec'
import MultipleDocumentsCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCta.vue'
import DeleteIcon from '@/Common/components/Icons/DeleteIcon.vue'
import { DownloadCtaWrapper } from '../src/modules/Search/components/buttons/MultipleDocumentsCtas/DownloadCta.spec'
import DownloadIcon from '@/Common/components/Icons/DownloadIcon.vue'
import MultipleDocumentsCtas from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCtas.vue'
import { MultipleDocumentsCtaWrapper } from '../src/modules/Search/components/buttons/MultipleDocumentsCtas/MultipleDocumentsCta.spec'
import MailToGedCard from '@/modules/DataManipulation/MailToGed/components/MailToGedCard.vue'
import DeleteFileModalConfirmation from '@/modules/DataManipulation/Delete/DeleteFile/components/Modals/DeleteFileModalConfirmation.vue'
import { DeleteFileModalConfirmationWrapper } from '../src/modules/DataManipulation/Delete/DeleteFile/components/Modals/DeleteFileModalConfirmation.spec'
import NattoCheckbox from '@/Common/components/Checkboxes/NattoCheckbox.vue'
import useElementStubs from './useElementStubs'
import { NattoTreeWrapper } from '../src/Common/components/Trees/NattoTree.spec'
import NattoTree from '@/Common/components/Tree/NattoTree.vue'
import SearchTreeItem from '@/modules/Search/components/Trees/SearchTreeItem.vue'
import { NattoRadioGroupWrapper } from '../src/Common/components/Radio/NattoRadioGroup.spec'
import NattoRadioGroup from '@/Common/components/Radio/NattoRadioGroup.vue'
import NattoDatePicker from '@/Common/components/Dates/NattoDatePicker.vue'
import { NattoDatePickerWrapper } from '../src/Common/components/Dates/NattoDatePicker.spec'
import SearchDatePicker from '@/modules/Search/components/Filters/AdvancedSearchOptions/SearchDatePicker.vue'
import { SearchDatePickerWrapper } from '../src/modules/Search/components/Filters/AdvancedSearchOptions/SearchDatePicker.spec'
import { DocumentDetailsDrawerTypeWrapper } from '../src/modules/Search/components/Drawer/DocumentDetailsDrawer.spec'
import { ArboViewWrapper } from '../src/modules/Search/views/ArboView.spec'
import DocumentActionsElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentActionsElement.vue'

const { MpIcon, MpButton, MpTable } = useStyleguideStubs()
const { ElTree } = useElementStubs()

export const findNattoCheckbox = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<ComponentPublicInstance> => wrapper.findComponent(NattoCheckbox)

export const findMpIcon = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<ComponentPublicInstance> => wrapper.findComponent(MpIcon)

export const findMpButton = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<ComponentPublicInstance> => wrapper.findComponent(MpButton)

export const findMpTableWrapper = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<
  ComponentPublicInstance<Record<string, any>, Record<string, any>>
> => wrapper.findComponent(MpTable)

export const findLoadingIcon = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<ComponentPublicInstance> => wrapper.findComponent(LoadingIcon)

export const findDeleteIcon = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<ComponentPublicInstance> => wrapper.findComponent(DeleteIcon)

export const findDownloadIcon = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<ComponentPublicInstance> => wrapper.findComponent(DownloadIcon)

export const findPreviewCTAContainer = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): PreviewCTAContainerWrapper => wrapper.findComponent(PreviewCTAContainer)

export const findMailToGedCard = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<ComponentPublicInstance> => wrapper.findComponent(MailToGedCard)

export const findDeleteCta = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): DeleteCtaWrapper => wrapper.findComponent(DeleteCta)

export const findDownloadCta = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): DownloadCtaWrapper => wrapper.findComponent(DownloadCta)

export const findMultipleDocumentsCta = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): MultipleDocumentsCtaWrapper => wrapper.findComponent(MultipleDocumentsCta)

export const findMultipleDocumentsCtas = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<ComponentPublicInstance> =>
  wrapper.findComponent(MultipleDocumentsCtas)

export const findDeleteFileModalConfirmation = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): DeleteFileModalConfirmationWrapper =>
  wrapper.findComponent(DeleteFileModalConfirmation)

export const findElTree = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<ComponentPublicInstance> => wrapper.findComponent(ElTree)

export const findNattoTree = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): NattoTreeWrapper => wrapper.findComponent(NattoTree)

export const findSearchTreeItem = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): VueWrapper<ComponentPublicInstance> => wrapper.findComponent(SearchTreeItem)

export const findNattoRadioGroup = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): NattoRadioGroupWrapper => wrapper.findComponent(NattoRadioGroup)

export const findNattoDatePicker = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): NattoDatePickerWrapper => wrapper.findComponent(NattoDatePicker)

export const findSearchDatePicker = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
): SearchDatePickerWrapper => wrapper.findComponent(SearchDatePicker)

export const findDocumentActionsElement = <
  WrapperType extends VueWrapper<ComponentPublicInstance>
>(
  wrapper: WrapperType
) => wrapper.findComponent(DocumentActionsElement)

export const findDocumentDetailsDrawer = (
  wrapper: ArboViewWrapper
): DocumentDetailsDrawerTypeWrapper =>
  wrapper.findComponent({ name: 'document-details-drawer' })
