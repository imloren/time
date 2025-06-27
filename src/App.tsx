import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { dateFormat } from './utils'
import styles from './App.module.less'

const App = () => {
  const [know, setKnow] = useState(dateFormat('9 4,2015'))
  const [love, setLove] = useState(dateFormat('2 5,2016'))
  // const [jxsan, setJxsan] = useState(dateFormat('9 1,2017'))
  const [weddingDay, setWeddingDay] = useState(dateFormat('8 22,2023'))

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setInterval(() => {
      setKnow(dateFormat('9 4,2015'))
      setLove(dateFormat('2 5,2016'))
      setWeddingDay(dateFormat('8 22,2023'))
    }, 1000)
  }

  return (
    <div className={styles['App-wrapper']}>
      <Container className='home-wrapper' maxWidth='sm'>
        <Box className='container' sx={{ pt: 4 }} bgcolor='transparent'>
          <Typography
            variant='h3'
            color='textPrimary'
            align='center'
            component='h1'
            sx={{ mb: 2, fontWeight: 500 }}
          >
            <div
              style={{
                background: 'linear-gradient(45deg, #7e57c2 30%, #5e35b1 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              我们的故事
            </div>
          </Typography>
          <Typography
            variant='subtitle1'
            color='textSecondary'
            align='center'
            component='p'
            sx={{ mb: 4 }}
          >
            时光荏苒，爱意永恒
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
