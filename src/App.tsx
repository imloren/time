import { useEffect, useRef, useState } from 'react'
import styles from './App.module.less'
import useAccurateTimeCounter from './hooks/useAccurateTimeCounter'

const chapters = [
  {
    id: 'first-hello',
    title: '初见',
    english: 'The first hello',
    date: '2015-09-04',
    quote: '从这一天起，故事有了开头。',
    caption: '距离第一次相遇',
  },
  {
    id: 'falling-in-love',
    title: '心动',
    english: 'A little closer',
    date: '2016-02-05',
    quote: '平凡的日子，也开始值得期待。',
    caption: '心动之后的每一天',
  },
  {
    id: 'hand-in-hand',
    title: '执手',
    english: 'All our tomorrows',
    date: '2023-08-22',
    quote: '把往后的日子，一起慢慢走。',
    caption: '携手走过的时光',
  },
]
const targetDates = chapters.map(({ date }) => `${date}T00:00:00`)

function App() {
  const counters = useAccurateTimeCounter(targetDates)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.removeAttribute('data-pending')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 }
    )
    for (const section of document.querySelectorAll('[data-reveal]')) {
      section.setAttribute('data-pending', '')
      observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <main className={styles.page} id='our-story'>
      <a className={styles.skipLink} href='#first-hello'>
        跳到我们的故事
      </a>
      <section className={styles.cover} aria-labelledby='cover-title'>
        <header className={styles.header}>
          <a className={styles.wordmark} href='#our-story'>
            OUR STORY<span>始于二〇一五</span>
          </a>
          <nav aria-label='故事章节'>
            {chapters.map((chapter, index) => (
              <a key={chapter.id} href={`#${chapter.id}`}>
                <span>0{index + 1}</span> {chapter.title}
              </a>
            ))}
          </nav>
        </header>
        <div className={styles.coverContent}>
          <div className={styles.orbits} aria-hidden='true' />
          <p className={styles.eyebrow}>A STORY STILL UNFOLDING</p>
          <p className={styles.coverScript} aria-hidden='true'>
            Our story
          </p>
          <h1 id='cover-title'>我们的故事</h1>
          <p className={styles.coverSubtitle}>从初见，到余生。</p>
          <p className={styles.coverDate}>
            <time dateTime='2015-09-04'>2015.09.04</time>
            <span aria-hidden='true' />
            未完待续
          </p>
        </div>
        <div className={styles.coverFooter}>
          <p>一段时光，两个人。</p>
          <a className={styles.beginLink} href='#first-hello'>
            翻开故事<span aria-hidden='true'>↓</span>
          </a>
          <p>EVERY SECOND, TOGETHER.</p>
        </div>
      </section>

      {chapters.map((chapter, index) => {
        const counter = counters[index]
        const nextChapter = chapters[index + 1]
        return (
          <section
            key={chapter.id}
            id={chapter.id}
            className={styles.chapter}
            aria-labelledby={`${chapter.id}-title`}
          >
            <div className={styles.chapterInner} data-reveal>
              <div className={styles.chapterHeader}>
                <span>CHAPTER 0{index + 1}</span>
                <time dateTime={chapter.date}>{chapter.date.replace(/-/g, '.')}</time>
              </div>
              <div className={styles.chapterContent}>
                <div className={styles.chapterStory}>
                  <span className={styles.chapterNumber} aria-hidden='true'>
                    0{index + 1}
                  </span>
                  <p className={styles.chapterEnglish}>{chapter.english}</p>
                  <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
                  <p className={styles.quote}>{chapter.quote}</p>
                </div>
                <div className={styles.counter} role='timer'>
                  <p className={styles.counterCaption}>{chapter.caption}</p>
                  <p className={styles.days}>
                    <span>{counter.days.toLocaleString('en-US')}</span>
                    <span className={styles.dayUnit}>天</span>
                  </p>
                  <div className={styles.clock}>
                    {[
                      { value: counter.hours, unit: '时', english: 'HOURS' },
                      { value: counter.minutes, unit: '分', english: 'MINUTES' },
                      { value: counter.seconds, unit: '秒', english: 'SECONDS' },
                    ].map(({ value, unit, english }) => (
                      <p key={unit}>
                        <span className={styles.clockValue}>{String(value).padStart(2, '0')}</span>
                        <span className={styles.clockUnit}>{unit}</span>
                        <span className={styles.clockLabel} aria-hidden='true'>
                          {english}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <a
                className={styles.nextLink}
                href={nextChapter ? `#${nextChapter.id}` : '#to-be-continued'}
              >
                {nextChapter ? `下一章 · ${nextChapter.title}` : '故事还在继续'}
                <span aria-hidden='true'>↘</span>
              </a>
            </div>
          </section>
        )
      })}

      <footer className={styles.ending} id='to-be-continued'>
        <div data-reveal>
          <p className={styles.eyebrow}>THE BEST IS STILL TO COME</p>
          <p className={styles.endingScript} aria-hidden='true'>
            To be continued.
          </p>
          <h2>故事还在继续。</h2>
          <p className={styles.endingNote}>每一秒，都是我们。</p>
          <button
            type='button'
            className={styles.shareButton}
            onClick={() => void shareStory().then(setNotice)}
          >
            分享我们的故事<span aria-hidden='true'>↗</span>
          </button>
        </div>
        <div className={styles.colophon}>
          <span>始于初见，终于余生。</span>
          <a href='#our-story'>回到开头 ↑</a>
        </div>
      </footer>
      <MusicPlayer onNotice={setNotice} />
      <Notice message={notice} setMessage={setNotice} />
    </main>
  )
}

function Notice({ message, setMessage }: { message: string; setMessage: (value: string) => void }) {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!message) return

    const timeoutId = hovered ? undefined : window.setTimeout(() => setMessage(''), 5000)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMessage('')
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(timeoutId)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [message, hovered, setMessage])

  return (
    <div
      className={styles.notice}
      role='status'
      aria-atomic='true'
      data-visible={Boolean(message)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {message}
    </div>
  )
}

function MusicPlayer({ onNotice }: { onNotice: (message: string) => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)

  async function toggleMusic() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      return
    }
    setLoading(true)
    audio.volume = 0.45
    try {
      await audio.play()
    } catch {
      onNotice('音乐暂时无法播放，请稍后重试。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.musicControl}>
      {/* biome-ignore lint/a11y/useMediaCaption: 可选背景音乐不承载页面正文信息。 */}
      <audio
        ref={audioRef}
        src='/time/story.mp3'
        loop
        preload='none'
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false)
          setLoading(false)
          onNotice('音乐暂时无法播放，请稍后重试。')
        }}
      />
      <span className={styles.musicLabel} aria-hidden='true'>
        {loading ? '正在加载' : playing ? '音乐已开启' : '听见故事'}
      </span>
      <button
        type='button'
        className={styles.musicButton}
        aria-label={loading ? '正在加载音乐' : playing ? '暂停音乐' : '播放音乐'}
        aria-pressed={playing}
        disabled={loading}
        onClick={() => void toggleMusic()}
        data-playing={playing}
      >
        <span className={styles.equalizer} aria-hidden='true'>
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
    </div>
  )
}

async function shareStory() {
  const url = new URL(window.location.href)
  url.hash = ''
  if (navigator.share) {
    try {
      await navigator.share({
        title: '我们的故事 · 从初见，到余生',
        text: '从初见，到余生。故事还在继续。',
        url: url.href,
      })
      return ''
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return ''
    }
  }
  try {
    await navigator.clipboard.writeText(url.href)
    return '故事链接已复制，可以分享给朋友了。'
  } catch {
    return '暂时无法自动分享，请复制浏览器地址栏中的链接。'
  }
}

export default App
