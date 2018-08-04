'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const htmlRoutes = require('./app/routes/htmlRoutes')
const apiRoutes = require('./app/routes/apiRoutes')

const PORT = 5000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('short'))

app.use(express.static(path.join(__dirname, 'app/public/')))

app.use('/', htmlRoutes)
app.use('/api', apiRoutes)

app.listen(PORT, () => console.log(`Friend Finder listening on http://localhost:${PORT}`))
