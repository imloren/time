import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import styles from './App.module.less'
import { useAccurateTimeCounter, useTypewriter } from './hooks'

const App = () => {
  const [know, love, weddingDay] = useAccurateTimeCounter(['9 4,2015', '2 5,2016', '8 22,2023'])

  const title = useTypewriter('我们的故事', { speed: 150, delay: 500 })
  const subtitle = useTypewriter('时光荏苒，爱意永恒。', {
    speed: 100,
    delay: 2000,
  })

  return (
    <main className={styles['App-wrapper']}>
      <Container className='home-wrapper' maxWidth='sm'>
        <Box className='container' sx={{ pt: 4, backgroundColor: 'transparent' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              minHeight: '80px',
              // 悬停效果只在支持悬停的指针设备上生效，避免触屏粘滞
              '@media (hover: hover)': {
                '&:hover .left-image': {
                  transform: 'scaleX(-1) scale(1.1) rotate(-15deg) !important',
                  boxShadow:
                    '0 0 30px color-mix(in srgb, var(--color-accent) 60%, transparent) !important',
                },
                '&:hover .right-image': {
                  transform: 'scale(1.1) rotate(-15deg) !important',
                  boxShadow:
                    '0 0 30px color-mix(in srgb, var(--color-accent-strong) 60%, transparent) !important',
                },
              },
            }}
          >
            <img
              className='left-image'
              src='https://cdn.jsdelivr.net/gh/imloren/cdn@main/imgs/1.jpg'
              alt=''
              style={{
                flex: '0 0 auto',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '20px',
                animation: 'heartbeat 2s ease-in-out infinite, fadeInLeft 1s ease-out',
                boxShadow: '0 0 20px color-mix(in srgb, var(--color-accent) 30%, transparent)',
                border: '2px solid color-mix(in srgb, var(--color-accent) 20%, transparent)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: 'scaleX(-1)',
              }}
            />
            <Typography
              variant='h3'
              color='textPrimary'
              align='center'
              component='h1'
              aria-label='我们的故事'
              sx={{
                fontWeight: 500,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                aria-hidden='true'
                style={{
                  background:
                    'linear-gradient(45deg, var(--color-accent) 30%, var(--color-accent-strong) 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {title.displayedText}
                {!title.isComplete && <span className='cursor'>|</span>}
              </span>
            </Typography>
            <img
              className='right-image'
              src='https://cdn.jsdelivr.net/gh/imloren/cdn@main/imgs/2.jpg'
              alt=''
              style={{
                flex: '0 0 auto',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginLeft: '20px',
                animation: 'heartbeat 2s ease-in-out infinite 0.5s, fadeInRight 1s ease-out',
                boxShadow:
                  '0 0 20px color-mix(in srgb, var(--color-accent-strong) 30%, transparent)',
                border: '2px solid color-mix(in srgb, var(--color-accent-strong) 20%, transparent)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            />
          </Box>
          <Typography
            variant='subtitle1'
            color='textSecondary'
            align='center'
            component='p'
            sx={{ mb: 4, minHeight: '30px' }}
          >
            <span className='sr-only'>时光荏苒，爱意永恒。</span>
            <span aria-hidden='true'>
              {subtitle.displayedText}
              {!subtitle.isComplete && subtitle.displayedText && <span className='cursor'>|</span>}
            </span>
          </Typography>
          <Typography color='textPrimary' align='center' component='div'>
            <div className='xiangshi time-text'>初见：{know}</div>
          </Typography>
          <Typography color='textPrimary' align='center' component='div'>
            <div className='love time-text'>心动：{love}</div>
          </Typography>
          <Typography color='textPrimary' align='center' component='div'>
            <div className='wedding time-text'>执手：{weddingDay}</div>
          </Typography>
        </Box>
      </Container>
    </main>
  )
}

export default App
