// import { useSettingsStore } from '@/store/modules/settings'

// const { project } = useSettingsStore()

export function isWeixin() {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger' || ua.match(/_SQ_/i) === '_sq_')
    return true

  else
    return false
}

export function formatDate(dateString) {
  if (!dateString)
    return ''

  const date = new Date(dateString)
  return `${date.getMonth() + 1}月${date.getDate()}日, ${date.getFullYear()}`
  // return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  // const now = new Date()
  // const diffTime = now.getTime() - date.getTime()
  // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // if (diffDays === 0)
  //   return '今日'
  // else if (diffDays === 1)
  //   return '昨天'
  // else if (diffDays === 2)
  //   return '前天'
  // else
  //   return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export function debounce(func, delay) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export function filterData(key, field, data) {
  // key 关键字
  // field 所有过滤的字段
  // data 需要过滤的数据

  return data.filter((item) => {
    return item[field].includes(key)
  })
}

export function objectToArray(obj) {
  // 将对象键值对转换为数组
  const arr = Object.entries(obj)
  // 将数组中的键值对转换为对象
  const result = arr.map(([key, value]) => {
    return {
      key,
      ...value,
    }
  })
  return result
}
