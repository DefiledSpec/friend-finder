const express = require('express')
const friends = require('../data/friends')

const routes = express.Router()

routes.get('/friends', (req, res) => {
    res.send(JSON.stringify(friends))
})

routes.post('/survey', (req, res) => {
   let { survey } = req.body
   res.send(JSON.stringify(survey))
})

module.exports = routes
