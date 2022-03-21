interface PeriodInterface {
  startDate: string
  endDate: string
}

export default class Period {
  startDate: string
  endDate: string

  constructor({ startDate = '', endDate = '' } = {} as PeriodInterface) {
    this.startDate = startDate
    this.endDate = endDate
  }
}
