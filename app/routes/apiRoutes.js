const express = require('express')
const friends = require('../data/friends')

const routes = express.Router()

routes.get('/friends', (req, res) => {
    res.send(JSON.stringify(friends))
})

routes.post('/friends', (req, res) => {
	let { name, scores } = req.body
	// console.log(req.body)
	let userCount = 0
	let bestScore = 1000
	let bestFriends = []
	for (const score of scores) {
		userCount += score
	}
	for (const friend of friends) {
		let count = 0
		for (const score of friend.scores) {
			count += score
		}
		let curScore = Math.abs(userCount - count)
		if(curScore === bestScore) {
			bestFriends.push(friend)
		}
		if(curScore < bestScore) {
			bestScore = curScore
			bestFriends = [ friend ]
		}
	}
	let rand = Math.floor(Math.random() * bestFriends.length)
	console.log(bestFriends)
	if (bestFriends) res.send(JSON.stringify(bestFriends[rand]))
})

module.exports = routes
