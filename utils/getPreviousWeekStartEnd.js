const getPreviousWeekStartEnd = () => {
  const today = new Date()
  const currentDay = today.getDay()

  const diffToMonday = (currentDay === 0 ? 7 : currentDay) - 1

  const currentWeekStart = new Date(today)
  currentWeekStart.setDate(today.getDate() - diffToMonday)

  const prevWeekStart = new Date(currentWeekStart)
  prevWeekStart.setDate(currentWeekStart.getDate() - 7)

  const prevWeekEnd = new Date(currentWeekStart)
  prevWeekEnd.setDate(currentWeekStart.getDate() - 1)

  const startOfThePrevWeek = prevWeekStart.toISOString()
  const endOfThePrevWeek = prevWeekEnd.toISOString()

  return { startOfThePrevWeek, endOfThePrevWeek }
}

export default getPreviousWeekStartEnd
