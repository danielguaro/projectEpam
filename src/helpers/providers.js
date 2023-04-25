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
		// const { result: errorMessage } = result;
		// console.log(errorMessage);
		return {
			isAuth: false,
		};
	}
	// console.log(result);
	// console.log(result.result);
	// console.log(result.user);
	const token = result.result;
	const { name, email } = result.user;
	// setUser(result.user);
	// console.log(result.successful);
	// console.log(result.errors[0]);
	// localStorage.setItem('token', result.result);
	// localStorage.setItem('name', result.user.name);
	// onCourses();
	return {
		isAuth: true,
		name,
		email,
		token,
	};
};

// export const postDataRegistration = async (name, password, email) => {
// 	const newUser = { name, password, email };
// 	const response = await fetch('http://localhost:4000/register', {
// 		method: 'POST',
// 		body: JSON.stringify(newUser),
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	});
// 	const result = await response.json();

// 	if (result.successful === false) {
// 		// alert(result.errors[0]);
// 		const error = result.errors[0];
// 		return { ok: false, errorMessage: error };
// 	}
// 	// console.log(result.successful);
// 	// console.log(result.errors[0]);
// 	// console.log(result);
// 	// onLogin();
// 	return result;
// };

export const getCourses = async () => {
	const response = await fetch('http://localhost:4000/courses/all');
	const data = await response.json();
	// console.log(data.result);

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
	// console.log(data.result);

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
	if (result.successful === false) {
		alert(result.result);
		console.log(result.result);
		// const { result: errorMessage } = result;
		// console.log(errorMessage);
		return;
	}
	const { name, id } = result.result;
	return {
		name,
		id,
	};
};

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
