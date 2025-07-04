import { useState, useEffect, useRef } from 'react'

interface UseTypewriterOptions {
  speed?: number // 打字速度，毫秒
  delay?: number // 开始前的延迟
}

const useTypewriter = (text: string, options: UseTypewriterOptions = {}) => {
  const { speed = 100, delay = 0 } = options
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    // 清理之前的动画
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    if (!text) {
      setDisplayedText('')
      setIsComplete(false)
      return
    }

    setDisplayedText('')
    setIsComplete(false)
    startTimeRef.current = null
    currentIndexRef.current = 0

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime + delay
      }

      // 如果还在延迟期间，继续等待
      if (currentTime < startTimeRef.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // 计算应该显示到第几个字符
      const elapsedTime = currentTime - startTimeRef.current
      const targetIndex = Math.floor(elapsedTime / speed)

      if (targetIndex > currentIndexRef.current && currentIndexRef.current < text.length) {
        currentIndexRef.current = Math.min(targetIndex, text.length)
        setDisplayedText(text.slice(0, currentIndexRef.current))
      }

      if (currentIndexRef.current >= text.length) {
        setIsComplete(true)
      } else {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [text, speed, delay])

  return { displayedText, isComplete }
}

export default useTypewriter
