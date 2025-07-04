import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useAccurateTimeCounter, useTypewriter } from './hooks'
import styles from './App.module.less'

const App = () => {
  const [know, love, weddingDay] = useAccurateTimeCounter(['9 4,2015', '2 5,2016', '8 22,2023'])

  const title = useTypewriter('我们的故事', { speed: 150, delay: 500 })
  const subtitle = useTypewriter('时光荏苒，爱意永恒。', { speed: 100, delay: 2000 })

  return (
    <div className={styles['App-wrapper']}>
      <Container className='home-wrapper' maxWidth='sm'>
        <Box className='container' sx={{ pt: 4 }} bgcolor='transparent'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              minHeight: '80px',
              '&:hover .left-image': {
                transform: 'scaleX(-1) scale(1.1) rotate(-15deg) !important',
                boxShadow: '0 0 30px rgba(126, 87, 194, 0.6) !important',
              },
              '&:hover .right-image': {
                transform: 'scale(1.1) rotate(-15deg) !important',
                boxShadow: '0 0 30px rgba(94, 53, 177, 0.6) !important',
              },
            }}
          >
            <img
              className='left-image'
              src='https://cdn.jsdelivr.net/gh/imloren/cdn@main/imgs/1.jpg'
              alt='左侧图片'
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '20px',
                animation: 'heartbeat 2s ease-in-out infinite, fadeInLeft 1s ease-out',
                boxShadow: '0 0 20px rgba(126, 87, 194, 0.3)',
                border: '2px solid rgba(126, 87, 194, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: 'scaleX(-1)',
              }}
            />
            <Typography
              variant='h3'
              color='textPrimary'
              align='center'
              component='h1'
              sx={{
                fontWeight: 500,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(45deg, #7e57c2 30%, #5e35b1 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {title.displayedText}
                {!title.isComplete && <span className='cursor'>|</span>}
              </div>
            </Typography>
            <img
              className='right-image'
              src='https://cdn.jsdelivr.net/gh/imloren/cdn@main/imgs/2.jpg'
              alt='右侧图片'
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginLeft: '20px',
                animation: 'heartbeat 2s ease-in-out infinite 0.5s, fadeInRight 1s ease-out',
                boxShadow: '0 0 20px rgba(94, 53, 177, 0.3)',
                border: '2px solid rgba(94, 53, 177, 0.2)',
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
            {subtitle.displayedText}
            {!subtitle.isComplete && subtitle.displayedText && <span className='cursor'>|</span>}
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
    </div>
  )
}

export default App
