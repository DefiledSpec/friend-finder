'use strict';
import { Router } from 'express';
import { getFriends, addFriend } from '../data/friends.js';

const routes = Router();

routes.get('/friends', (req, res) => {
	res.json(getFriends());
});

routes.post('/friends', (req, res) => {
	const { name, photo, scores } = req.body;
	const userScores = scores.map(Number);

	let bestDifference = Infinity;
	let bestFriends = [];

	for (const friend of friends) {
		let totalDiff = 0;
		for (let i = 0; i < userScores.length; i++) {
			totalDiff += Math.abs(userScores[ i ] - Number(friend.scores[ i ]));
		}

		if (totalDiff < bestDifference) {
			bestDifference = totalDiff;
			bestFriends = [ friend ];
		} else if (totalDiff === bestDifference) {
			bestFriends.push(friend);
		}
	}

	const bestMatch = bestFriends[ Math.floor(Math.random() * bestFriends.length) ];
	push({ name, photo, scores: userScores });

	res.json(bestMatch);
});

export default routes;
