const express = require('express')
const friends = require('../data/friends')

const routes = express.Router()

routes.get('/friends', (req, res) => { // Returns json [] of friend obj
    res.send(JSON.stringify(friends))
})

routes.post('/friends', (req, res) => {
	let { name, scores } = req.body

	let userCount = 0
	let bestScore = 1000 // Start the best score high
	let bestFriends = []
	for (const score of scores) { // Adds up users' scores
		userCount += score
	}
	for (const friend of friends) {
		let count = 0
		for (const score of friend.scores) { // Adds each users scores
			count += score
		}
		let curScore = Math.abs(userCount - count) // Compare ea users' score to surveyee 
		if(curScore === bestScore) { // If the curScore = best score we'll add the user to best friends
			bestFriends.push(friend)
		}
		if(curScore < bestScore) { // if the curScore < bestScore, this user is the best match
			bestScore = curScore // Set bestScore to the new best
			bestFriends = [ friend ] // we only need one friend in the array since curScore !== bestScore
		}
	}
	let rand = Math.floor(Math.random() * bestFriends.length)
	if (bestFriends) res.send(JSON.stringify(bestFriends[rand])) // Pick a best friend (if multiple), res.send()
})

module.exports = routes
