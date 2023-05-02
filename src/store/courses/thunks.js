import {
	addNewEmptyCourse,
	deleteCourseById,
	getAllCourses,
	updateCourse,
} from './coursesSlice';
import {
	createNewCourse,
	deleteCourse,
	getCourses,
	updateACourse,
} from './functions';

export const showAllCourses = () => {
	return async (dispatch) => {
		try {
			const result = await getCourses();
			dispatch(getAllCourses(result));
		} catch (err) {
			console.log(err);
		}
	};
};

// Remove by Id
export const removeCourseById = (courses, id) => {
	return courses.filter((course) => course.id !== id);
};

export const removeCourse = (courseId, userToken) => {
	return async (dispatch) => {
		try {
			const deleting = await deleteCourse(courseId, userToken);
			dispatch(deleteCourseById(courseId));
		} catch (err) {
			console.log(err);
		}
	};
};

// updatingTheCourse
export const updateTheCourse = (
	courseTitle,
	courseDescription,
	courseDuration,
	courseAuthors,
	courseId,
	userToken
) => {
	return async (dispatch) => {
		try {
			const result = await updateACourse(
				courseTitle,
				courseDescription,
				courseDuration,
				courseAuthors,
				courseId,
				userToken
			);
			dispatch(updateCourse(result));
		} catch (err) {
			console.log(err);
		}
	};
};

// Create newCourse
export const newCourse = (
	titleCourse,
	descriptionCourse,
	durationCourse,
	authorsCourse,
	token
) => {
	return async (dispatch) => {
		try {
			const result = await createNewCourse(
				titleCourse,
				descriptionCourse,
				durationCourse,
				authorsCourse,
				token
			);
			dispatch(addNewEmptyCourse(result));
		} catch (err) {
			console.log(err);
		}
	};
};
