import { useEffect, useMemo, useState } from 'react'

const useAccurateTimeCounter = (targetDates: string[]) => {
  const [currentTime, setCurrentTime] = useState(Date.now())

  const targetTimestamps = useMemo(
    () => targetDates.map((date) => new Date(date).getTime()),
    [targetDates]
  )

  useEffect(() => {
    let timeoutId: number

    const updateTime = () => {
      const now = Date.now()
      setCurrentTime(now)

      timeoutId = window.setTimeout(updateTime, 1000 - (now % 1000))
    }

    updateTime()

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  return useMemo(() => {
    return targetTimestamps.map((targetTime) => {
      const diff = currentTime - targetTime
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor(((diff % 86400000) % 3600000) / 60000)
      const seconds = Math.floor((((diff % 86400000) % 3600000) % 60000) / 1000)

      return { days, hours, minutes, seconds }
    })
  }, [currentTime, targetTimestamps])
}

export default useAccurateTimeCounter
