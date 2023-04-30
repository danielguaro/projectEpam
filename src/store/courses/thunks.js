import {
	addNewEmptyCourse,
	deleteCourseById,
	getAllCourses,
	setCourses,
	updateCourse,
} from './coursesSlice';
import {
	createNewCourse,
	deleteCourse,
	getCourses,
	updateACourse,
} from '../../helpers/providers';

export const showAllCourses = () => {
	return async (dispatch) => {
		// Aplicar try Catch
		const result = await getCourses();
		dispatch(getAllCourses(result));
	};
};

// Remove by Id
export const removeCourseById = (courses, id) => {
	return courses.filter((course) => course.id !== id);
};

export const removeCourse = (courseId, userToken) => {
	return async (dispatch) => {
		const deleting = await deleteCourse(courseId, userToken);
		dispatch(deleteCourseById(courseId));
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
		const result = await updateACourse(
			courseTitle,
			courseDescription,
			courseDuration,
			courseAuthors,
			courseId,
			userToken
		);
		console.log(result);
		dispatch(updateCourse(result));
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
		const result = await createNewCourse(
			titleCourse,
			descriptionCourse,
			durationCourse,
			authorsCourse,
			token
		);
		dispatch(addNewEmptyCourse(result));
	};
};
