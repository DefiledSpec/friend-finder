getFriends();

async function getFriends() {
	try {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const options = { method: 'GET', headers };
		const request = new Request('api/friends', options);
		const res = await fetch(request);
		const json = await res.json();
		displayFriends(json);
	} catch(error) {
		console.log('fetch Error:', error);
	}
}

function displayFriends(users) {
	const friends = $('#friendsRow').empty();
	if (!users || !users.length) return;

	let row;
	users.forEach((user, i) => {
		if (i % 4 === 0) {
			row = $('<div>').addClass('row');
			friends.append(row);
		}

		const fallbackAvatar = `https://ui-avatars.com/${encodeURIComponent(user.name)}?background=00bfa5&color=0f1117&size=256&bold=true`;

		const imgEl = $('<img>')
			.attr({ src: user.photo || fallbackAvatar, alt: user.name })
			.on('error', function () {
				$(this).off('error').attr('src', fallbackAvatar);
			});

		const imgWrap = $('<div>').addClass('card-image').append(imgEl);
		const content = $('<div>')
			.addClass('card-content')
			.append($('<p>').addClass('card-title center').text(user.name));

		const card = $('<div>').addClass('card friend-card').append(imgWrap).append(content);
		const col = $('<div>').addClass('col s12 m6 l3').append(card);

		row.append(col);
	});
}
