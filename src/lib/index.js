export function isWeixin() {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger' || ua.match(/_SQ_/i) === '_sq_')
    return true

  else
    return false
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
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
