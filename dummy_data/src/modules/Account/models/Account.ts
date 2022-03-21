interface AccountParams {
  id: string
}

export default class Account {
  id: string

  constructor({ id = '' } = {} as AccountParams) {
    this.id = id
  }
}
