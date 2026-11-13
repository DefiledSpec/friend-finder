import { Router } from 'express'
import { join } from 'path'

const router = Router()

router.get('/survey', (req, res) => {
  res.sendFile(join(import.meta.dirname, '../public/survey.html'))
})

router.get('/', (req, res) => {
  res.sendFile(join(import.meta.dirname, '../public/home.html'))
})

export default router
