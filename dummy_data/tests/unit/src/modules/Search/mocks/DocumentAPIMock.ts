import { DocumentFromAPI } from '@/Common/types/document'
import constants from '@/Common/constants'
import { LifeCycleStatus } from '@/modules/Search/models/Documents/Inputs/Document'
export const documentAPIMock: DocumentFromAPI = {
  id: 'myID',
  type: 'jpg',
  isUploadedInGedLoop: false,
  name: 'Mon bilan comptable',
  creationDate: '2018-05-27',
  account: { id: 'test', name: 'testet' },
  comments: 'je suis le bilan comptable',
  content: { href: 'https://kpmg.fr' },
  created: '2018-05-27',
  createdBy: '',
  folder: {
    id: 45454,
    path: []
  },
  preview: {
    href: ''
  },
  updatedBy: '',
  properties: {
    syncStatus: constants.PENDING_SYNC,
    'Scanner Source': '',
    'Total Excluding VAT': 2102
  },
  size: 54545,
  updated: '2018-05-27',
  folderId: 123,
  restorationStatus: 'InProgress',
  lifecycleStatus: LifeCycleStatus.Treated
}

export const DocumentAPIMockList: DocumentFromAPI[] = [
  {
    id: '69241b23-f6d1-458d-8675-1ea36f593303',
    name: 'fichierTest2.txt',
    creationDate: '2018-05-27',
    lifecycleStatus: LifeCycleStatus.Treated,
    content: {
      href: 'https://cst-d2-ds-api.azurewebsites.net/93012cc8-77b9-4161-8dbd-61915d935e21/documents/69241b23-f6d1-458d-8675-1ea36f593303/content'
    },
    preview: {
      href: 'https://cst-d2-ds-api.azurewebsites.net/93012cc8-77b9-4161-8dbd-61915d935e21/documents/69241b23-f6d1-458d-8675-1ea36f593303/preview'
    },
    updatedBy: 'tunis_tma1@yopmail.com',
    updated: '2021-09-08T12:12:20.230+00:00',
    type: '.txt',
    size: 92,
    comments: 'je suis le bilan comptable',
    isUploadedInGedLoop: true,
    folder: {
      id: 135394044,
      path: []
    },
    created: '2021-09-08T12:11:43.875+00:00',
    createdBy: 'tunis_tma1@yopmail.com',
    account: {
      id: '93012cc8-77b9-4161-8dbd-61915d935e21',
      name: 'JEAN LéVAGE'
    },
    properties: {
      syncStatus: 'SUCCESS_SYNC',
      'Scanner Source': '',
      'Total Excluding VAT': 2102
    },
    folderId: 1234,
    restorationStatus: 'InProgress'
  },
  {
    id: '7dac6005-7e90-4232-bbae-006bb9fc62b9',
    name: 'Test2608 - Copie (9).txt',
    creationDate: '2018-05-27',
    lifecycleStatus: LifeCycleStatus.Treated,
    content: {
      href: 'https://cst-d2-ds-api.azurewebsites.net/93012cc8-77b9-4161-8dbd-61915d935e21/documents/7dac6005-7e90-4232-bbae-006bb9fc62b9/content'
    },
    preview: {
      href: 'https://cst-d2-ds-api.azurewebsites.net/93012cc8-77b9-4161-8dbd-61915d935e21/documents/7dac6005-7e90-4232-bbae-006bb9fc62b9/preview'
    },
    updatedBy: 'tunis_tma2@yopmail.com',
    updated: '2021-09-02T18:10:47.077+00:00',
    type: '.txt',
    size: 4,
    comments: 'je suis le bilan comptable',
    isUploadedInGedLoop: true,
    folder: {
      id: 135394044,
      path: []
    },
    created: '2021-09-02T18:09:53.961+00:00',
    createdBy: 'tunis_tma2@yopmail.com',
    account: {
      id: '93012cc8-77b9-4161-8dbd-61915d935e21',
      name: 'JEAN LéVAGE'
    },
    properties: {
      syncStatus: 'SUCCESS_SYNC',
      'Scanner Source': '',
      'Total Excluding VAT': 2102
    },
    folderId: 1234,
    restorationStatus: 'InProgress'
  },
  {
    id: '8b99ee8f-feae-44f1-9753-1979b6282a06',
    name: 'Capture d’écran (9).png',
    creationDate: '2018-05-27',
    lifecycleStatus: LifeCycleStatus.Treated,
    content: {
      href: 'https://cst-d2-ds-api.azurewebsites.net/93012cc8-77b9-4161-8dbd-61915d935e21/documents/8b99ee8f-feae-44f1-9753-1979b6282a06/content'
    },
    preview: {
      href: 'https://cst-d2-ds-api.azurewebsites.net/93012cc8-77b9-4161-8dbd-61915d935e21/documents/8b99ee8f-feae-44f1-9753-1979b6282a06/preview'
    },
    updatedBy: 'tunis_forms@yopmail.com',
    updated: '2021-08-02T15:36:57.795+00:00',
    type: '.png',
    size: 91793,
    comments: 'je suis le bilan comptable',
    isUploadedInGedLoop: false,
    folder: {
      id: 135394044,
      path: []
    },
    created: '2021-08-02T15:35:53.581+00:00',
    createdBy: 'tunis_forms@yopmail.com',
    account: {
      id: '93012cc8-77b9-4161-8dbd-61915d935e21',
      name: 'JEAN LéVAGE'
    },
    properties: {
      syncStatus: 'SUCCESS_SYNC',
      'Scanner Source': '',
      'Total Excluding VAT': 2102
    },
    folderId: 1234,
    restorationStatus: 'InProgress'
  }
]
