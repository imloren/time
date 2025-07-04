import { useEffect, useMemo, useState } from 'react'

const useAccurateTimeCounter = (targetDates: string[]) => {
  const [currentTime, setCurrentTime] = useState(Date.now())

  // 预计算目标时间戳，避免重复解析
  const targetTimestamps = useMemo(
    () => targetDates.map(date => new Date(date).getTime()),
    [targetDates]
  )

  useEffect(() => {
    let animationId: number

    const updateTime = () => {
      const now = Date.now()
      setCurrentTime(now)

      // 使用 requestAnimationFrame 确保下一秒精确更新
      const nextSecond = Math.ceil(now / 1000) * 1000
      const delay = nextSecond - now

      setTimeout(() => {
        animationId = requestAnimationFrame(updateTime)
      }, delay)
    }

    // 立即开始第一次更新
    updateTime()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  // 计算每个时间差
  return useMemo(() => {
    return targetTimestamps.map(targetTime => {
      const diff = currentTime - targetTime
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor(((diff % 86400000) % 3600000) / 60000)
      const seconds = Math.floor((((diff % 86400000) % 3600000) % 60000) / 1000)

      const pad = (num: number) => num.toString().padStart(2, '0')
      return `${days}天${hours}时${pad(minutes)}分${pad(seconds)}秒`
    })
  }, [currentTime, targetTimestamps])
}

export default useAccurateTimeCounter
