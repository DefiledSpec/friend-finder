const express = require('express')
const path = require('path')

const routes = express.Router()

routes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'))
})

routes.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/survey.html'))
})

module.exports = routes
