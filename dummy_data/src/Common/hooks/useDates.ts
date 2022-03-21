import dayjs from 'dayjs'
import 'dayjs/locale/fr'

type useDatesReturnType = {
  format: (date: string, format: string) => string
  isBefore: (datebefore: string, dateafter: string) => boolean
  isAfter: (dateafter: string, datebefore: string) => boolean
  subtractInDays: (date: string, nbOfDays: number) => string
  dateNow: () => string
  defaultFormat: (date: string) => string
  formatFullMonth: (date: string) => string
}

const useDates = (): useDatesReturnType => {
  const format = (date: string, format: string) => {
    return dayjs(date).locale('fr').format(format)
  }

  const defaultFormat = (date: string) => {
    return dayjs(date).format()
  }

  const formatFullMonth = (date: string) => {
    return dayjs(date).locale('fr').format('DD MMMM YYYY')
  }

  const isBefore = (datebefore: string, dateafter: string) => {
    return dayjs(datebefore).isBefore(dateafter)
  }

  const isAfter = (dateafter: string, datebefore: string) => {
    return dayjs(dateafter).isAfter(datebefore)
  }

  const subtractInDays = (date: string, nbOfDays: number) => {
    return dayjs(date).subtract(nbOfDays, 'day').format()
  }

  const dateNow = () => {
    return dayjs().format()
  }

  return {
    format,
    isBefore,
    isAfter,
    subtractInDays,
    dateNow,
    defaultFormat,
    formatFullMonth
  }
}

export default useDates
