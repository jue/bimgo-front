export function countTasks(tasks) {
  let count = tasks.length
  for (const task of tasks) {
    if (task.children)
      count += countTasks(task.children)
  }
  return count
}

export function getStartAndEndTimes(tasks) {
  let earliestStartTime = null
  let latestEndTime = null

  for (const task of tasks) {
    if (task.start_time !== undefined && (earliestStartTime === null || task.start_time < earliestStartTime))
      earliestStartTime = task.start_time

    if (task.end_time !== undefined && (latestEndTime === null || task.end_time > latestEndTime))
      latestEndTime = task.end_time

    if (task.children) {
      const childTimes = getStartAndEndTimes(task.children)

      if (childTimes.earliestStartTime !== null && (earliestStartTime === null || childTimes.earliestStartTime < earliestStartTime))
        earliestStartTime = childTimes.earliestStartTime

      if (childTimes.latestEndTime !== null && (latestEndTime === null || childTimes.latestEndTime > latestEndTime))
        latestEndTime = childTimes.latestEndTime
    }
  }

  return { earliestStartTime, latestEndTime }
}

export function getFormattedWeeksInRange(start, end, startDayOfWeek = 0) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  endDate.setDate(endDate.getDate() + 7) // Extend end date by 7 days to include the last week

  const weeks = []

  // Calculate the starting day of the first week
  const currentWeekStart = new Date(startDate)
  const startDay = startDate.getDay()
  const offset = (startDay - startDayOfWeek + 7) % 7
  currentWeekStart.setDate(currentWeekStart.getDate() - offset)

  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  const weekDayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  // Handle the first week separately
  const firstWeekEnd = new Date(currentWeekStart)
  firstWeekEnd.setDate(firstWeekEnd.getDate() + 6)

  const firstWeekStartDay = startDate.getDate()
  const firstWeekStartMonth = monthNames[startDate.getMonth()]
  const firstWeekEndDay = firstWeekEnd.getDate()
  const firstWeekEndMonth = monthNames[firstWeekEnd.getMonth()]
  const year = startDate.getFullYear()

  let formattedFirstWeek
  const firstWeekDays = []

  if (startDate.getMonth() !== firstWeekEnd.getMonth())
    formattedFirstWeek = `${firstWeekStartDay} ${firstWeekStartMonth} ${year} - ${firstWeekEndDay} ${firstWeekEndMonth} ${year}`
  else
    formattedFirstWeek = `${firstWeekStartDay}-${firstWeekEndDay} ${firstWeekStartMonth} ${year}`

  const daysInFirstWeek = (firstWeekEnd - startDate) / (1000 * 60 * 60 * 24) + 1

  for (let i = 0; i < daysInFirstWeek; i++) {
    const day = new Date(startDate)
    day.setDate(day.getDate() + i)
    firstWeekDays.push({ day: day.getDate(), dayName: weekDayNames[(day.getDay() - startDayOfWeek + 7) % 7] })
  }

  weeks.push({ formattedWeek: formattedFirstWeek, daysInWeek: daysInFirstWeek, weekDays: firstWeekDays })

  currentWeekStart.setDate(currentWeekStart.getDate() + 7)

  while (currentWeekStart <= endDate) {
    const weekEnd = new Date(currentWeekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    const weekStartDay = currentWeekStart.getDate()
    const weekStartMonth = monthNames[currentWeekStart.getMonth()]
    const weekEndDay = weekEnd.getDate()
    const weekEndMonth = monthNames[weekEnd.getMonth()]
    const year = currentWeekStart.getFullYear()

    let formattedWeek
    const weekDays = []

    // Check if the week spans multiple months
    if (currentWeekStart.getMonth() !== weekEnd.getMonth())
      formattedWeek = `${weekStartDay} ${weekStartMonth} ${year} - ${weekEndDay} ${weekEndMonth} ${year}`
    else
      formattedWeek = `${weekStartDay}-${weekEndDay} ${weekStartMonth} ${year}`

    const daysInWeek = (weekEnd - currentWeekStart) / (1000 * 60 * 60 * 24) + 1

    for (let i = 0; i < daysInWeek; i++) {
      const day = new Date(currentWeekStart)
      day.setDate(day.getDate() + i)
      weekDays.push({ day: day.getDate(), dayName: weekDayNames[(day.getDay() - startDayOfWeek + 7) % 7] })
    }

    weeks.push({ formattedWeek, daysInWeek, weekDays })

    currentWeekStart.setDate(currentWeekStart.getDate() + 7)
  }

  return weeks
}

export function calculateDays(earliestStartTime, start_time, end_time) {
  const daysFromEarliestStartTime = (date) => {
    if (!date)
      return 0
    const diffTime = Math.abs(new Date(date) - new Date(earliestStartTime))
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const durationInDays = (start, end) => {
    if (!start || !end)
      return 1
    const diffTime = Math.abs(new Date(end) - new Date(start))
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // 这里修改了,多加了1天
  }

  if (!start_time && !end_time) {
    return {
      daysFromEarliestStartTime: 0,
      durationInDays: 0,
    }
  }

  const startDays = daysFromEarliestStartTime(start_time)
  const endDays = daysFromEarliestStartTime(end_time)
  const duration = durationInDays(start_time, end_time)

  return {
    leftDate: start_time ? startDays : endDays,
    durationDate: duration,
  }
}

export function calculateMonitorData(num, width = 56) {
  // 找到离给定数最近的两个整数倍
  const lowerMultiple = Math.floor(num / width) * width
  const upperMultiple = lowerMultiple + width

  return [lowerMultiple, upperMultiple]
}
