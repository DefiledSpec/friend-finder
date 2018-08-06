getFriends()

async function getFriends() {
	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	const options = { method: 'GET', headers }
	// GET request to 'api/friends' returns us an array of objects [{...},{...}]
	let request = new Request('api/friends', options)
	// Await the data then call .json() to parse the data then call displayFriends()
	let res = await fetch(request)
	displayFriends(await res.json())
}

/**
 * @param {number} - Array of users
 * @description Creates a card for each user then displays it in #friendsRow
 */
function displayFriends(users) {
	let friends = $('#friendsRow').empty()
	let cards = [] // for storing our users' cards
	if(users) {
		users.forEach((user, i) => { // Create the cards for ea user and push them to cards[]
			let img = $('<div>').addClass('card-image')
				.append($('<img>').attr({ src: user.photo }))
			let content = $('<div>').addClass('card-content')
				.append($('<p>').addClass('card-title center').text(user.name))
				.append($('<p>').text(`Scores:${user.scores}`))
			let card = $('<div>').addClass('card').append(img).append(content)
			cards.push($('<div>').addClass('col s4').append(card))
		})
		let row;
		cards.forEach((card, i) => {
			if((i % 3) === 0) { // Every mod 3 element 0 included
				if(i !== 0) friends.append(row) // Every mod 3 but not the first time
				friends.append(row)
				row = $('<div>').addClass('row') // create / clear the row every mod 3
				row.append(card) // we still need to append the card here
			} else { // append the card to the row
				row.append(card)
			}
			// If we're at the end of the array but its not mod 3 then we still need
			// to display the row
			if(i === cards.length - 1) friends.append(row)
		})
	}
}
