const getTodayStartEnd = () => {
  const today = new Date()
  const startOfToday = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfToday = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  return { startOfToday, endOfToday }
}

export default getTodayStartEnd
