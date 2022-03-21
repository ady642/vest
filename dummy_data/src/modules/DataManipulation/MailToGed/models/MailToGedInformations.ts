export class MailToGedInformationsItem {
  label: string
  emailAddress: string
  constructor(label: string, emailAddress: string) {
    this.label = label
    this.emailAddress = emailAddress
  }
}

export class MailToGedInformations {
  state: 'loaded' | 'loading' | 'errored'
  items: MailToGedInformationsItem[]
  moreInformationLink: string
  constructor(
    items: MailToGedInformationsItem[],
    moreInformationLink: string,
    state: 'loaded' | 'loading' | 'errored'
  ) {
    this.items = items
    this.moreInformationLink = moreInformationLink
    this.state = state
  }
  static loading(): MailToGedInformations {
    return new MailToGedInformations([], '', 'loading')
  }

  static errored(): MailToGedInformations {
    return new MailToGedInformations([], '', 'errored')
  }
  static loaded(payload: MailToGedInformations): MailToGedInformations {
    return new MailToGedInformations(
      payload.items,
      payload.moreInformationLink,
      'loaded'
    )
  }

  get isLoading(): boolean {
    return this.state === 'loading'
  }
}
