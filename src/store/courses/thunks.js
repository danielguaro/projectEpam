import {
	addNewEmptyCourse,
	deleteCourseById,
	getAllCourses,
	setCourses,
	updateCourse,
} from './coursesSlice';

import { getCourses } from '../../helpers/providers';

export const showAllCourses = () => {
	return async (dispatch) => {
		// Aplicar try Catch
		const result = await getCourses();
		// console.log('hola', result);
		dispatch(getAllCourses(result));
	};
};

// Remove by Id
export const removeCourseById = (courses, id) => {
	return courses.filter((course) => course.id !== id);
};
