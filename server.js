'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const PORT = 5000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('short'))

app.use(express.static(path.join(__dirname, 'app/public')))

app.use('/', (req, res) => {
    res.send('home.html')
})

app.use('/survey', (req, res) => {
    res.send('survey.html')
})

app.listen(PORT, () => console.log(`Friend Finder listening on http://localhost:${PORT}`))
