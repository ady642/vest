"use strict";
// Convention : if there is a dynamic value , you should put {0},
// Example :
// EventAction = "EventAction = {0}"
// EventLabel = "EventLabel = {1}"
// Make sure that you send arguments in the right order
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsConstants = void 0;
const analyticsCode_1 = require("@/Common/constants/analyticsCode");
const analyticsConstants = {
    pageview: [
        {
            code: analyticsCode_1.default['document-pgv'],
            pageTitle: 'Main Document View',
            pagePath: '/document'
        },
        {
            code: analyticsCode_1.default['arboview-pgv'],
            pageTitle: 'Arbo View',
            pagePath: '/document/arbo'
        },
        {
            code: analyticsCode_1.default['trashview-pgv'],
            pageTitle: 'Trash view',
            pagePath: '/document/TrashView'
        }
    ],
    click: [
        {
            code: analyticsCode_1.default['mdv-cta-upload-widget-click'],
            eventCategory: 'Main Document View',
            eventAction: 'Upload Document',
            eventLabel: 'CTA - Widget'
        },
        {
            code: analyticsCode_1.default['mdv-cta-upload-button-click'],
            eventCategory: 'Main Document View',
            eventAction: 'Upload Document',
            eventLabel: 'CTA - Button'
        },
        {
            code: analyticsCode_1.default['mdv-cta-trash-explore-click'],
            eventCategory: 'Main Document View',
            eventAction: 'Card - Trash',
            eventLabel: 'CTA - Explore'
        },
        {
            code: analyticsCode_1.default['mdv-cta-arbo-card-explore-click'],
            eventCategory: 'Main Document View',
            eventAction: 'Card - {0}',
            eventLabel: 'CTA - Explore'
        },
        {
            code: analyticsCode_1.default['mdv-cta-arbo-card-shortcut-click'],
            eventCategory: 'Main Document View',
            eventAction: 'Card - {0}',
            eventLabel: 'CTA - Shortcut {1} - {2}'
        },
        {
            code: analyticsCode_1.default['updm-select-tree-continue-client'],
            eventCategory: 'Upload document',
            eventAction: 'Select Tree',
            eventLabel: 'Continue (Client sorting)'
        },
        {
            code: analyticsCode_1.default['updm-select-tree-continue-collab'],
            eventCategory: 'Upload document',
            eventAction: 'Select Tree',
            eventLabel: 'Continue (KPMG sorting)'
        },
        {
            code: analyticsCode_1.default['updm-select-tree-folder'],
            eventCategory: 'Upload document',
            eventAction: 'Select Tree',
            eventLabel: '{0}'
        },
        {
            code: analyticsCode_1.default['updm-select-tree-cross-close'],
            eventCategory: 'Upload document',
            eventAction: 'Select Tree',
            eventLabel: 'Cross - Close'
        },
        {
            code: analyticsCode_1.default['updm-select-destination-cross-close'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'Cross - Close'
        },
        {
            code: analyticsCode_1.default['updm-select-destination-file-upload'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'File upload - {0}'
        },
        {
            code: analyticsCode_1.default['updm-select-destination-file-format'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'File - Format {0}'
        },
        {
            code: analyticsCode_1.default['updm-select-destination-file-level'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'Level {0}'
        },
        {
            code: analyticsCode_1.default['updm-select-destination-file-add-folder-icon'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'Add folder - Icone'
        },
        {
            code: analyticsCode_1.default['updm-select-destination-file-add-folder-cta'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'Add folder - CTA'
        },
        {
            code: analyticsCode_1.default['updm-select-destination-file-create-folder'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'Create folder - CTA'
        },
        {
            code: analyticsCode_1.default['updm-select-destination-file-validate-one'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'Validate (One)'
        },
        {
            code: analyticsCode_1.default['updm-select-destination-file-validate-all'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'Validate (All)'
        },
        {
            code: analyticsCode_1.default['updm-upload-failure'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'File - Upload failure "{0}"'
        },
        {
            code: analyticsCode_1.default['updm-upload-success'],
            eventCategory: 'Upload document',
            eventAction: 'Select destination',
            eventLabel: 'File - Upload success'
        },
        {
            code: analyticsCode_1.default['upt-upload-cancel-click'],
            eventCategory: 'Upload document toaster',
            eventAction: 'CTA',
            eventLabel: 'Cancel'
        },
        {
            code: analyticsCode_1.default['upt-upload-cancel-popup-continue'],
            eventCategory: 'Warning pop up cancel',
            eventAction: 'CTA',
            eventLabel: 'Continue'
        },
        {
            code: analyticsCode_1.default['upt-upload-cancel-popup-cancel'],
            eventCategory: 'Warning pop up cancel',
            eventAction: 'CTA',
            eventLabel: 'Cancel'
        },
        {
            code: analyticsCode_1.default['adv-cta-upload-widget-click'],
            eventCategory: 'Arbo View',
            eventAction: 'Upload Document',
            eventLabel: 'CTA - Widget'
        },
        {
            code: analyticsCode_1.default['adv-beadcrumb-click'],
            eventCategory: 'Arbo View',
            eventAction: 'Breadcrumb',
            eventLabel: 'Level {0}'
        },
        {
            code: analyticsCode_1.default['adv-navigation-files'],
            eventCategory: 'Arbo View',
            eventAction: 'Niveau {0}',
            eventLabel: '{1} Files'
        },
        {
            code: analyticsCode_1.default['adv-navigation-folders'],
            eventCategory: 'Arbo View',
            eventAction: 'Niveau {0}',
            eventLabel: '{1} Folders'
        },
        {
            code: analyticsCode_1.default['adv-download-file'],
            eventCategory: 'Arbo View',
            eventAction: 'Tab',
            eventLabel: 'Download'
        },
        {
            code: analyticsCode_1.default['adv-paginate'],
            eventCategory: 'Arbo View',
            eventAction: 'Tab',
            eventLabel: 'Pagination {0}'
        },
        {
            code: analyticsCode_1.default['adv-delete-file'],
            eventCategory: 'Arbo View',
            eventAction: 'Menu Tab',
            eventLabel: 'Delete file'
        },
        {
            code: analyticsCode_1.default['adv-delete-folder'],
            eventCategory: 'Arbo View',
            eventAction: 'Menu Tab',
            eventLabel: 'Delete folder'
        },
        {
            code: analyticsCode_1.default['adv-add-folder-cta'],
            eventCategory: 'Arbo View',
            eventAction: 'CTA',
            eventLabel: 'Add Folder'
        },
        {
            code: analyticsCode_1.default['tdv-navigation-files'],
            eventCategory: 'Trash view',
            eventAction: 'Niveau {0}',
            eventLabel: '{1} Files'
        },
        {
            code: analyticsCode_1.default['tdv-paginate'],
            eventCategory: 'Trash view',
            eventAction: 'Tab',
            eventLabel: 'Pagination {0}'
        },
        {
            code: analyticsCode_1.default['tdv-goback'],
            eventCategory: 'Trash view',
            eventAction: 'Nav',
            eventLabel: 'Go back'
        },
        {
            code: analyticsCode_1.default['upt-restore-cancel-click'],
            eventCategory: 'Restore document toaster',
            eventAction: 'CTA',
            eventLabel: 'Cancel'
        },
        {
            code: analyticsCode_1.default['tdv-tab-restore'],
            eventCategory: 'Trash view',
            eventAction: 'Tab',
            eventLabel: 'Restore'
        },
        {
            code: analyticsCode_1.default['tdv-menu-restore'],
            eventCategory: 'Trash view',
            eventAction: 'Menu',
            eventLabel: 'Restore'
        },
        {
            code: analyticsCode_1.default['tdv-notification-restore-cta'],
            eventCategory: 'Trash view',
            eventAction: 'Notification',
            eventLabel: 'Restore - CTA'
        }
    ]
};
exports.analyticsConstants = analyticsConstants;
//# sourceMappingURL=analyticsConstants.js.map