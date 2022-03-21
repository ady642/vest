declare let global: Window & typeof globalThis

global.URL.createObjectURL = () => {
  return 'https://myObjectUrl.com'
}

global.ElNotification = jest.fn(() => 'the notification')
global.ElMessageBox = {
  confirm: jest.fn(() => 'the confirm message box')
}

jest.mock('@kpmg/mypulse-shared-dependencies', () => ({
  axios: {
    CancelToken: {
      source: () => {
        return {
          cancel: jest.fn(),
          token: 'the cancel token'
        }
      }
    }
  },
  api: {
    ds: {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      put: jest.fn(),
      patch: jest.fn()
    }
  },
  router: {
    currentRoute: {
      value: { query: { folderId: 99, openWhoUploadModal: true } }
    },
    push: jest.fn()
  },
  i18n: {
    global: {
      t: (key: string, params: Record<string, any>) =>
        params ? `${key} with ${JSON.stringify(params)}` : key,
      tc: (key: string, params: Record<string, any>) =>
        params ? `${key} with ${JSON.stringify(params)}` : key
    }
  }
}))
