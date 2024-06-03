import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import isoWeek from 'dayjs/plugin/isoWeek'
import minMax from 'dayjs/plugin/minMax'

dayjs.extend(weekday)
dayjs.extend(isoWeek)
dayjs.extend(minMax)

export function getEarliestStartAndLatestEnd(tasks) {
  const startTimes = []
  const endTimes = []

  function collectTimes(taskList) {
    taskList.forEach((task) => {
      if (task.start_time)
        startTimes.push(dayjs(task.start_time))

      if (task.end_time)
        endTimes.push(dayjs(task.end_time))

      if (task.children && task.children.length > 0)
        collectTimes(task.children)
    })
  }

  collectTimes(tasks)

  // 获取当前月的第一天和最后一天
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]

  // 如果 startTimes 为空，添加当前月的第一天
  if (startTimes.length === 0)
    startTimes.push(firstDayOfMonth)

  // 如果 endTimes 为空，添加当前月的最后一天
  if (endTimes.length === 0)
    endTimes.push(lastDayOfMonth)

  try {
    return {
      startDay: dayjs.min([...startTimes, ...endTimes]).format('YYYY-MM-DD'),
      endDay: dayjs.max([...startTimes, ...endTimes]).format('YYYY-MM-DD'),
    }
  }
  catch (error) {
    return {
      startDay: firstDayOfMonth,
      endDay: lastDayOfMonth,
    }
  }
}

export function generateDateRanges(startTime, endTime) {
  const startDate = dayjs(startTime)
  const endDate = dayjs(endTime)
  const daysOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  // 补全开始日期之前的天数到最近的星期一
  const adjustedStartDate = startDate.isoWeekday(1)

  // 补全结束日期之后的天数到最近的星期日
  const adjustedEndDate = endDate.isoWeekday(7)

  const result = []
  let currentWeek = []
  let currentDate = adjustedStartDate

  while (currentDate.isBefore(adjustedEndDate) || currentDate.isSame(adjustedEndDate, 'day')) {
    const day = currentDate.date()
    const month = currentDate.month() + 1 // months are 0-based in dayjs
    const dayOfWeek = daysOfWeek[currentDate.day()]

    currentWeek.push({
      date: currentDate.format('YYYY-MM-DD'),
      dateTitle: `${month}月${day}日`,
      subTitle: dayOfWeek,
    })

    if (currentDate.day() === 0) { // 周日
      const startOfWeek = currentWeek[0].dateTitle
      const endOfWeek = currentWeek[currentWeek.length - 1].dateTitle
      const year = currentDate.year()

      result.push({
        title: `${startOfWeek}-${endOfWeek}, ${year}`,
        timeRange: currentWeek,
      })

      currentWeek = []
    }

    currentDate = currentDate.add(1, 'day')
  }

  return result
}
