export function getEarliestStartAndLatestEnd(data) {
  let earliestStart = null
  let latestEnd = null

  // 遍历所有项目和任务
  for (const project of data) {
    // 检查当前项目的 start_time 和 end_time
    if (project.start_time) {
      const projectStartTime = new Date(project.start_time)
      if (!isNaN(projectStartTime)) {
        if (earliestStart === null || projectStartTime < earliestStart)
          earliestStart = projectStartTime
      }
    }

    if (project.end_time) {
      const projectEndTime = new Date(project.end_time)
      if (!isNaN(projectEndTime)) {
        if (latestEnd === null || projectEndTime > latestEnd)
          latestEnd = projectEndTime
      }
    }

    // 递归检查子任务
    const { children } = project
    if (children && children.length > 0) {
      const { earliestStartChild, latestEndChild } = getEarliestStartAndLatestEnd(children)
      if (earliestStartChild && (earliestStart === null || earliestStartChild < earliestStart))
        earliestStart = earliestStartChild

      if (latestEndChild && (latestEnd === null || latestEndChild > latestEnd))
        latestEnd = latestEndChild
    }
  }

  return {
    earliestStart: earliestStart ? earliestStart.toISOString().slice(0, 10) : null,
    latestEnd: latestEnd ? latestEnd.toISOString().slice(0, 10) : null,
  }
}

export function getTimeLines(earliestStart, latestEnd) {
  if (!earliestStart || !latestEnd) {
    // 如果earliestStart为空时，earliestStart为当前月第一天
    const currentDate = new Date()
    earliestStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    latestEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  }

  const timeLines = []
  const currentDate = new Date(earliestStart)
  const endDate = new Date(latestEnd)

  while (currentDate <= endDate) {
    const subTitle = new Date(currentDate)
    subTitle.setDate(currentDate.getDate() - currentDate.getDay())
    const weekEnd = new Date(currentDate)
    weekEnd.setDate(currentDate.getDate() + (6 - currentDate.getDay()))

    const sameMonth = subTitle.getMonth() === weekEnd.getMonth()
    const title = getTitleString(subTitle, weekEnd, sameMonth)

    const timeRange = []
    const timeRangeDate = new Date(subTitle)

    while (timeRangeDate <= weekEnd) {
      const dateString = timeRangeDate.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })
      const dayOfWeek = timeRangeDate.toLocaleDateString('zh-CN', { weekday: 'long' }).replace('星期', '周')
      timeRange.push({ date: dateString, subTitle: dayOfWeek })
      timeRangeDate.setDate(timeRangeDate.getDate() + 1)
    }

    timeLines.push({ title, timeRange })
    currentDate.setDate(currentDate.getDate() + 7)
  }

  return timeLines
}

function getTitleString(subTitle, weekEnd, sameMonth) {
  if (sameMonth) {
    return `${subTitle.getMonth() + 1}月${subTitle.getDate()}-${weekEnd.getDate()}, ${subTitle.getFullYear()}`
  }
  else {
    const startMonthAndDay = subTitle.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })
    const endMonthAndDay = weekEnd.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })
    return `${startMonthAndDay}-${endMonthAndDay}, ${subTitle.getFullYear()}`
  }
}
