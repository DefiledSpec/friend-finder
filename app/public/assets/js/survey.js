'use strict'

let elem = document.querySelector('#modal1');
let modal = M.Modal.init(elem);
let modalName = $('#modalName')
let modalPic = $('#modalPic')
let modalBtn = $('#modalBtn')

let form = $('#survey')

async function getFriend(obj) {
	let { name, photo, scores } = obj
	scores = scores.map(score => parseInt(score)) // Turns scores to number before sending to backend
	let headers = new Headers()
	headers.append('Content-Type', 'application/json')
	console.log({name, photo, scores})
	const options = {
		method: 'POST',
		headers,
		body: JSON.stringify({ name, photo, scores })
	}
	let request = new Request('api/friends', options)
	let res = await fetch(request)
	let friend = await res.json()
	// Populate the modal with the 'bestFriends' info
	modalName.text(friend.name)
	modalPic.attr({ src: friend.photo })
	modal.open()
}

/** Event Listeners */

form.on('submit', (e) => { // 'submit' Event listener for the survey form
	e.preventDefault()
	let inputs = form[0]
	let name = inputs[0].value.trim()
	let photo = inputs[1].value.trim()
	let scores = []
	for(let i = 2; i < inputs.length; i++) {
		if(inputs[i].checked) {
			scores.push(inputs[i].value)
		}
	}
	if(scores.length < 10 || name === '') {
		alert('Please fill in all the fields!')
		return
	}
	getFriend({ name, photo, scores }) // Call getFriend() with an object { name: name, photo: photo, scores: scores}
})

modalBtn.on('click', (e) => { // Event listener for modal button
	modal.close()
	console.log(window.location.pathname = '/') // Redirect user to home 
})