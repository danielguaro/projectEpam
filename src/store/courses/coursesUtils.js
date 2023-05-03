// Get all Courses
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

// Delete courseById
export const deleteCourse = async (courseId, userToken) => {
	const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `${userToken}`,
		},
	});
	const data = await response.json();
	return data;
};

// Create new Course
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
	const response = await fetch('http://localhost:4000/courses/add', {
		method: 'POST',
		body: JSON.stringify(newCourse),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	});
	const result = await response.json();

	if (result.successful === false) {
		alert(result.result);
		return;
	}
	return result.result;
};

// update a Course
export const updateACourse = async (
	courseTitle,
	courseDescription,
	courseDuration,
	courseAuthors,
	courseId,
	userToken
) => {
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
	return data;
};
