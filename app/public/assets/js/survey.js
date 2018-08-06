let elem = document.querySelector('#modal1');
let instance = M.Modal.init(elem);
let modalName = $('#modalName')
let modalPic = $('#modalPic')
let modalBtn = $('#modalBtn')

let form = $('#survey')

form.on('submit', (e) => {
	e.preventDefault()
	let inputs = form[0]
	let name = inputs[0].value.trim()
	let scores = []
	for(let i = 1; i < inputs.length; i++) {
		if(inputs[i].checked) {
			scores.push(inputs[i].value)
		}
	}
	if(scores.length < 10 || name === '') {
		alert('Please fill in all the fields!')
		return
	}
	getFriend({ name, scores })
})

async function getFriend(obj) {
	let { name, scores } = obj
	scores = scores.map(score => parseInt(score)) // Turns scores to number before sending to backend
	let headers = new Headers()
	headers.append('Content-Type', 'application/json')
	const options = {
		method: 'POST',
		headers,
		body: JSON.stringify({ name, scores })
	}
	// console.log(options)
	let request = new Request('api/friends', options)
	let res = await fetch(request)
	let friend = await res.json()
	console.log(friend)
	console.log(instance)
	modalName.text(friend.name)
	console.log(friend.photo)
	modalPic.attr({ src: friend.photo })
	console.log(modalName, modalPic)
	instance.open()
}

modalBtn.on('click', (e) => {
	instance.close()
	console.log(window.location.pathname = '/')
})