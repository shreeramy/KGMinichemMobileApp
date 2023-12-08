import moment from 'moment'
import { showMessage } from 'react-native-flash-message'
import ImageResizer from 'react-native-image-resizer'

const deepClone = (val: any) => {
  return JSON.parse(JSON.stringify(val))
}

const showDangerToast = (message: string) => {
  showMessage({
    message,
    type: 'danger',
    animated: true,
    position: 'top'
  })
}

const showSuccessToast = (message: string) => {
  showMessage({
    message,
    type: 'success',
    animated: true,
    position: 'top'
  })
}

const getTimeString = (date: string) => {
  if (date) {
    const isSameDay = moment(date).isSame(moment(), 'd')
    const startDate = moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY')
    const endDate = moment(moment(date).format('DD-MM-YYYY'), 'DD-MM-YYYY')
    const dayDiff = startDate.diff(endDate, 'days')
    const isYesterDay = dayDiff === 1
    if (isSameDay) {
      return moment(date).format('hh:mm a')
    }
    if (isYesterDay) {
      return 'Yesterday'
    }
    return moment(date).format('L')
  }
  return ''
}

const getDateString = (date: string) => {
  if (date) {
    const isSameDay = moment(date).isSame(moment(), 'd')
    const startDate = moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY')
    const endDate = moment(moment(date).format('DD-MM-YYYY'), 'DD-MM-YYYY')
    const dayDiff = startDate.diff(endDate, 'days')
    const isYesterDay = dayDiff === 1
    if (isSameDay) {
      return 'Today'
    }
    if (isYesterDay) {
      return 'Yesterday'
    }
    return moment(date).format('L')
  }
  return ''
}

const getLastDateString = (date: string) => {
  if (date) {
    const isSameDay = moment(date).isSame(moment(), 'd')
    const startDate = moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY')
    const endDate = moment(moment(date).format('DD-MM-YYYY'), 'DD-MM-YYYY')
    const dayDiff = startDate.diff(endDate, 'days')
    const isYesterDay = dayDiff === 1
    if (isSameDay) {
      return `last seen today at ${moment(date).format('hh:mm A')}`
    }
    if (isYesterDay) {
      return 'Yesterday'
    }
    return moment(date).format('L')
  }
  return ''
}

const getFileName = (url: string) => {
  if (url) {
    return url.split('/').pop()
  }
  return ''
}

const validateEmail = (val: string) => {
  const reg =
    /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\\-])+(\.))+([a-zA-Z]{2,4})+$/i
  return reg.test(val)
}

const roundValue = (val: number) => {
  return Math.round((val + Number.EPSILON) * 100) / 100
}

const getImageResizer = (path, compressFormat: any = 'JPEG') =>
  ImageResizer.createResizedImage(path, 900, 900, compressFormat, 80, 0, undefined, false, {
    mode: 'contain',
    onlyScaleDown: false
  })

const Utility = {
  deepClone,
  getTimeString,
  getDateString,
  getLastDateString,
  getFileName,
  validateEmail,
  roundValue,
  showDangerToast,
  showSuccessToast,
  getImageResizer
}

export default Utility
