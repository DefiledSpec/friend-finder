'use strict'

// INIT Materialize elements
let elem = document.querySelector('#modal1')
let modal = M.Modal.init(elem)
let selectEle = document.querySelectorAll('select')

let selectInputs = M.FormSelect.init(selectEle)

// Get modal elements
let modalName = $('#modalName')
let modalPic = $('#modalPic')
let modalBtn = $('#modalBtn')

let form = $('#survey')

// Adds red border to invalid select inputs
let appendAlert = (eleId) => $('#' + eleId).addClass('invalid')

// Asks server for best friend, opens modal with said friend
async function calcFriend(obj) {
	let { name, photo, scores } = obj // Pull out the 'name', 'photo', and 'scores' property from the obj arg
	try {
		let intScores = scores.map(score => parseInt(score)) // Turns scores to number before sending to backend		
		let bf = await getBestFriend({name, photo, scores: intScores})
		openModal(bf) 
	} catch(err) {
		console.dir(err)
	}
}

async function getBestFriend(data) {
	try {
		let headers = new Headers()
		headers.append('Content-Type', 'application/json')
		const options = {
			method: 'POST',
			headers,
			body: JSON.stringify(data)
		}
		let request = new Request('api/friends', options)
		let data = await fetch(request)
		return await data.json() // data is json, fetch requries us to call .json()
	} catch(err) {
		return err
	}
}

// Opens modal
function openModal(name, photo) {
	modalName.text(name)
	modalPic.attr({ src: photo })
	modal.open()
}

/** Event Listeners */
form.on('submit', (e) => { // 'submit' Event listener for the survey form
	e.preventDefault()
	let inputs = form[0]
	let name = `${inputs[0].value.trim()} ${inputs[1].value.trim()}`
	let photo = inputs[2].value.trim()
	let scores = []
	let invalid = false
	for (const select of selectInputs) {
		let { value, id } = select.el
		if(isNaN(value)) {
			invalid = true
			appendAlert(id)
		} 
		if(!invalid)
			scores.push(value)
	}
	// Call getFriend() with an object { name: name, photo: photo, scores: scores}
	if (!invalid) calcFriend({ name, photo, scores })
})

// removes red border on select input change
$('select').on('change', function() {
	$(this).removeClass('invalid')
})

modalBtn.on('click', (e) => { // Event listener for modal button
	modal.close()
	window.location.pathname = '/' // Redirect user to home 
})