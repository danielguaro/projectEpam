// To login
export const postDataLogin = async (userEmail, userPassword) => {
	const newUser = { email: userEmail, password: userPassword };
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();

	if (result.successful === false) {
		alert(result.result);
		console.log(result.result);
		return {
			isAuth: false,
		};
	}

	const token = result.result;
	const { name, email } = result.user;

	return {
		isAuth: true,
		name,
		email,
		token,
	};
};

export const getCourses = async () => {
	const response = await fetch('http://localhost:4000/courses/all');
	const data = await response.json();

	if (data.successful === false) {
		return {
			courses: [],
		};
	}
	return data.result;
};

// Get all authors
export const getAuthors = async () => {
	const response = await fetch('http://localhost:4000/authors/all');
	const data = await response.json();

	if (data.successful === false) {
		return {
			authors: [],
		};
	}
	return data.result;
};

// Create new author
export const createNewAuthor = async (authorName, token) => {
	const newAuthor = { name: authorName };
	console.log(newAuthor);
	const response = await fetch('http://localhost:4000/authors/add', {
		method: 'POST',
		body: JSON.stringify(newAuthor),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	});
	const result = await response.json();

	console.log(result);
	console.log(result.result);
	// if (result.successful === false) {
	// 	alert(result.result);
	// 	console.log(result.result);
	// 	// const { result: errorMessage } = result;
	// 	// console.log(errorMessage);
	// 	return;
	// }
	const { name, id } = result.result;
	console.log(name, id, 'soy del provider');
	return {
		name,
		id,
	};
};

// Create newCourse
export const createNewCourse = async (
	titleCourse,
	descriptionCourse,
	durationCourse,
	authorsCourse,
	token
) => {
	const authors = Array.isArray(authorsCourse)
		? authorsCourse
		: [authorsCourse];
	const newCourse = {
		title: titleCourse,
		description: descriptionCourse,
		duration: durationCourse,
		authors: authors,
	};
	console.log(newCourse);
	const response = await fetch('http://localhost:4000/courses/add', {
		method: 'POST',
		body: JSON.stringify(newCourse),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	});
	const result = await response.json();

	console.log(result);
	console.log(result.result);

	if (result.errors[0]) {
		// alert(result.result);
		console.log(result.errors[0]);
		// const { result: errorMessage } = result;
		// console.log(errorMessage);
		return;
	}
	if (result.successful === false) {
		// alert(result.result);
		console.log(result.result);
		// const { result: errorMessage } = result;
		// console.log(errorMessage);
		return;
	}
	// const { name, id } = result.result;
	// return {
	// 	name,
	// 	id,
	// };
};
