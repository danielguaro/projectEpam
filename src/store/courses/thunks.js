import { getCourses } from '../../helpers/providers';
import {
	addNewEmptyCourse,
	setCourses,
	updateCourse,
	deleteCourseById,
	getAllCourses,
} from './coursesSlice';

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
	console.log(courses);
	return courses.filter((course) => course.id !== id);
};
