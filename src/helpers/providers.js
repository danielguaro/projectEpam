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

	console.log(result);

	const token = result.result;
	const { name, email } = result.user;

	const checkingUserRole = await fetch('http://localhost:4000/users/me', {
		method: 'GET',
		// body: JSON.stringify(newAuthor),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	});

	const checkedUserRole = await checkingUserRole.json();
	console.log(checkedUserRole.result);
	const role = checkedUserRole.result.role;
	console.log(role);
	if (checkedUserRole.successful === false) {
		return {
			isAuth: true,
			name,
			email,
			token,
			role,
		};
	}

	return {
		isAuth: true,
		name,
		email,
		token,
		role,
	};
};

// Logout
export const logoutMethod = async (userToken) => {
	console.log(userToken);
	const response = await fetch('http://localhost:4000/logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${userToken}`,
		},
	});
	console.log(response);
	console.log(response.status);
	const status = response.status;
	if (status === 200) {
		return {
			isAuth: false,
		};
	}
	// const result = await response.json();
	// console.log(result);
	// return result;
};

// CheckRoleStatus
// export const getRole = async (token) => {
// 	const response = await fetch('http://localhost:4000/users/me', {
// 		method: 'GET',
// 		// body: JSON.stringify(newAuthor),
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `${token}`,
// 		},
// 	});
// 	const data = await response.json();
// 	console.log(data);
// 	if (data.successful === false) {
// 		return {
// 			role: false,
// 		};
// 	}
// 	const role = data.result.role;
// 	console.log(role);
// 	return { role };
// };

// Get all Courses
export const getCourses = async () => {
	const response = await fetch('http://localhost:4000/courses/all');
	const data = await response.json();

	if (data.successful === false) {
		return {
			courses: [],
		};
	}
	// console.log(data.result);
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

// Delete courseById
export const deleteCourse = async (courseId, userToken) => {
	const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `${userToken}`,
		},
	});
	const data = await response.json();
	console.log(data);
	console.log(data.result);
	return data;
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
	const { name } = result.result;
	console.log(name, 'soy del provider');
	return {
		name,
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

// updateCourse
export const updateACourse = async (
	courseTitle,
	courseDescription,
	courseDuration,
	courseAuthors,
	courseId,
	userToken
) => {
	console.log('courseId', courseId);
	const updateCourse = {
		title: courseTitle,
		description: courseDescription,
		duration: courseDuration,
		authors: courseAuthors,
	};
	const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
		method: 'PUT',
		body: JSON.stringify(updateCourse),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${userToken}`,
		},
	});
	const data = await response.json();
	// console.log(data);
	return data;
};
