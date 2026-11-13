import dotenv from 'dotenv'
import express, { static as stat, json, urlencoded } from 'express'
import logger from 'morgan'
import { join } from 'path'
import htmlRoutes from './app/routes/htmlRoutes.js'
import apiRoutes from './app/routes/apiRoutes.js'
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(logger('short'))

app.use(stat(join(import.meta.dirname, 'app/public')))

app.use('/', htmlRoutes)
app.use('/api', apiRoutes)

app.listen(PORT, () => console.log(`Friend Finder listening on http://localhost:${PORT}`))
