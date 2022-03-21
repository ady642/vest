// Main Document View=mdv
// Arbo Document View=adv
// Trash Document View=tdv
// pageview=pgv
// click = click
// Upload Document Modal = updm
// Upload Document Toaster = updt
const codes = <const>[
  'document-pgv',
  'arboview-pgv',
  'trashview-pgv',
  'mdv-cta-upload-widget-click',
  'mdv-cta-upload-button-click',
  'mdv-cta-trash-explore-click',
  'mdv-cta-arbo-card-explore-click',
  'mdv-cta-arbo-card-shortcut-click',
  'updm-select-tree-continue-client',
  'updm-select-tree-continue-collab',
  'updm-select-tree-folder',
  'updm-select-tree-cross-close',
  'updm-select-destination-cross-close',
  'updm-select-destination-file-upload',
  'updm-select-destination-file-format',
  'updm-select-destination-file-level',
  'updm-select-destination-file-add-folder-icon',
  'updm-select-destination-file-add-folder-cta',
  'updm-select-destination-file-create-folder',
  'updm-select-destination-file-validate-one',
  'updm-select-destination-file-validate-all',
  'updm-upload-failure',
  'updm-upload-success',
  'upt-upload-cancel-click',
  'upt-upload-cancel-popup-continue',
  'upt-upload-cancel-popup-cancel',
  'adv-cta-upload-widget-click',
  'adv-beadcrumb-click',
  'adv-navigation-files',
  'adv-navigation-folders',
  'adv-download-file',
  'adv-paginate',
  'adv-delete-file',
  'adv-delete-folder',
  'adv-add-folder-cta',
  'tdv-navigation-files',
  'tdv-paginate',
  'tdv-goback',
  'upt-restore-cancel-click',
  'tdv-tab-restore',
  'tdv-menu-restore',
  'tdv-notification-restore-cta'
]

export type codeType = typeof codes[number]
export type codesType = Record<codeType, codeType>
const analyticsCode = codes.reduce(
  (codes: codesType, code: codeType): codesType => {
    codes[code] = code

    return codes
  },
  {} as codesType
)

export default analyticsCode
